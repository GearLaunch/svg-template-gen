
const chalk = require('chalk');
const fs = require('fs');
const Hashids = require('hashids');

const { render } = require('./multipanel-32x17.generator');

function generate(render, productData, frame = null, folder = '.') {
  console.log(render);
  console.log(chalk.white('Started svg template for ') + chalk.blue(productData.product.name));

  const output = render(productData.product, productData.dimensions, frame);

  const filename = `./${folder}/ps_${productData.product.name}.svg`;
  
  fs.existsSync(folder) || fs.mkdirSync(folder);

  fs.writeFile(filename, output, 'utf8', (err) => {
    if (err) {
      throw err
    };

    console.log(chalk.white('Template completed. File placed at ') + chalk.white.bold(filename));
  });
}

const hashids = new Hashids('sample-salt');
const folder = hashids.encode(Date.now());

const productData = { 
  product: { 
    name: `canvas-3-panel-${32}x${17}`,
    withHints: false
  }, 
  dimensions: { }
};

function createTemplate() {
  generate(render, productData, null, folder);
}

module.exports = {
  createTemplate
}

