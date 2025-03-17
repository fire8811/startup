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

async function createUser(email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
        email: email,
        password: hashedPassword,
        token = user.token = uuid.v4();
    };

    users.push(newUser);
    return newUser;
}

function setAuthCookie(res, user) {
    res.cookie('token', user.token, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict'
    });
}

function getUser(field, value){
    if (value) {
        return users.find((user) => user[field] === value);
    }
    return null;
}

//registration
app.post('api/auth')

const port = process.argv.length > 2 ? process.argv[2] : 4000;
app.listen(port, () => {
    console.log("running");
});

