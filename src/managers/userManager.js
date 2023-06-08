const User = require('../models/User');

const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');
const {SECRET} = require('../config/contants');

const register = async function (username, password, repeatPassword) {

    if (password !== repeatPassword) {
        throw new Error('Password and repeat password must match!');
    }

    const allUsers = await User.find().lean();
    if (allUsers.filter(user => user.username === username).length > 0) {
        throw new Error('Username already taken!');
    }

    const hash = await bcrypt.hash(password, 10);

    const user = new User({ username, password: hash });

    return user.save();
}

const login = async function (username, password) {
    const user = await User.findOne({ username });

    if (!user) {
        throw new Error('Username or password are incorrect');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Username or password are incorrect');
    }

    const payload = {
        _id: user._id,
        username: user.username,
    }

    const token = await jwt.sign(payload, SECRET, { expiresIn: '2d' })

    return token;
}

exports.register = register;
exports.login = login;