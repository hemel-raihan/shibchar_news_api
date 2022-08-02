const express = require('express');
const { register, login } = require('../../controllers/admin/auth');

const router = express.Router();

//register
router.post('/register', register)

//login
router.post('/login', login)


module.exports = router