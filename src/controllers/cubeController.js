const router = require('express').Router();
const cubeManager = require('../managers/cubeManager');
const accessoryManager = require('../managers/accessoryManager');
const { generateOptions } = require('../config/contants');
const { isAuth } = require('../middlewares/auth');

//GET
router.get('/:id/details', async (req, res) => {
    const cube = await cubeManager.getById(req.params.id);

    if (!cube) {
        return res.redirect('/404');
    }

    const isOwner = cube.owner == req.user?._id;
    console.log(cube.owner);
    console.log(isOwner);

    res.render('cube/details', { cube, isOwner });
});

router.get('/:id/accessories',isAuth, async (req, res) => {
    const cube = await cubeManager.getById(req.params.id);
    const accessories = await accessoryManager.getOthers(cube.accessories);

    res.render('accessory/attach', { cube, accessories });
});


router.get('/:id/edit',isAuth, async (req, res) => {
    const cube = await cubeManager.getById(req.params.id);

    const options = generateOptions(cube.difficultyLevel);

    res.render('cube/edit', { cube,options });
})

router.get('/:id/delete',isAuth, async (req, res) => {
    const cube = await cubeManager.getById(req.params.id);

    const options = generateOptions(cube.difficultyLevel);

    res.render('cube/delete', { cube,options });
})

//POST
router.post('/:id/accessories',isAuth, async (req, res) => {
    const { accessory } = req.body;
    const cubeId = req.params.id;

    await cubeManager.attachAccessory(cubeId, accessory);

    res.redirect(`/cube/${cubeId}/details`);
});

router.post('/:id/edit',isAuth, async (req, res) => {
    const cubeData = req.body;
    const cubeId = req.params.id;

    await cubeManager.updateById(cubeId, cubeData);

    res.redirect(`/cube/${cubeId}/details`);
});

router.post('/:id/delete',isAuth, async (req, res) => {
    await cubeManager.deleteById(req.params.id);

    res.redirect('/');
})
module.exports = router;