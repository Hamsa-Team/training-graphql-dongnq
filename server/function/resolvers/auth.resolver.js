const Bcrypt = require("bcrypt");
const saltRounds = 10;


exports.signup = async ({ user }, context) => {
    const { username, password, email } = user
    const checkUserExists = await context.db.collection('users').findOne({ username });
    if (checkUserExists) {
        console.log('login failed');
    } else {
        let user = {
            username: username,
            password: await Bcrypt.hashSync(password, saltRounds),
            email: email
        }
        await context.db.collection('users').insertOne(user);
        return user;
    }
}

exports.login = async ({ user }, context) => {
    const { username, password } = user;
    const userLogin = await context.db.collection('users').findOne({ username });
    if (userLogin) {
        const comparePassword = Bcrypt.compareSync(password, userLogin.password);
        if (comparePassword) {
            console.log('login successfully');
            return userLogin;
        }
    } else {
        console.log('login failed');
    }
}