const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema =  mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true, 
        minlength: 5,
        maxlength: 255
    },
    email: {
        type: String,
        required: true,
        trim: true, 
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024
    },
    isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
}
const User = mongoose.model('Users', userSchema );

function validateUser(user){
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).required().email(),
        password: Joi.string().min(6).required()
    };

    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;