const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { Customer, valiate} = require('../models/customer');

router.get('/', async (req, res)=>{
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

router.get('/:id', async (req, res)=>{
    const customer = await Customer.findById(req.params.id);
    if(!customer)
        res.status(404).send('The customer was not found');
    res.send(customer);
});

router.post('/', async (req, res)=>{
    const { error } = valiate(req.body);
    if(error)
        res.status(404).send(error.details[0].message);

    let customer = new Customer({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    });
    customer = await customer.save();
    res.send(customer);
});

router.put('/:id', async (req, res)=>{
    const { error } = valiate(req.body);
    if(error)
        res.status(404).send(error.details[0].message);
    const customer = await Customer.findByIdAndUpdate(req.params.id,
        {name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone});
    if(!customer)
        req.status(404).send('The customer was not found');
    res.send(customer);
});

router.delete('/:id', async (req, res)=>{
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if(!customer)
        res.status(404).send('The customer was not found.');
    res.send(customer);
});


module.exports = router;