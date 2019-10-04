const chalk = require('chalk');
const fs = require('fs');

const encoder = require('../base64-encoder');

const colors = {
  WHITE: 'white',
  BLACK: 'black',
  WALNUT: 'walnut'
};

// Adjusted ratios
const ratios = [
  {
    name: '24x24',
    ratio: toFixedRatio(24, 24) // 100

  },
  {
    name: '20x60',
    ratio: toFixedRatio(20, 60) // 33.3
  },
  {
    name: '10x20',
    ratio: toFixedRatio(10, 20) // 50.0
  },
  {
    name: '12x18',
    ratio: toFixedRatio(12, 18) // 66.7
  },
  {
    name: '5x7',
    ratio: toFixedRatio(5, 7) // 71.4
  },
  {
    name: '30x40',
    ratio: toFixedRatio(30, 40) // 75.0
  },
  {
    name: '11x14',
    ratio: toFixedRatio(11, 14) // 78.5
  },
  {
    name: '16x20',
    ratio: toFixedRatio(16, 20) // 80.0
  },
  {
    name: '20x24',
    ratio: toFixedRatio(20 ,24) // 83.3
  }
];

function getEncodedImage(width, height, color) {
  const frameFile = getFrameName(width, height, color);
  const encodedImage = encoder(`./bin/generators/frameart/frames/${frameFile}.png`);
  return encodedImage;
}

function getFrameName(width, height, color) {
  const closestFrame = closestRatio(width, height);
  const horizontalSuffix = isHorizontal(width, height) ? '_horizontal' : '';
  const theName = `${closestFrame}_${adjustColorName(color)}${horizontalSuffix}`;
  // DEBUG: console.log(chalk.white(`Frame name for ${width}x${height} in ${color} is `) + chalk.red(`${theName}`));
  return theName;
}

function closestRatio(width, height) {
  if (width > height) {
    // swap
    [width, height] = [height, width];
  }

  const ratioAdj = toFixedRatio(width, height);

  let closest = { distance: 1000, name: 'invalid' };
  for(const item of ratios) {
    const distance = Math.abs(item.ratio - ratioAdj);
    if (distance < closest.distance) {
      closest = { distance, name: item.name };
    }
  }

  // DEBUG: console.log(chalk.red(`(${width}x${height}) => (${closest.name}); ${closest.distance}`));
  return closest.name;
}

function toFixedRatio(width, height) {
  return ((width / height) * 100).toFixed(1);
}

// it corrects the frame name to the correct asset. As of now there's no black frame, only walnut
function adjustColorName(color) {
  if (color.toLowerCase() == colors.BLACK) {
    return colors.WALNUT;
  }

  return color;
}

function isHorizontal(width, height) {
  return width > height;
}

function getFrameUri(width, height, color) {
  const frameName = getFrameName(width, height, color);
  return `https://gearlaunch-product-images.imgix.net/img/product/frames/${frameName}.png`;
}

module.exports = {
  getEncodedImage,
  getFrameName,
  colors,
  closestRatio,
  getFrameUri
}