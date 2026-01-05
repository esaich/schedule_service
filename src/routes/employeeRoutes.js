const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/employeeController');

router.get('/', ctrl.getAll);
router.get('/:nik', ctrl.getByNik);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);    // Untuk Edit
router.delete('/:id', ctrl.delete); // Untuk Hapus
router.post('/rotate', ctrl.rotate);

module.exports = router;