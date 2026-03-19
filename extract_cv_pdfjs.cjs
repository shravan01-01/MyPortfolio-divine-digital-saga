const fs = require('fs');
const path = require('path');

const filePath = path.resolve('C:/Users/Lenovo/Desktop/Shravan Sadawarte Cv.pdf');
const rawData = new Uint8Array(fs.readFileSync(filePath));

(async () => {
  try {
    const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs');
    const loadingTask = pdfjsLib.getDocument({ data: rawData });
    const pdf = await loadingTask.promise;
    let text = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items.map(item => item.str).join(' ');
      text += `--- PAGE ${i} ---\n${pageText}\n\n`;
    }

    console.log(text);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
})();
