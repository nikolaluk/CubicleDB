const router = require('express').Router();
const cubeManager = require('../managers/cubeManager'); 
const { isAuth } = require('../middlewares/auth');

//GET
router.get('/', async (req,res) => {
    const {search,from,to} = req.query;

    const cubes = await cubeManager.getAll(search,from,to);

    res.render('index',{cubes,search,from,to});
});

router.get('/create',isAuth, (req,res) => {
    res.render('cube/create');
});

router.get('/about',(req,res) => {
    res.render('about');
});

//POST
router.post('/create',isAuth,async (req,res) => {
    const {name,description,imageUrl,difficultyLevel} = req.body;
    const owner = req.user;
    await cubeManager.create(name,description,imageUrl,difficultyLevel,owner);
    res.redirect('/');
});

module.exports = router;