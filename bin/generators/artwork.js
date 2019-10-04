const encoder = require('./base64-encoder');

function getSampleImage() {
  const sampleImgPath = './bin/assets/roar.png';
  return encoder(sampleImgPath);
}

module.exports = {
  getSampleImage
};