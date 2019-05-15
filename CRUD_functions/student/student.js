const knex = require('knex');
const router = require('express').Router();

const KnexConfig = {
    client: 'sqlite3',
    connection: {
        filename: './data/lambda.db3'
    },
    useNullAsDefault: true,
    debug: true
}

const db = knex( KnexConfig );

//GET AL STUDENTS
router.get( '/', (req , res) => {
    db( 'students' )
        .then( student =>
            res.status( 200 ).json( student ) 
        )
        .catch( error => res.status( 500 ).json( error ))
});

//GET INDIVIDUAL STUDENT
router.get( '/:id' , (req, res) => {
    db( 'students' )
        .where({ id: req.params.id })
        .first()
        .then( student => {
            if( student ) {
                res.status( 200 ).json( student )
            } else {
                res.status( 500 ).json( error )
            }
        })
        .catch( error => res.status( 500 ).json({ message: 'Server error getting Student individual', error }) )
});

//ADD A STUDENT
router.post( '/' , ( req, res) => {
    const { name, cohort_id } = req.body
    if( !name && !cohort_id ) {
        res.status( 400 ).json({ message: 'Please provide a name and cohort field' })
    } else {
        db( 'students' )
            .insert({ name, cohort_id })
            .then ( ids => {
                const [id] = ids;
                db( 'students' )
                    .where({ id })
                    .first()
                    .then( student => res.status( 201 ).json({ message: 'This was sucessfully added to the database', student }))
            })
            .catch( error => res.status( 500 ).json({ message: 'Server error adding Student', error }))
    }
});

//UPDATE A Student
router.put( '/:id' , (req, res) => {
    db( 'students' )
        .where({ id: req.params.id })
        .update( req.body )
        .then( count => {
            if ( count > 0 ) {
                db( 'students' )
                    .where({ id: req.params.id })
                    .first()
                    .then( student => {
                        res.status( 200 ).json({ message: 'This was Successfully Updated to the database:', student })
                    })
            } else {
                res.status( 404 ).json({ message: 'Entree Unidentified' });
            }
        })
        .catch ( error => { res.status( 500 ).json( error )})
});

//DELETE A STUDENT
router.delete( '/:id' , ( req, res ) => {
    db( 'students' )
        .where({ id: req.params.id })
        .del()
        .then( count => {
            if ( count > 0 ) {
                res.status( 204 ).end()
            } else {
                res.status( 404 ).json({ message: 'Entree not found' })
            }
        })
        .catch( error => res.status( 500 ).json({ message: 'Can not delete because:', error }))
});

module.exports = router;