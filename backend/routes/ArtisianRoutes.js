const express = require('express');
const { CreateArtisian, LoginArtisian , UserLogin, CreateUser, getUserById, updateEarnedAmountForArtisian,getEarnedAmount, leader, codPayment} = require('../controllers/ArtisianController');

const router = express.Router();

router.post('/artisianregister', CreateArtisian);
router.post('/login', LoginArtisian);
router.post('/userregister', CreateUser);
router.post('/userlogin', UserLogin);
router.get('/userprofile/:id', getUserById)
router.post('/updateearned', updateEarnedAmountForArtisian);
router.get('/earned/:id', getEarnedAmount)
router.get('/leaderboard', leader)
router.get('/cod/:id',codPayment)

module.exports = router;

