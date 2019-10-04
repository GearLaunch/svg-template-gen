const fs = require('fs');
const _ = require('lodash');

const templatePath = './bin/generators/multipanel-4/template.svg';
const { frontRectClipName, dShadow, frameClipName, transparencyMaskName, panelName } = require('../../product-name');


// Points per Inch
const ppi = 72;

// gutter, in inches
const gutteri = 1;

// Converts to ppi
function toPts(inches) {
  return inches * ppi;
}


function render({ name, withHints = false }, { width, height, wrap }) {
  const template = fs.readFileSync(templatePath);

  const wrapSide = toPts(wrap / 2);
  const gutter = toPts(gutteri);

  const [
    name1, name2, name3, dimensions
  ] = _.words(name, /[^-]+/g);
  console.log(_.words(name, /[^-]+/g));
  const category = `${name1}-${name2}-${name3}`;

  const product = {
    name,
    transparencyMask: transparencyMaskName(category, dimensions),
    frontRectClip: frontRectClipName(category, dimensions),
    dShadow: dShadow(category, dimensions),
    withHints: withHints
  };

  const canvas1 = {
    x: wrapSide,
    y: wrapSide,
    width: toPts(width),
    height: toPts(height),
    name: panelName(category, dimensions, 1)
  };

  const canvas2 = {
    x: wrapSide + gutter + toPts(width),
    y: wrapSide,
    width: toPts(width),
    height: toPts(height),
    name: panelName(category, dimensions, 2)
  };

  const canvas3 = {
    x: wrapSide,
    y: wrapSide + gutter + toPts(height),
    width: toPts(width),
    height: toPts(height),
    name: panelName(category, dimensions, 3)
  };

  const canvas4 = {
    x: wrapSide + gutter + toPts(width),
    y: wrapSide + gutter + toPts(height),
    width: toPts(width),
    height: toPts(height),
    name: panelName(category, dimensions, 4)
  };

  const bounds = {
    width: toPts((width * 2) + gutteri),
    height: toPts((height * 2) + gutteri)
  };

  const viewbox = {
    width: toPts((width * 2) + gutteri + wrap),
    height: toPts((height * 2) + gutteri + wrap),
  }

  const compiled = _.template(template);
  const output = compiled({ 
    viewbox,
    bounds,
    canvas1, 
    canvas2,
    canvas3,
    canvas4,
    gutter,
    wrapSide,
    product
  });

  console.log(`this is the file: \n\n\n ${output} \n\n\n >>>>>>>>>>>>><<<<<<<<<<<<<<<<<<`);
  return output;
}

module.exports = {
  render
}