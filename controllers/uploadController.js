// controllers/uploadController.js
const multer = require('multer');
const path = require('path');

// 1. Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// 2. Create Multer instance
const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// 3. Process uploaded image
const processAadhaarImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).send('No file uploaded');
    
    const { name, aadhaarNumber } = await extractAadhaarInfo(req.file.path);
    res.render('results', { name, aadhaarNumber });
  } catch (error) {
    res.status(500).send('Processing error: ' + error.message);
  }
};

// 4. Export both items
module.exports = {
  upload, // Multer middleware
  processAadhaarImage // Processing function
};