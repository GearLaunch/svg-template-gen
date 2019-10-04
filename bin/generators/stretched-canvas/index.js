const chalk = require('chalk');
const fs = require('fs');
const _ = require('lodash');

const { 
  frontRectClipName, 
  dShadow, 
  transparencyMaskName, 
  artworkClipName, 
  mirrorEdgesAcronym 
} = require('../../product-name');
const { getSampleImage } = require('../artwork');

const templatePath = './bin/generators/stretched-canvas/template.svg';

// Points per Inch
const ppi = 72;

// Converts to ppi
function toPts(inches) {
  return inches * ppi;
}

// Frame width, in inches


function render({ name, withHints = false }, { width, height, wrap }) {
  const template = fs.readFileSync(templatePath);

  const [
    partOne, partTwo, dimensions, orientation
  ] = _.words(name, /[^-]+/g);
  const category = `${partOne}-${partTwo}`; //because input is «stretched-canvas-dim-or»
  const product = {
    name,
    withHints,
    transparencyMask: transparencyMaskName(category, dimensions, orientation),
    frontRectClip: frontRectClipName(category, dimensions, orientation),
    dShadow: dShadow(category, dimensions, orientation),
    artFrontrectClip: artworkClipName(category, dimensions, orientation),
    artwork: withHints ? getSampleImage() : null
  };

  const viewbox = {
    width: toPts(width + wrap),
    height: toPts(height + wrap),
  }

  const wrapSide = toPts(wrap / 2);
  const bounds = {
    width: toPts(width),
    height: toPts(height),
    wrapSide
  };

  const mirrorEdges = {
    clipTop: mirrorEdgesAcronym(category, dimensions, orientation, 'cpt'),
    clipBottom: mirrorEdgesAcronym(category, dimensions, orientation, 'cpb'),
    clipRight: mirrorEdgesAcronym(category, dimensions, orientation, 'cpr'),
    clipLeft: mirrorEdgesAcronym(category, dimensions, orientation, 'cpl')
  };

  const compiled = _.template(template);
  const output = compiled({ 
    product,
    mirrorEdges,
    bounds,
    viewbox
  });
  
  return output;
}

module.exports = {
  render
}