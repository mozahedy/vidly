const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.render('index', {title: 'Vildy', message: 'hello world'});
});

//display all movies
router.get('/', (req, res)=>{
    res.send(movies);
});

module.exports = router;