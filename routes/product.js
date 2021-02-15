const _=require('lodash');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
const Product= require('../schema/product');
const auth=require('../middleware/auth')


//////////////////////////////////////////  1 ///////////////////////////////////////

router.post('/add',auth,
body('title').isLength({ min: 1 })
.withMessage('title is required')
, body('price').isLength({ min: 1 })
.withMessage('price is required'),
 body('details').isLength({ min: 1 })
.withMessage('details is required')
, async(req, res) => {
       const errors = validationResult(req); 
       if (!errors.isEmpty()) return res.status(400).send({error: errors.errors[0].msg }); 
  
       const product =new Product({
          title:req.body.title,
          price:req.body.price,
          details:req.body.details
       })
    try{
        await product.save()
       res.send({message:'a new product is added successfully'}) 
    }
    catch(err){
        res.send({error:err}) 
    }
    
  })

  //////////////////////////////////////// 2 ////////////////////////////////////////////
  router.get('/:id',auth,  async(req, res)=> {
    
    const product= await Product.find({_id:req.params.id})
      if(product) return res.send('products :' + product)
 
    })

/////////////////////////////////3/////////////////////////////////

router.get('/',auth,  async(req, res)=> {
     
    const products= await Product.find()
      if(products) return res.send('Products list :'+products)
 
    })

////////////////////////// 4  /////////////////////////////////////////////

router.patch('/:id',auth, async(req, res) => {
       let product
        try{
           product= await Product.findById(req.params.id)
        }
       catch(ex)
       {
        return res.send({error:'this product id is not exist'})
       }
  
          
          const updated= await Product.updateOne(product,{
            $set:{
             title:req.body.title,
             price:req.body.price,
             details:req.body.details
            }
        },{new:true});
            if(updated)
              return res.send({message:'Product is edited successfully',product:product})

   })

  ////////////////////////////// 5 //////////////////////////

   router.delete('/:id',auth,async(req, res) => {

        const product= await Product.findById(req.params.id);
        if(!product) return res.send({error:'this product id is not exist'})
       
           await Product.deleteOne(product)
           return res.send({message:'product deleted successfuly'})
               
       
   })

   module.exports=router;
