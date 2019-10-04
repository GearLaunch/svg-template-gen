#!/usr/bin/env node


const chalk = require('chalk');
const fs = require('fs');
const Hashids = require('hashids');

const frameart = require('./generators/frameart/index');
const canvas = require('./generators/canvas/index');
const multipanel4 = require('./generators/multipanel-4/index');

function generate(renderer, productData, frame = null, folder = '.') {
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
  { width: 8, height: 8 },
  { width: 16, height: 16 }
];

const hashids = new Hashids('sample-salt');
const folder = hashids.encode(Date.now());


for(const dim of allDimensions) {
  const productData = { 
    product: { 
      name: `canvas-4-panel-${dim.width}x${dim.height}`,
      withHints: true
    }, 
    dimensions: { width: dim.width, height: dim.height, wrap: 3 }
  };

  generate(multipanel4, productData, null, folder);
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