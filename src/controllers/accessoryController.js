const router = require('express').Router();

router.get('/create',(req,res) => {
    res.render('accessory/create');
});

router.post('/create', (req,res) => {
    const {name, description, inageUrl} = req.body;

    console.log(body);

    res.redirect('/');
})

module.exports = router;