const express=require('express');
const { signIn, CreateSession } = require('../controllers/dean');

const router = express.Router();

router.post('/signin',signIn)
router.post('/createsession/:id',CreateSession)

module.exports = router