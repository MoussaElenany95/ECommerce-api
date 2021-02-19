const mongoose = require('mongoose');
const Joi = require('joi');

Joi.objectId = require('joi-objectid')(Joi);

const schema = new mongoose.Schema({
    _order: {
        type: mongoose.ObjectId,
        ref: "users",
        required: true
    },
    totalPrice: {
        type: Number,
        required: true,
    }
})
module.exports.carts = mongoose.model('Cart', schema)

//validation 
module.exports.validateOrder = function validateOrder(Cart) {
    const schema = Joi.object({
        _order: Joi.objectId().required(),
        totalPrice: Joi.number().required()
    })
    return schema.validate(Cart);
};