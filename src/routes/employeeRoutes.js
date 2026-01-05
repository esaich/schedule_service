const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/employeeController');

router.get('/', ctrl.getAll);
router.get('/:nik', ctrl.getByNik);
router.post('/', ctrl.create);
router.put('/:nik', ctrl.update);
router.delete('/:nik', ctrl.delete);
router.post('/rotate', ctrl.rotate);

module.exports = router;