const mongoose = require('mongoose');
const Joi = require('joi');

Joi.objectId = require('joi-objectid')(Joi);

const schema = new mongoose.Schema({
    _user:{
        type: mongoose.ObjectId,
        ref: "users",
        required: true
    },
    _product: {
        type: mongoose.ObjectId,
        ref: "products",
        required: true
    },
    totalPrice: {
        type: Number,
    }
})
module.exports.carts = mongoose.model('Cart', schema)

//validation 
module.exports.validateCart = function validateCart(Cart) {
    const schema = Joi.object({
        _user: Joi.objectId().required(),
        _product: Joi.objectId().required(),
        totalPrice: Joi.number()
    })
    return schema.validate(Cart);
};