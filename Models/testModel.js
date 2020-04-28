const mongoose = require('mongoose');
const Joi = require('joi');

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


function validateGenre(genre) {
    const schema = {
      name: Joi.string().min(3).required()
    };
  
    return Joi.validate(genre, schema);
  }

exports.schemaModel = schemaModel;
exports.validateGenre = validateGenre;