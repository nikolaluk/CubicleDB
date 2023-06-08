const jwt = require('../lib/jwt');
const { SECRET } = require('../config/contants');

exports.auth = async (req, res, next) => {
    const token = req.cookies['auth'];

    if(token){
        try{
            const user = await jwt.verify(token,SECRET);

            req.user = user;

            next();
        } catch (err){
            res.clearCookie('auth');

            res.redirect('/user/login');
        }
    } else {
        next();
    }
}