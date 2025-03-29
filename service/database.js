const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.username}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('huey');
const userCollection = db.collection('user')
const scoreCollection = db.collection('score');

(async function testConnection() {
    try {
        await db.command({ping: 1});
        console.log('connected to database');
    } catch (e) {
        console.log(`error when connecting to database: ${e.message}`);
        process.exit(1);
    }
})();

async function addUser(user){
    await userCollection.insertOne(user);
}

async function findUserByName(name){ //for finding if the user exists (when unauthenticated)
    return userCollection.findOne({ username: name });
}

async function findUserByToken(token){ //used to see if the user is authenticated
    return userCollection.findOne({ token: token });
}

async function updateToken(user){
    await userCollection.updateOne({ username: user.username }, { $set: user });
}

async function addScore(score){
    scoreCollection.insertOne(score);
}

async function getHighScores() {
    const query = { score: {$gt: 0 }};
    const options = {
        sort: {score: -1},
        limit: 10,
    }

    const cursor = scoreCollection.find(query, options);
    return cursor.toArray();
}

async function getAllScores(){
    const query = { score: {$gt: 0 }};
    const options = {
        sort: {score: -1}
    }

    const cursor = scoreCollection.find(query, options);
    return cursor.toArray();
}

module.exports = {
    addUser,
    findUserByName,
    findUserByToken,
    updateToken,
    addScore,
    getHighScores,
    getAllScores
};
