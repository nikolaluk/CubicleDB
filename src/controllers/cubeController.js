const router = require('express').Router();
const cubeManager = require('../managers/cubeManager');
const accessoryManager = require('../managers/accessoryManager');

router.get('/:id/details', async (req, res) => {
    const cube = await cubeManager.getById(req.params.id);

    if (!cube) {
        return res.redirect('/404');
    }

    res.render('details', { cube });
});

router.get('/:id/accessories', async (req, res) => {
    const cube = await cubeManager.getById(req.params.id);
    const accessories = await accessoryManager.getOthers(cube.accessories);

    res.render('accessory/attach', { cube, accessories });
});

router.post('/:id/accessories', async (req,res) => {
    const {accessory} = req.body;
    const cubeId = req.params.id;

    await cubeManager.attachAccessory(cubeId, accessory);

    res.redirect(`/cube/${cubeId}/details`);
});


module.exports = router;