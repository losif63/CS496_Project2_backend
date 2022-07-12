const express = require('express');
const mysql= require('mysql');
const bodyParser = require('body-parser');
var userRouter = express.Router();

userRouter.use(bodyParser.json());
userRouter.use(bodyParser.urlencoded({extended: false}));

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'admin',
    password : 'engage12!@',
    database : 'appdata'
  });

userRouter.get('/fetchall', (req, res) => {
    connection.query('SELECT * from users', (error, results, fields) => {
        if(error) throw error;
        res.statusCode = 200;
        res.send(results);
        console.log(results);
    });
});

userRouter.post('/createuser', async (req, res) => {
    console.log(req.body);
    var user = {
        u_id: req.body.u_id,
        name: req.body.name,
        profile_word: req.body.profile_word,
        profile_pic: req.body.profile_pic,
        email: req.body.email,
        password: req.body.password,
        birthdate: req.body.birthdate }

        await connection.query(`INSERT INTO users (name, profile_word, profile_pic, email, password, birthdate) VALUES ("${user.name}", "${user.profile_word}", "${user.profile_pic}", "${user.email}", "${user.password}", "${user.birthdate}");`, (error, result, fields) => {
            user.u_id = result.insertId;
            console.log(user.u_id);
            res.statusCode = 201;
            res.setHeader('Content-Type', 'text/json');
            res.json(user);
        });
});

userRouter.put('/updateuser', async (req, res) => {
    console.log(req.body);
    var user = {
        u_id: req.body.u_id,
        name: req.body.name,
        profile_word: req.body.profile_word,
        profile_pic: req.body.profile_pic,
        email: req.body.email,
        password: req.body.password,
        birthdate: req.body.birthdate }

    await connection.query(`UPDATE users SET name='${user.name}', profile_word='${user.profile_word}', profile_pic='${user.profile_pic}', email='${user.email}', password='${user.password}', birthdate='${user.birthdate}' WHERE u_id = ${user.u_id}`, (error, result, fields) => {
        console.log(result);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/json');
        res.json(user);
    });
});


module.exports = userRouter;