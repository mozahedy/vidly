const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { Movie, searchMove, validate } = require('../models/movie');
router.get('/', async (req, res) => {
    const movies = await Movie.find().sort();
    res.render('list', {title: 'List of movies', message: 'List of movies in here', movies: movies});
});

 //Find movie
router.get('/:id', async (req, res)=>{
    const movie = await Movie.findById(req.params.id);
    if(!movie)
        return res.status(404).send('The movie was not found');

    res.render('index', {title: 'List of movies', message: 'List of movies in here', movie: movie});
});

//update a movie
router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);

    if(error)
        res.status(404).send(error.details[0].message);

    const movie = await Movie.findByIdAndUpdate(req.params.id, 
        {name: req.body.name},
        {new : true});
    
    if(!movie)
        return res.status(404).send('The movie was not found.');

    res.send(movie);
});

// add new movie
router.post('/', async (req, res)=>{
    const { error } = validate(req.body);
    
    if(error)
        res.status(404).send(error.details[0].message);
    let movie = new Movie({name: req.body.name });
    movie = await movie.save();
    res.send(movie);
});

// remove a movie
router.delete('/:id', async (req, res)=>{
    const movie = await Movie.findByIdAndRemove(req.params.id);
    
    if(!movie)
        return res.status(404).send('The movie was not found.');
    
    res.send(movie);
});

module.exports = router;