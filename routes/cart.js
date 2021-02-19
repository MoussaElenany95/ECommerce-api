const express = require('express');
const router = express.Router();
const { carts, validateCart } = require('../schema/cart');
const products = require('../schema/product');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// get all products in cart for user
router.get('/', [auth, admin], async (req, res) => {
    const productsIds = await carts.find({ "_user": req.user._id }, { _product: 1, _id: 0, _user: 0, totalPrice: 0 });
    if (!productsIds) return res.send("orders don't exist.");
    const userProducts = await products.find({ "_id": { "$in": productsIds } });
    if (!userProducts) return res.status(400).send("products don't exist.");
    res.send(userProducts);
});

//user to delete from cart 
router.delete('/:id', auth, async (req, res) => {

    if (req.user._id != cart._user) return res.status(405).send('method not allowed.');
    const cart = await carts.find({ "_user": req.user._id, "_product": req.params.id });
    if (!cart) return res.status(404).send("failed to find the cart.");
    await orders.deleteOne(cart);
    return res.send("product was deleted successfully");

})

//add product to cart
router.post('/', auth, async (req, res) => {
    const value = {
        _product: req.body._product,
        _user: req.user._id
    } 
    //validation
    const { error } = validateCart(value);
    if (error) return res.status(400).send(error.details[0].message);

    //add cart
    let cart = new carts(value);

    await cart.save();
    res.send("success creation.")
})


module.exports = router;