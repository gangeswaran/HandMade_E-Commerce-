const express = require('express');
const { CreateArtisian, LoginArtisian , UserLogin, CreateUser} = require('../controllers/ArtisianController');

const router = express.Router();

router.post('/artisianregister', CreateArtisian);
router.post('/login', LoginArtisian);
router.post('/userregister', CreateUser);
router.post('/userlogin', UserLogin);

module.exports = router;

