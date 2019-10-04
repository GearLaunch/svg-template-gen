#!/usr/bin/env node


const chalk = require('chalk');
const fs = require('fs');
const Hashids = require('hashids');

const frameart = require('./generators/frameart/index');

function generate(renderer, productData, frame = {}, folder = '.') {
  console.log(chalk.white('Started svg template for ') + chalk.blue(productData.product.name));

  const output = renderer.render(productData.product, productData.dimensions, frame);

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
  { width: 5, height: 7 },
  { width: 7, height: 5 },

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
  { width: 6, height: 6 },
  { width: 10, height: 10 },
  { width: 12, height: 12 },
  { width: 16, height: 16 },
  { width: 20, height: 20 },
  { width: 24, height: 24 },
  { width: 30, height: 30 },
  { width: 36, height: 36 },

];

const allColors = [
  'white',
  'walnut',
  'black'
];

const product = {
  name: 'frame-wrap-canvas-11x14-vertical'
};

const hashids = new Hashids('sample-salt');
const folder = hashids.encode(Date.now());


for(const dim of allDimensions) {
  for(const color of allColors) {
    const orientation = getOrientation(dim);
    const productData = { 
      product: { 
        name:  composeName(dim, color, orientation),
        withHints: false
      }, 
      dimensions: { width: dim.width, height: dim.height, wrap: 3 }
    };
    const colorData = { color };

    generate(frameart, productData, colorData, folder);
  }
}

function composeName(dim, color, orientation) {
  const left = dim.width > dim.height ? dim.height : dim.width;
  const right = dim.width < dim.height ? dim.height : dim.width;

  return `frame-wrap-canvas-${left}x${right}-${color}${orientation ? '-' : ''}${orientation}`;
}

function getOrientation({ width, height }) {
  if (width === height) {
    return '';
  }
  if (width > height) {
    return 'horizontal';
  }
  return 'vertical';
}

//frameart.render(product, { width: 11, height: 14, wrap: 3 }, {color: 'walnut'});



// const chalk = require("chalk");
// const boxen = require("boxen");

// const greeting = chalk.white.bold("Hello!");

// const boxenOptions = {
//  padding: 1,
//  margin: 1,
//  borderStyle: "round",
//  borderColor: "green",
//  backgroundColor: "#555555"
// };
// const msgBox = boxen( greeting, boxenOptions );

// console.log(msgBox);    

// const yargs = require("yargs");

// const options = yargs
//  .usage("Usage: -n <name>")
//  .option("n", { alias: "name", describe: "Your name", type: "string", demandOption: true })
//  .argv;

// const greeting = `Hello, ${options.name}!`;

// console.log(greeting);