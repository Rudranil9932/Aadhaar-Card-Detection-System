const { createWorker } = require('tesseract.js');

async function extractAadhaarInfo(imagePath) {
  const worker = await createWorker();
  try {
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data: { text } } = await worker.recognize(imagePath);
    
    // Extraction logic
    const aadhaarRegex = /\d{4}\s\d{4}\s\d{4}/;
    return {
      aadhaarNumber: text.match(aadhaarRegex)?.[0] || 'Not found',
      name: text.split('\n').find(line => line.match(/name/i)) || 'Name not found'
    };
  } finally {
    await worker.terminate();
  }
}

module.exports = { extractAadhaarInfo };  // Named export