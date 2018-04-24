const router = require('express').Router()
const routeProduct = require('./product.router')
const routerUser = require('./user.router')

router.get('/', function(req, res) {
  res.send('Selamat datang di API Ecommerce')
})
router.use('/products', routeProduct)
router.use('/users', routerUser)

module.exports = router