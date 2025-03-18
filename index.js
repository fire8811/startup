const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();

const cookieName = "token";

let users = [];
let topScores = [];
let allScores = [];

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

var router = express.Router();
app.use(`/api`, router);

async function createUser(username, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
        username: username,
        password: hashedPassword,
        token: uuid.v4(),
    };

    users.push(newUser);
    return newUser;
}

function setAuthCookie(res, token) {
    console.log("TOKEN (set cookie): " + token);

    res.cookie('token', token, {
        secure: false,
        httpOnly: true,
        sameSite: 'strict',
    });
}

function getUser(field, value){
    console.log("GET_USER")
    console.log("value (get_user): " + value);
    console.log(users);
    if (value) {
        return users.find((user) => user[field] === value);
    }
    console.log("NOT_FOUND")
    return null;
}

function clearAuthCookie(res, user) {
    delete user.token;
    res.clearCookie('token');
}

//registration
router.post('/create', async (req, res) => {
    if (await getUser('username', req.body.username)) {  //check to see if username/username is avaliable 
        res.status(409).send({ msg: 'Username Taken!'});
    } else {
        const newUser = await createUser(req.body.username, req.body.password);

        setAuthCookie(res, newUser.token);
        res.send({ username: newUser.username });
    }
});

//login
router.post('/login', async (req, res) => {
    console.log(req.username);
    const user = await getUser('username', req.body.username);

    if (user && (await bcrypt.compare(req.body.password, user.password))) { //check if user exists AND passwords match
        user.token = uuid.v4();
        setAuthCookie(res, user);
        res.send( {username: user.username});
        return;

    } else {
        res.status(401).send({msg: 'Unauthorized' });
    }
})

router.delete('/logout', async (req, res) => {
    const user = await getUser('token', req.cookies['token']);
    if (user) {
        clearAuthCookie(res, user);
    }
    res.status(204).end();
});



//middleware that verifies user is authorized
const isAuthenticated = async (req, res, next) => {
    console.log("IS_AUTHENTICATED");
    console.log("Token cookie:", req.cookies['token']);
    console.log("Cookies: ", req.cookies);

    const authenticatedUser = await getUser('token', req.cookies['token']);
    
    if (authenticatedUser) {
        next();
    } else {
        res.status(401).send({ msg: 'Unauthorized!' });
    }
}

router.post('/score', isAuthenticated, (req, res) => {
    console.log("\n*************IN_SCORE_ENDPOINT")
    newScore = req.body;
    allScores.push(newScore);

    let scoreEntered = false;

    for (const[i, savedScore] of topScores.entries()) {
        if (newScore.score > savedScore.score){
            topScores.splice(i, 0, newScore) //insert the new score (score) at index i
            scoreEntered = true;
            break;
        }
    }
    
    if (!scoreEntered){
    topScores.push(newScore);
    }

    console.log(topScores);
    res.send(topScores)
})

//return scores
router.get('/scores', isAuthenticated,  (_req, res) => {
    console.log("****GET_SCORES*******");
    res.send({topScores, allScores});
})

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.listen(port, () => {
    console.log(`running on port ${port}`);
});

