const Joi = require('joi');
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});

const Movie = mongoose.model('Movie', movieSchema);

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

module.exports.Movie = Movie;
module.exports.searchMove = searchMove;
module.exports.validate = validateData;