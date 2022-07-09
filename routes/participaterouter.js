const express = require('express');
const mysql= require('mysql');
const participateRouter = express.Router();

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'admin',
    password : 'engage12!@',
    database : 'appdata'
});

participateRouter.get('/fetchall', (req, res) => {
    connection.query('SELECT * from participate', (error, results, fields) => {
        if(error) throw error;
        res.statusCode = 200;
        res.send(results);
        console.log(results);
    });
});


participateRouter.post('/createparticipate', async (req, res) => {
    console.log(req.body);
    var participate = {
        p_id: req.body.p_id,
        user: req.body.user,
        room: req.body.room,
        join_time: req.body.join_time
        }
        
    await connection.query(`INSERT INTO participate (user, room, join_time) VALUES ("${participate.user}", "${participate.room}", "${participate.join_time}");`, (error, result, fields) => {
        participate.p_id = result.insertId;
        res.statusCode = 201;
        res.setHeader('Content-Type', 'text/json');
        res.json(user);
    });
});

module.exports = participateRouter;