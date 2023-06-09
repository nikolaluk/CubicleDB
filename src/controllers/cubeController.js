const router = require('express').Router();
const cubeManager = require('../managers/cubeManager');
const accessoryManager = require('../managers/accessoryManager');
const { generateOptions } = require('../config/contants');

//GET
router.get('/:id/details', async (req, res) => {
    const cube = await cubeManager.getById(req.params.id);

    if (!cube) {
        return res.redirect('/404');
    }

    res.render('cube/details', { cube });
});

router.get('/:id/accessories', async (req, res) => {
    const cube = await cubeManager.getById(req.params.id);
    const accessories = await accessoryManager.getOthers(cube.accessories);

    res.render('accessory/attach', { cube, accessories });
});


router.get('/:id/edit', async (req, res) => {
    const cube = await cubeManager.getById(req.params.id);

    const options = generateOptions(cube.difficultyLevel);

    res.render('cube/edit', { cube,options });
})

router.get('/:id/delete', async (req, res) => {
    const cube = await cubeManager.getById(req.params.id);

    const options = generateOptions(cube.difficultyLevel);

    res.render('cube/delete', { cube,options });
})

//POST
router.post('/:id/accessories', async (req, res) => {
    const { accessory } = req.body;
    const cubeId = req.params.id;

    await cubeManager.attachAccessory(cubeId, accessory);

    res.redirect(`/cube/${cubeId}/details`);
});

router.post('/:id/edit', async (req, res) => {
    const cubeData = req.body;
    const cubeId = req.params.id;

    await cubeManager.updateById(cubeId, cubeData);

    res.redirect(`/cube/${cubeId}/details`);
});

router.post('/:id/delete', async (req, res) => {
    await cubeManager.deleteById(req.params.id);

    res.redirect('/');
})
module.exports = router;