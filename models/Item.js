const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const ItemSchema = new Schema({
    name: String,
    imgUrl: String,
    description: String,
    price: Number, //in euro
  });

 module.exports = mongoose.model('Item', ItemSchema);