const router = require('express').Router();

const homeController = require('./controllers/homeController');
const accessoryController = require('./controllers/accessoryController');

router.use(homeController);
router.use('/accessories',accessoryController);

router.get('*',(req,res) => {
    res.render('404');
});

module.exports = router;