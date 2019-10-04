#!/usr/bin/env node

const chalk = require('chalk');
const fs = require('fs');
const Hashids = require('hashids');

const renderer = require('./generators/stretched-canvas/index');

function generate(renderer, productData, frame = {}, folder = '.') {
  console.log(chalk.white('Started svg template for ') + chalk.blue(productData.product.name));

  const output = renderer.render(productData.product, productData.dimensions);

  const filename = `./${folder}/ps_${productData.product.name}.svg`;
  
  fs.existsSync(folder) || fs.mkdirSync(folder);

  fs.writeFile(filename, output, 'utf8', (err) => {
    if (err) {
      throw err
    };

    console.log(chalk.white('Template completed. File placed at ') + chalk.white.bold(filename));
  });
}

const allDimensions = [
  { width: 8, height: 10 },
  { width: 10, height: 8 },

  { width: 10, height: 20 },
  { width: 20, height: 10 },

  { width: 11, height: 14 },
  { width: 14, height: 11 },

  { width: 12, height: 16 },
  { width: 16, height: 12 },

  { width: 12, height: 18 },
  { width: 18, height: 12 },

  { width: 12, height: 36 },
  { width: 36, height: 12 },

  { width: 16, height: 20 },
  { width: 20, height: 16 },

  { width: 16, height: 24 },
  { width: 24, height: 16 },

  { width: 18, height: 24 },
  { width: 24, height: 18 },

  { width: 20, height: 24 },
  { width: 24, height: 20 },

  { width: 20, height: 30 },
  { width: 30, height: 20 },

  { width: 20, height: 60 },
  { width: 60, height: 20 },

  { width: 24, height: 30 },
  { width: 30, height: 24 },

  { width: 24, height: 36 },
  { width: 36, height: 24 },

  { width: 30, height: 40 },
  { width: 40, height: 30 },

  { width: 32, height: 48 },
  { width: 48, height: 32 },

  // squares
  { width: 10, height: 10 },
  { width: 12, height: 12 },
  { width: 16, height: 16 },
  { width: 20, height: 20 },
  { width: 24, height: 24 },
  { width: 30, height: 30 },
  { width: 36, height: 36 },

];

const hashids = new Hashids('sample-salt');
const folder = hashids.encode(Date.now());

for(const dim of allDimensions) {
  const orientation = getOrientation(dim);
  const productData = { 
    product: { 
      name:  composeName(dim, orientation),
      withHints: false
    }, 
    dimensions: { width: dim.width, height: dim.height, wrap: 3.25 }
  };

  generate(renderer, productData, null, folder);
}

function composeName(dim, orientation) {
  const left = dim.width > dim.height ? dim.height : dim.width;
  const right = dim.width < dim.height ? dim.height : dim.width;

  return `stretched-canvas-${left}x${right}-${orientation}`;
}

function getOrientation({ width, height }) {
  if (width === height) {
    return 'square';
  }
  if (width > height) {
    return 'horizontal';
  }
  return 'vertical';
}