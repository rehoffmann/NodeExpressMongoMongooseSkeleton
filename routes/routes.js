const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
const router = express.Router();

const newSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now}
});

//create model for Schema, determine which collection to store it in
const schemaModel = mongoose.model('collectionName', newSchema);



router.get('/', async (req,res) => {
        //find all documents for class, can add query filters/regular expressions
        const data = await schemaModel.find().sort('name');
        res.send(data);
    });

router.get('/:id', async (req, res) => {
        const data = await schemaModel.findById(req.params.id);
        //404 Not Found
        if (!data) return res.status(404).send('Not Found');
        res.send(data);
     });

router.post('/', async (req, res) => {
    const {error} = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    let genre = new schemaModel( {
        name: req.body.name
    });
    genre = await genre.save();
    res.send(genre);
});

router.put('/:id', async (req,res) => {
    //validate, if bad entry return 400
    const {error} = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const data = await schemaModel.findByIdAndUpdate(req.params.id, {name: req.body.name}, {
        new: true,
        useFindAndModify: false
    });

    //look up course, if doesnt exist return 404
    if (!data) return res.status(404).send('Not Found');
   
    res.send(data);
});

router.delete('/:id', async (req,res) => {
    const data = await schemaModel.findByIdAndRemove(req.params.id, {useFindAndModify: false});

    if (!data) return res.status(404).send('Not Found');
    //delete

    res.send(data);
})

function validateGenre(genre) {
    const schema = {
      name: Joi.string().min(3).required()
    };
  
    return Joi.validate(genre, schema);
  }

module.exports = router;


//there is also a third update method that combines both, findbyidandupdate

//delete from database
//can also use deleteOne or deleteMany, not sure what the differences are

//updateMany('5ea63bbfba46fc47142599b0');

//VALIDATION: should use both Joi (for client-side) and mongoose (for db-side)