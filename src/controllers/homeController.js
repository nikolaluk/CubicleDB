const router = require('express').Router();
const cubeManager = require('../managers/cubeManager'); 
const accessoryManager = require('../managers/accessoryManager');

//GET
router.get('/', async (req,res) => {
    const {search,from,to} = req.query;

    const cubes = await cubeManager.getAll(search,from,to);

    res.render('index',{cubes,search,from,to});
});

router.get('/create', (req,res) => {
    res.render('create');
});

router.get('/about',(req,res) => {
    res.render('about');
});

//POST
router.post('/create',async (req,res) => {
    const {name,description,imageUrl,difficultyLevel} = req.body;
    await cubeManager.create(name,description,imageUrl,difficultyLevel);
    res.redirect('/');
});

router.post('/:id/accessories', async (req,res) => {
    const {accessory} = req.body;
    const cubeId = req.params.id;

    await cubeManager.attachAccessory(cubeId, accessory);

    res.redirect(`/${cubeId}/details`);
});

module.exports = router;