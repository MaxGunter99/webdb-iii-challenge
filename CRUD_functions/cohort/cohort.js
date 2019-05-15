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

//GET ALL COHORTS
router.get( '/', (req , res) => {
    db( 'cohort' )
        .then( cohorts =>
            res.status( 200 ).json( cohorts ) 
        )
        .catch( error => res.status( 500 ).json( error ))
});

//GET INDIVIDUAL COHORTS
router.get('/:id', (req, res) => {
    db( 'cohort' )
        .where({ id: req.params.id })
        .first()
        .then( cohort => {
            if ( cohort ) {
                res.status( 200 ).json( cohort )
            } else {
                res.status( 500 ).json( error );
            }
        })
        .catch( error => res.status( 500 ).json({ message: 'Server error getting individual cohorts' }))
});

//ADD A COHORT
router.post( '/' , ( req, res) => {
    const { name } = req.body
    if( !name ) {
        res.status( 400 ).json({ message: 'Please provide a name field' })
    } else {
        db( 'cohort' )
            .insert({ name })
            .then ( ids => {
                const [id] = ids;
                db( 'cohort' )
                    .where({ id })
                    .first()
                    .then( cohort => res.status( 201 ).json({ message: 'This was successfully added to the database' , cohort }))
            })
            .catch( error => res.status( 500 ).json({ message: 'Server error adding cohort', error }))
    }
});

//UPDATE A COHORT
router.put( '/:id' , (req, res) => {
    db( 'cohort' )
        .where({ id: req.params.id })
        .update( req.body )
        .then( count => {
            if ( count > 0 ) {
                db( 'cohort' )
                    .where({ id: req.params.id })
                    .first()
                    .then( cohort => {
                        res.status( 200 ).json({ message: 'This was Successfully updated in the database:', cohort })
                    })
            } else {
                res.status( 404 ).json({ message: 'Entree Unidentified' });
            }
        })
        .catch ( error => { res.status( 500 ).json( error )})
});

//DELETE A COHORT
router.delete( '/:id' , ( req, res ) => {
    db( 'cohort' )
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