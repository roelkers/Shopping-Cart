const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const itemSchema = require('./Item');


const CartSchema = new Schema({
    items : [{
        itemId:  {type: Schema.Types.ObjectId, ref: 'Item'},
        quantity: Number 
    }],
    user: {type: Schema.Types.ObjectId, ref: 'Users'}
  });

  module.exports = mongoose.model('Cart', CartSchema)