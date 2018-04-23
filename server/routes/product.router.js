'use strict'
const router = require('express').Router()
const Product = require('../controllers/product.controller')
const {sendUploadToGCS, uploadMem} = require('../middleware/images')

router.post('/create', uploadMem.single('avatar'), sendUploadToGCS, Product.create)
// router.post('/create', Product.create)
router.get('/list', Product.list)
router.put('/update/:id', Product.update)
router.delete('/delete/:id', Product.delete)

module.exports = router