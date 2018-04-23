const router = require('express').Router()
const routeProduct = require('./product.router')
const routerUser = require('./user.router')

router.use('/products', routeProduct)
router.use('/users', routerUser)

module.exports = router