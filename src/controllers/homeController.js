const router = require('express').Router();
const cubeManager = require('../managers/cubeManager'); 

//GET
router.get('/', async (req,res) => {
    const {search,from,to} = req.query;

    const cubes = await cubeManager.getAllCubes(search,from,to);

    res.render('index',{cubes,search,from,to});
});

router.get('/create', (req,res) => {
    res.render('create');
});

router.get('/about',(req,res) => {
    res.render('about');
});

router.get('/details/:id', async (req,res) => {
    const cube = await cubeManager.getCubeById(req.params.id);

    if(!cube){
        return res.redirect('/404');
    }

    res.render('details',{cube});
});

router.get('*',(req,res) => {
    res.render('404');
});


//POST
router.post('/create',async (req,res) => {
    const {name,description,imageUrl,difficultyLevel} = req.body;
    await cubeManager.createNewCube(name,description,imageUrl,difficultyLevel);
    res.redirect('/');
});



module.exports = router;