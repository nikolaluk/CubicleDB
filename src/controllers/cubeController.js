const router = require('express').Router();
const cubeManager = require('../managers/cubeManager');
const accessoryManager = require('../managers/accessoryManager');

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

router.get('/:id/edit', async (req,res) => {
    const cube = await cubeManager.getById(req.params.id);

    res.render('cube/edit', {cube});
})

router.get('/:id/delete', async (req,res) => {
    const cube = await cubeManager.getById(req.params.id);

    res.render('cube/delete', {cube});
})

//POST
router.post('/:id/accessories', async (req,res) => {
    const {accessory} = req.body;
    const cubeId = req.params.id;

    await cubeManager.attachAccessory(cubeId, accessory);

    res.redirect(`/cube/${cubeId}/details`);
});

router.post('/:id/edit', async (req,res) => {
    const {name,description,imageUrl,difficultyLevel} = req.body;
    const cubeId = req.params.id;

    await cubeManager.updateById(cubeId,name,description,imageUrl,difficultyLevel);

    res.redirect(`/cube/${cubeId}/details`);
});

router.post('/:id/delete', async (req,res) => {
    await cubeManager.deleteById(req.params.id);

    res.redirect('/');
})
module.exports = router;