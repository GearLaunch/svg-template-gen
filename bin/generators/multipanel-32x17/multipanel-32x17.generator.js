const fs = require('fs');
const _ = require('lodash');

const templatePath = './bin/generators/multipanel-32x17/template.svg';
const { frontRectClipName, dShadow, frameClipName, transparencyMaskName, panelName } = require('../../product-name');

// Points per Inch
const ppi = 72;

// gutter, in inches
const gutteri = 1;

const widthi = 32;
const heighti = 17;
const wrapi = 3;

// small canvas dimensions, in inches
const smallCanvasi = {
  width: 8,
  height: 10
};

// large canvas dimensions, in inches
const largeCanvasi = {
  width: 11,
  height: 14
};

// Converts to ppi
function toPts(inches) {
  return inches * ppi;
}


function render({ name, withHints = false }) {
  const template = fs.readFileSync(templatePath);

  const wrapSide = toPts(wrapi / 2);
  const gutter = toPts(gutteri);

  const category = `canvas-3-panel`;
  const dimensions = '32x17';

  const product = {
    name,
    transparencyMask: transparencyMaskName(category, dimensions),
    frontRectClip: frontRectClipName(category, dimensions),
    dShadow: dShadow(category, dimensions),
    withHints: withHints
  };

  const canvas1 = {
    x: wrapSide,
    y: toPts((heighti - smallCanvasi.height) / 2),
    width: toPts(smallCanvasi.width),
    height: toPts(smallCanvasi.height),
    name: panelName(category, dimensions, 1)
  };

  const canvas2 = {
    x: wrapSide + gutter + toPts(smallCanvasi.width),
    y: wrapSide,
    width: toPts(largeCanvasi.width),
    height: toPts(largeCanvasi.height),
    name: panelName(category, dimensions, 2)
  };

  const canvas3 = {
    x: wrapSide + (gutter * 2) + toPts(smallCanvasi.width + largeCanvasi.width),
    y: toPts((heighti - smallCanvasi.height) / 2),
    width: toPts(smallCanvasi.width),
    height: toPts(smallCanvasi.height),
    name: panelName(category, dimensions, 3)
  };

  const bounds = {
    width: toPts((smallCanvasi.width * 2) + largeCanvasi.width + (gutteri * 2)),
    height: toPts(largeCanvasi.height)
  };

  const viewbox = {
    width: toPts(widthi),
    height: toPts(heighti),
  }

  const compiled = _.template(template);
  const output = compiled({ 
    viewbox,
    bounds,
    canvas1, 
    canvas2,
    canvas3,
    gutter,
    wrapSide,
    product
  });

  return output;
}

module.exports = {
  render
}