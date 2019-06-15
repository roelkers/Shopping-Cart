const router = require('express').Router();
const auth = require('../auth');
const Item = require('../../models/Item');
const Cart = require('../../models/Cart');
const _ = require('lodash');

router.get('/', auth.optional, async (req,res) => {
    const items = await Item.find({})

    res.render('../views/shop', {items:items})
})


router.post('/cart/:itemId', auth.required, async(req,res) => {

    const { itemId } = req.params;
    const { userId } = req.body;
    const quantity = parseInt(req.body.quantity);
    
    const cart = await Cart.findOneAndUpdate({user : userId}, {}, {upsert: true, new: true})
    .catch((error) => {
        console.log(error)
    })
    let item;

    if(cart && cart.items){
        item = cart.items.find((item) => item.itemId==itemId)
        if(item){
            item.quantity = item.quantity + quantity;
        }
        else{
            cart.items.push({
                itemId: itemId,
                quantity: quantity
            })
        }    
    }
    
    await cart.save()
    .catch((error) => {
        console.log(error)
    })
    res.send({quantity : quantity})  
})

router.get('/cart', async (req, res) => {
    const token = JSON.parse(req.cookies.token)
    const userId = token._id;

    const cart = await Cart.findOne({user : userId});
    const items = await Item.find({});

    const itemsGrouped = _.groupBy(items, '_id');

    const populatedItems = cart.items.map((cartItem)=>{

        return {
            ...itemsGrouped[cartItem.itemId],
            quantity : cartItem.quantity,
        }
    })

    res.render('../views/cart', {items : populatedItems});
})

router.post('/cart', async (req,res) => {

    const { cartItemUpdate, userId } = (req.body);

    const cart = await Cart.findOne({user : userId})
    const update = JSON.parse(cartItemUpdate)

    cart.items = cart.items.map((item)=> {
        if(update[item.itemId]){
            item.quantity = update[item.itemId]
        }
        return item
    }).filter((item)=> item.quantity > 0)

    cart.save();

    res.send(cart)
})

module.exports = router