const fs = require('fs');
const _ = require('lodash');

const { frontRectClipName, dShadow, transparencyMaskName, mirrorEdgesAcronym } = require('../../product-name');
const { getSampleImage } = require('../artwork');
const templatePath = './bin/generators/canvas/template.svg';

// Points per Inch
const ppi = 72;

// Converts to ppi
function toPts(inches) {
  return inches * ppi;
}

function render({ name, withHints = false }, { width, height, wrap }) {
  const template = fs.readFileSync(templatePath);

  const wrapSide = toPts(wrap / 2);
  const bounds = {
    width: toPts(width),
    height: toPts(height),
    wrapSide
  };

  const viewbox = {
    width: toPts(width + wrap),
    height: toPts(height + wrap),
  }

  const [
    category, dimensions, orientation
  ] = _.words(name, /[^-]+/g);

  const product = {
    name,
    transparencyMask: transparencyMaskName(category, dimensions, orientation),
    frontRectClip: frontRectClipName(category, dimensions, orientation),
    dShadow: dShadow(category, dimensions, orientation),
    mirrorEdges: {
      clipTop: mirrorEdgesAcronym(category, dimensions, orientation, 'cpt'),
      clipBottom: mirrorEdgesAcronym(category, dimensions, orientation, 'cpb'),
      clipRight: mirrorEdgesAcronym(category, dimensions, orientation, 'cpr'),
      clipLeft: mirrorEdgesAcronym(category, dimensions, orientation, 'cpl'),
    },
    artwork: withHints ? getSampleImage() : null
  };

  const compiled = _.template(template);
  const output = compiled({ 
    product,
    bounds,
    wrapSide,
    viewbox
  });

  return output;
}

module.exports = {
  render
}