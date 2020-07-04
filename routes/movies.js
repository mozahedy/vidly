const express = require('express');
const router = express.Router();

const movies = [
    {id: 1, name: "The Shawshank Redumption"},
    {id: 2, name: "Inception"},
    {id: 3, name: "The dark Knight"},
    {id: 4, name: "Mad Max"}
];

 //Find movie
router.get('/:id', (req, res)=>{
    const movie = searchMove(req.params.id);
    if(!movie)
        return res.status(404).send('The movie was not found');
    res.render('index', {title: 'List of movies', message: 'List of movies in here'});
});

//update a movie
router.put('/:id', (req, res) => {
    const movie = searchMove(req.params.id);
    if(!movie)
        return res.status(404).send('The movie was not found.');
    
    const { error } = validateData(req.body);
    if(error)
        res.status(404).send(error.details[0].message);

    movie.name = req.body.name;
    const movies1 = movies.map((m) => {
        if(m.id === parseInt(req.params.id))
            return m = movie;
        else
            return m;
    });
    res.send(movies1);
});

// add new movie
router.post('/', (req, res)=>{
    const { error } = validateData(req.body);
    if(error)
        res.status(404).send(error.details[0].message);
    movies.push({id: movies.length+1, name: req.body.name});
    res.send(movies);
});

// remove a movie
router.delete('/:id', (req, res)=>{
    const movie = searchMove(req.params.id);
    if(!movie)
        return res.status(404).send('The movie was not found.');
    movies.splice(parseInt(req.params.id)-1, 1);
    res.send(movies);
});

// search movie by id
function searchMove(id){
    return movie = movies.find( m => m.id === parseInt(id));
}
// Validate input movie
function validateData(movie){
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(movie, schema);
}

module.exports = router;