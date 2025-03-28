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
