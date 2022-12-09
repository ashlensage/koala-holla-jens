const express = require('express');
const koalaRouter = express.Router();
const pg = require('pg'); // Import just what we need

const Pool = pg.Pool;

const pool = new Pool({
    database: 'koala_holla', // the name of database, This can change!
    host: 'localhost', // where is your database?
    port: 5432, // the port for your database, 5432 is default for postgres
    max: 10, // how many connections (queries) at one time
    idleTimeoutMillis: 30000 // 30 second to try to connect, otherwise cancel query
});

// .on here looks familiar...this is how node can handle arbitrary events
// this is NOT required but it is very useful for debugging
pool.on('connect', () => {
    console.log('Postgresql connected');
});

// the pool with emit an error on behalf of any idle clients
// it contains if a back end error or network partition happens
pool.on('error', (error) => {
    console.log('Error with postgres pool', error)
});

koalaRouter.get('/', (req, res) => {
 // router code
 let queryText = 'SELECT * FROM koala;'; // the query selector that you want to make
    
    pool.query(queryText) // access the database and tell it what you wanted to do (SELECT * FROM songs)
        .then((result) => { // the results will be what you are selecting
            //console.log(result);
            res.send(result.rows); // will only send back each row (data entry) of the database
        })
        .catch((err) => {
            console.log('Error making query ', err);
            res.sendStatus(500);
        })
});


// POST
koalaRouter.post('/', (req, res) => {
    // router code
   
    const newKoala = req.body;
    console.log(newKoala)
    const queryText = `
        INSERT INTO koala 
            (name, gender, age, ready_to_transfer, notes)
        VALUES 
            ('${newKoala.name}', '${newKoala.gender}', '${newKoala.age}', '${newKoala.ready_to_transfer}', '${newKoala.notes}');
    `;
    pool.query(queryText)
    .then((result) => {
        res.sendStatus(201);
    })
    .catch((err) => {
        console.log(`Error making query ${queryText}`, err);
        res.sendStatus(500);
    });
});

// PUT


// DELETE

module.exports = koalaRouter;