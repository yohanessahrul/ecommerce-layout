const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

module.exports = {
  register: function(req, res) {
    let hashPassword = bcrypt.hashSync(req.body.password, 8);

    let newUser = new User({
      username: req.body.username,
      password: hashPassword,
      fullname: req.body.fullname,
      email: req.body.email,
      role: 'user'
    })

    newUser.save(function(err, response) {
      if(!err) {
        res.status(200).json({
          message: 'Create data suceess !',
          data: response
        })
      } else {
        res.status(500).json({
          message: 'Insert product error'
        })
      }
    })
  },

  list: function (req, res) {
    User.find(function(err, response) {
      if(!err) {
        res.status(200).json({
          message: 'Database User berhasil diambil',
          data: response
        })
      } else {
        res.status(500).json({
          message: 'Internal server error FIND USER'
        })
      }
    })
  },

  login: function(req, res) {
    User.findOne({
      email: req.body.email
    }, function(err, response) {
      if(!response) {
        res.status(404).json({
          message: 'Page tidak ditemukan'
        })
      } else {
        if(!err) {
          let statusCompare = bcrypt.compareSync(req.body.password, response.password)
          console.log(statusCompare)
          if(statusCompare == true){ 
            let payload = {
              id: response._id,
              username: response.username,
              role: response.role
            }
            let token = jwt.sign(payload, process.env.SECRET)
            
            res.status(200).json({
              message: 'Selamat datang ' + response.fullname,
              data: response,
              token: token
            })
          }
        }
      }
    })
  },

  update:function(req, res) {
    let hashPassword = bcrypt.hashSync(req.body.password, 8);
    
    User.findByIdAndUpdate({
      _id: req.params.id
    }, {
      username: req.body.username,
      password: hashPassword,
      fullname: req.body.fullname,
      email: req.body.email,
      role: req.body.role
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

  delete: function(req, res) {
    User.deleteOne({
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
  }

}