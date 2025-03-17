const cookieParser = require('cookie-parser');
const crypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();

const cookieName = "token";

let users = [];
let scores = [];

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

var router = express.Router();
app.use('/api', apiRouter);


const port = process.argv.length > 2 ? process.argv[2] : 4000;
app.listen(port, () => {
    console.log("running");
})