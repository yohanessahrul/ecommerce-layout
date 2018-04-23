const router = require('express').Router()
const User = require('../controllers/user.controller')

router.post('/register', User.register)
router.get('/list', User.list)
router.post('/login', User.login)
router.put('/update/:id', User.update)
router.delete('/delete/:id', User.delete)

module.exports = router