const fs = require('fs');
const pdf = require('pdf-parse');
const filePath = 'C:/Users/Lenovo/Desktop/Shravan Sadawarte Cv.pdf';
const dataBuffer = fs.readFileSync(filePath);
pdf(dataBuffer)
  .then(data => {
    console.log('--- CV TEXT START ---');
    console.log(data.text);
    console.log('--- CV TEXT END ---');
  })
  .catch(err => {
    console.error('Error parsing PDF:', err);
    process.exit(1);
  });
