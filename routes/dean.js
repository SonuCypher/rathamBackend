const express=require('express');
const { signIn, CreateSession, getPendingSession } = require('../controllers/dean');
const { DeanAuth } = require('../middleware/middleware');

const router = express.Router();

router.post('/signin',signIn)
router.post('/createsession/:id',DeanAuth,CreateSession)
router.get('/pendingsession/:id', DeanAuth,getPendingSession)

module.exports = router