const express=require('express');
const { signIn, getSessions, bookSessions } = require('../controllers/students');
const { StudentAuth } = require('../middleware/middleware');
const router = express.Router();

router.post('/signin',signIn)
router.get('/freesessions/:userid',StudentAuth,getSessions)
router.post('/booksession/:userid/:sessionid',StudentAuth,bookSessions)

module.exports = router