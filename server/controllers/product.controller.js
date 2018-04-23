const Product = require('../models/product.model')


module.exports = {
  create: function(req, res) {
    console.log('ini controler prod')
    console.log('req body---------->',req.body)
    // console.log('REG BODY--------------------->', req)
    // console.log(req.file.cloudStoragePublicUrl)
    let newProduct = new Product({
      name: req.body.name,
      price: req.body.price || 0,
      stock: req.body.stock || 0,
      description: req.body.description,
      image: req.file.cloudStoragePublicUrl
      })
    newProduct.save()
    .then(response => {
      message: 'New item created !'
      console.log('New item created =>', response)
    })
    .catch(err => {
      console.log('Error nih')
    })
  },

  list: function (req, res) {
    Product.find(function(err, response) {
      if(!err) {
        res.status(200).json({
          message: 'Database produk berhasil diambil',
          data: response
        })
      } else {
        res.status(500).json({
          message: 'Internal server error FIND'
        })
      }
    })
  },

  update: function (req, res) {
    Product.findByIdAndUpdate({
      _id: req.params.id
    }, {
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
      description: req.body.description
    }, function(err, response) {
      if(!err) {
        res.status(201).json({
          message: 'Data berhasil diubah',
          data: response
        })
      } else {
        res.status(500).json({
          message: 'Internal server error bro UPDATE'
        })
      }
    })
  },

  delete: function (req, res) {
    Product.deleteOne({
      _id: req.params.id
    }, function(err, response) {
      if(!err) {
        res.status(200).json({
          message: 'Data berhasil dihapus'
        })
      } else {
        res.status(500).json({
          message: 'Internal server error DELETE'
        })
      }
    })
  },

  // kurangiStock: function (req, res) {
  //   Product.findById({
  //     _id: req.params.id
  //   }, {
  //     stock: req.body.stock - 1
  //   }, function(err, response) {
  //     if(!err) {
  //       res.status(201).json({
  //         message: 'Data berhasil diubah',
  //         data: response
  //       })
  //     } else {
  //       res.status(500).json({
  //         message: 'Internal server error bro UPDATE'
  //       })
  //     }
  //   })
  // }
  
}