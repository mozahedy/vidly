const Joi = require('joi');
const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    isGold: Boolean,
    phone:{
        type: Number,
        required: true
    }
});

const Customer = mongoose.model('Customer', customerSchema);

function validateCustomer(customer){
    const schema = {
        name: Joi.string().min(3).required(),
        phone: Joi.number().required(),
        isGold: Joi.required()
    };
    return Joi.validate(customer, schema);
}

module.exports.Customer = Customer;
module.exports.validate = this.validateCustomer;