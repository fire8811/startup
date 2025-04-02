const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();
const DB = require('./database.js');
const { webSocket } = require('./ws.js'); //websocket stuff

let users = [];


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

    return newUser;
}

function setAuthCookie(res, token) {
    console.log("TOKEN (set cookie): " + token);

    res.cookie('token', token, {
        secure: false, //TODO: SUPER IMPORTANT CHANGE TO TRUE BEFORE PRODUCTION
        httpOnly: true,
        sameSite: 'strict',
    });
    //console.log('EXIT SETAUTHCOOKIE');
}

function clearAuthCookie(res, user) {
    user.token = null;
    DB.updateToken(user);
    res.clearCookie('token');
}

function getUser(field, value){
    if (!value) return null;

    if (field === 'token'){
        return DB.findUserByToken(value);
    }
    else if (field === 'username') {
        return DB.findUserByName(value);
    }

    return null;
}

//registration
router.post('/create', async (req, res) => { 
    if (await getUser('username', req.body.username)) {  //check to see if username/username is avaliable T
        res.status(409).send({ msg: 'Username Taken!'});
    } else {
        const newUser = await createUser(req.body.username, req.body.password);
        setAuthCookie(res, newUser.token);

        DB.addUser(newUser);

        res.send({ username: newUser.username });
    }
});

//login
router.post('/login', async (req, res) => {
    console.log("username: " + req.body.username);

    const user = await getUser('username', req.body.username); 

    if (user && (await bcrypt.compare(req.body.password, user.password))) { //check if user exists AND passwords match
        user.token = uuid.v4();
        setAuthCookie(res, user.token);
        DB.updateToken(user);
        res.send( {username: user.username});
        
        console.log("END LOGIN ENDPOINT")
        return;

    } else {
        res.status(401).send({msg: 'Username or Password Incorrect' });
    }
})

router.delete('/logout', async (req, res) => {
    //console.log('LOGOUT');

    const user = await getUser('token', req.cookies['token']); 

    //console.log(req.cookies['token']);
    
    if (user) {
        clearAuthCookie(res, user); //res.clearCookie('token') in simon
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
    //allScores.push(newScore);

    // let scoreEntered = false;

    // for (const[i, savedScore] of topScores.entries()) {
    //     if (newScore.score > savedScore.score){
    //         topScores.splice(i, 0, newScore) //insert the new score (score) at index i
    //         scoreEntered = true;
    //         break;
    //     }
    //     else if (newScore.score === savedScore.score){ //score is already in leaderboard (tie)
    //         scoreEntered = true;
    //         break;
    //     }
    // }
    
    // if (!scoreEntered){
    //     topScores.push(newScore);
    // }

    // console.log(topScores);
    DB.addScore(newScore);
    res.send(newScore);
})

//return scores
router.get('/scores', isAuthenticated, async (_req, res) => {
    console.log("****GET_SCORES*******");
    let topScores = await DB.getHighScores();
    let allScores = await DB.getAllScores();
    
    console.log(topScores);
    console.log(allScores);
    res.send({topScores, allScores});
})

const port = process.argv.length > 2 ? process.argv[2] : 4000;

const service = app.listen(port, () => {
    console.log(`running on port ${port}`);
});

webSocket(service);

