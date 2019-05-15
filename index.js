const express = require('express');
const helmet = require('helmet');
const morgan = require("morgan");
const cohortRouter = require( './CRUD_functions/cohort/cohort' ); 
const studentRouter = require( './CRUD_functions/student/student' );
const server = express();
const cors = require('cors');
const port = 4242;

//MIDDLEWARE
server.use(express.json());
server.use(helmet());
server.use(morgan("dev"));
server.use(cors());

//URL
server.use( '/api/cohort' , cohortRouter);
server.use( '/students', studentRouter );

server.listen(port, function() {
  console.log(`\nAPI Listening on http://localhost:${port}\n`);
});

server.get( '/' , (req, res) => {
    res.send(`<h1>WELCOME</h1>`);
});