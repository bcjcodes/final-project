const express = require('express')
const router = express.Router()

//Load Order Model
const Order = require('../../model/Order')

//@route    GET api/orders/
//@desc     Check for all available orders
//access       Public
router.get('/', async (req, res) => {
  try {
    const order = await Order.find()
    res.json({
      msg: 'Available Orders',
      data: order
    })
  } catch (err) {
    res.json({ msg: 'No available orders' })
  }
})

//@route    GET api/orders/:id
//@desc     Testing specific order
//access       Public
//To check if a product has been ordered
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
    if (!order) {
      res.json({ msg: 'No available orders' })
    }
    res.json({ msg: 'Product has been ordered', data: order })
  } catch (err) {
    res.json({
      // msg: 'No available orders'
    })
  }
})

//@route    POST api/orders
//@desc     Create a new order
//@access   Public
router.post('/', (req, res) => {
  const newOrder = new Order({
    brand: req.body.brand,
    quantity: req.body.quantity,
    description: req.body.description,
    price: req.body.price,
    total: req.body.total,
    category: req.body.category,
    contact: req.body.contact,
    createdAt: req.body.createdAt
  })

  const amountTotal = Number(newOrder.quantity) * Number(newOrder.price)
  newOrder.total = Number(amountTotal)

  newOrder
    .save()
    .then(order =>
      res.status(200).json({
        msg: 'Order Created Successfully',
        data: order
      })
    )
    .catch(err => console.log(err))
})
//@route      PATCH api/orders/:id
//@desc       Updating orders
//@Public     access
router.patch('/:id', (req, res) => {
  const id = req.params.id
  Order.updateOne(
    { _id: req.params.id },
    {
      $set: {
        brand: req.body.brand,
        quantity: req.body.quantity,
        description: req.body.description,
        price: req.body.price,
        total: req.body.total,
        category: req.body.category,
        contact: req.body.contact
      }
    },
    { new: true, runValidators: true }
  )
    .then(order => res.json({ msg: 'Order Updated', data: order }))
    .catch(err =>
      res.status(404).json({
        msg: `Order with the tracking number ${id} does not exist, visit the order page to make a purchase`
      })
    )
})

//@route      DELETE api/orders/:id
//@desc       Deleting orders
//access      Public
router.delete('/:id', (req, res) => {
  const id = req.params.id
  Order.findById(req.params.id)
    .then(order => {
      order.remove().then(() => res.json({ msg: 'Order Deleted' }))
    })
    .catch(err =>
      res.status(404).json({
        msg: `Order with the tracking number ${id} does not exist`
      })
    )
})

//Export the route for use
module.exports = router
