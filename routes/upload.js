// routes/upload.js
const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');

// GET - Show upload form
router.get('/', (req, res) => res.render('index'));

// POST - Handle file upload
router.post(
  '/upload',
  uploadController.upload.single('aadhaarImage'), // Now properly accessed
  uploadController.processAadhaarImage
);

module.exports = router;