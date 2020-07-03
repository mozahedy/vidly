const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());

const movies = [
    {id: 1, name: "The Shawshank Redumption"},
    {id: 2, name: "Inception"},
    {id: 3, name: "The dark Knight"},
    {id: 4, name: "Mad Max"}
];

app.get('/', (req, res)=>{
    res.send('Welcome to vidly movie rental application');
});

//display all movies
app.get('/api/genres', (req, res)=>{
    res.send(movies);
});

 //Find movie
app.get('/api/genres/:id', (req, res)=>{
    const movie = searchMove(req.params.id);
    if(!movie)
        return res.status(404).send('The movie was not found');
});

//update a movie
app.put('/api/genres/:id', (req, res) => {
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
app.post('/api/genres/', (req, res)=>{
    const { error } = validateData(req.body);
    if(error)
        res.status(404).send(error.details[0].message);
    movies.push({id: movies.length+1, name: req.body.name});
    res.send(movies);
});

// remove a movie
app.delete('/api/genres/:id', (req, res)=>{
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

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Listerning to port ${port}`);
})