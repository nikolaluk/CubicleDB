const User = require('../models/User');
const bcrypt = require('bcrypt');

const register = async function(username,password,repeatPassword) {

    if(password !== repeatPassword){
        throw new Error('Password and repeat password must match!');
    }

    const allUsers = await User.find().lean();
    if(allUsers.filter(user => user.username === username).length > 0){
        throw new Error('Username already taken!');
    }

    const hash = await bcrypt.hash(password,10);

    const user = new User({username,password:hash});

    return user.save();
}

const getAll = async function(){
    let users = await User.find().lean();

    return users;
}

exports.register = register;
exports.getAll = getAll;