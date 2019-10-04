const fs = require('fs');

function encode(filePath) {
  const base64encoded = fs.readFileSync(filePath, 'base64');
  return `data:image/png;base64,${base64encoded}`;
}

module.exports = encode;