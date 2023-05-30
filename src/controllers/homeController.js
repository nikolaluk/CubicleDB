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

router.get('/:id/details', async (req,res) => {
    const cube = await cubeManager.getById(req.params.id);

    if(!cube){
        return res.redirect('/404');
    }

    res.render('details',{cube});
});

router.get('/:id/accessories', async (req,res) => {
    const cube = await cubeManager.getById(req.params.id);
    const accessories = await accessoryManager.getOthers(cube.accessories);

    res.render('accessory/attach',{cube,accessories});
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