const Bcrypt = require("bcrypt");
const MongoClient = require('mongodb').MongoClient;
const axios = require('axios');
const url = "mongodb://localhost:27017/";
const saltRounds = 10;

let db = null;
MongoClient.connect(url, { useUnifiedTopology: true }, (err, database) => {
    if (err) throw err;
    db = database.db("training");
})

exports.getEmployees = async () => {
    return await db.collection('employees').find().toArray();
}

exports.crawlEmployees = async () => {
    let res = await axios.get('http://dummy.restapiexample.com/api/v1/employees');
    const data = res.data.data;
    data.map(employee => {
        db.collection('employees').updateOne(
            employee,
            { $set: employee },
            { upsert: true }
        )
    })
    return await db.collection('employees').find({}).toArray();
}

exports.signup = async ({ user }) => {
    const { username, password, email } = user
    const checkUserExists = await db.collection('users').findOne({ username });
    if (checkUserExists) {
        console.log('login failed');
    } else {
        let user = {
            username: username,
            password: await Bcrypt.hashSync(password, saltRounds),
            email: email
        }
        await db.collection('users').insertOne(user);
        return user;
    }
}

exports.login = async ({ user }) => {
    const { username, password } = user;
    const userLogin = await db.collection('users').findOne({ username });
    if (userLogin) {
        const comparePassword = Bcrypt.compareSync(password, userLogin.password);
        if (comparePassword) {
            return userLogin;
        }
    } else {
        console.log('login failed');
    }
}