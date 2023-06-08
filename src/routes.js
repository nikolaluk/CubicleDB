const router = require('express').Router();

const homeController = require('./controllers/homeController');
const userController = require('./controllers/userController');
const cubeController = require('./controllers/cubeController');
const accessoryController = require('./controllers/accessoryController');

router.use(homeController);
router.use('/user',userController);
router.use('/cube',cubeController);
router.use('/accessories',accessoryController);

router.get('*',(req,res) => {
    res.render('404');
});

module.exports = router;