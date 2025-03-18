const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
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
app.use(`/api`, router);

async function createUser(email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
        email: email,
        password: hashedPassword,
        token: uuid.v4(),
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
router.post('/create', async (req, res) => {
    if (await getUser('email', req.body.email)) {  //check to see if username/email is avaliable 
        res.status(409).send({ msg: 'Username Taken!'});
    } else {
        const newUser = await createUser(req.body.email, req.body.password);

        setAuthCookie(res, newUser.token);
        res.send({ email: newUser.email });
    }
});

//login
router.post('/login', async (req, res) => {
    const user = await getUser('email', req.body.email);

    if (user && (await bcrypt.compare(req.body.password, user.password))) { //check if user exists AND passwords match
        user.token = uuid.v4();
        setAuthCookie(res, user);
        res.send( {email: user.email});
        return;

    } else {
        res.status(401).send({msg: 'Unauthorized' });
    }
})

//return scores
router.get('/scores', (_req, res) => {
    res.send(scores);
})

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.listen(port, () => {
    console.log(`running on port ${port}`);
});

