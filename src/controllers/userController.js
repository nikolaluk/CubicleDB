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
        console.log(err);
        res.redirect('/user/register');
    }
});

router.get('/login', (req, res) => {
    res.render('user/login');
});

router.post('/login',async (req,res) => {
    const {username,password} = req.body;

    await userManager.login(username,password);

    res.redirect('/');
});

module.exports = router;