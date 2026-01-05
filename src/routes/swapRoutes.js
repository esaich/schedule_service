const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/swapController');

router.post('/request', ctrl.requestSwap);
router.get('/history', ctrl.getHistory);

module.exports = router;