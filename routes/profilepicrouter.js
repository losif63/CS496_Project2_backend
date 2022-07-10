const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const morgan = require('morgan');
const _ = require('lodash');
const fs = require('fs');


const profilePicRouter = express.Router();

profilePicRouter.use(fileUpload({
    createParentPath: true
}));
profilePicRouter.use(cors());
profilePicRouter.use(bodyParser.json());
profilePicRouter.use(bodyParser.urlencoded({extended: true}));
profilePicRouter.use(morgan('dev'));



profilePicRouter.post('/:uid', async (req, res) => {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            let avatar = req.files.avatar;
            avatar.mv(`~/backend/profilepic/${req.param.uid}.jpg`);
            res.status = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.send(`http://192.249.18.152/profilepic/${req.param.uid}.jpg`);
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

profilePicRouter.get('/:uid', async (req, res) => {
    try {
        var path = `~/backend/profilepic/${req.param.uid}.jpg`;
        if(fs.existsSync(path)) {
            res.status = 200;
            res.sendFile(path);
        } else {
            res.status = 404;
            res.send(`Image ${req.param.uid}.png not found`);
        }
    } catch(err) {
        res.status(500).send(err);
    }
});