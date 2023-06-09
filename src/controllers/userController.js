const router = require('express').Router();
const userManager = require('../managers/userManager');

router.get('/register', (req, res) => {
    res.render('user/register');
});

router.post('/register', async (req, res) => {
    const { username, password, repeatPassword } = req.body;

    try {
        await userManager.register(username, password, repeatPassword);
        res.redirect('/user/login');
    } catch (err) {
        console.log(err.message);
        res.redirect('/user/register');
    }
});

router.get('/login', (req, res) => {
    res.render('user/login');
});

router.post('/login',async (req,res) => {
    const {username,password} = req.body;
    try{
        const token = await userManager.login(username,password);

        res.cookie('auth',token, {httpOnly:true});

        res.redirect('/');
    } catch(err){
        console.log(err.message);
        res.redirect('/user/login');
    }
});

router.get('/logout', async (req,res) => {
    res.clearCookie('auth');

    res.redirect('/');
});

module.exports = router;