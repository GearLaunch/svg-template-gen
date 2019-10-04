const chalk = require('chalk');
const fs = require('fs');
const _ = require('lodash');

const { 
  frontRectClipName, 
  dShadow, 
  frameClipName, 
  transparencyMaskName, 
  artworkClipName, 
  mirrorEdgesAcronym 
} = require('../../product-name');
const { getFrameUri } = require('./frame');
const { getSampleImage } = require('../artwork');

const templatePath = './bin/generators/frameart/template.svg';

// Points per Inch
const ppi = 72;

// Converts to ppi
function toPts(inches) {
  return inches * ppi;
}

// Frame width, in inches
const frameWidth = 0.5;

function render({ name, withHints = false }, { width, height, wrap }, { color }) {
  const template = fs.readFileSync(templatePath);

  const [
    partOne, partTwo, partThree, dimensions, fcolor, orientation
  ] = _.words(name, /[^-]+/g);
  const category = `${partOne}-${partTwo}-${partThree}`; //because input is «frame-wrap-canvas-dim-or»
  const product = {
    name,
    withHints,
    transparencyMask: transparencyMaskName(category, dimensions, orientation, color),
    frontRectClip: frontRectClipName(category, dimensions, orientation, color),
    dShadow: dShadow(category, dimensions, orientation),
    frameClip: frameClipName(category, dimensions, orientation, color),
    artFrontrectClip: artworkClipName(category, dimensions, orientation, color),
    artwork: withHints ? getSampleImage() : null
  };

  const viewbox = {
    width: toPts(width + wrap),
    height: toPts(height + wrap),
  }

  const wrapSide = toPts(wrap / 2);
  const frameSide = toPts(frameWidth);
  const bounds = {
    width: toPts(width),
    height: toPts(height),
    wrapSide,
    frameSide
  };

  const isBlack = color === 'black';

  const frame = {
    x: wrapSide - frameSide,
    y: wrapSide - frameSide,
    width: toPts(width + (frameWidth * 2)),
    height: toPts(height + (frameWidth * 2)),
    side: frameSide,
    isBlack,
    color: isBlack ? 'walnut' : color,
    uri: getFrameUri(width, height, color)
  };

  const mirrorEdges = {
      clipTop: mirrorEdgesAcronym(category, dimensions, orientation, 'cpt', color),
      clipBottom: mirrorEdgesAcronym(category, dimensions, orientation, 'cpb', color),
      clipRight: mirrorEdgesAcronym(category, dimensions, orientation, 'cpr', color),
      clipLeft: mirrorEdgesAcronym(category, dimensions, orientation, 'cpl', color)
  };

  const compiled = _.template(template);
  const output = compiled({ 
    product,
    mirrorEdges,
    bounds,
    viewbox,
    frame
  });

  
  return output;
}

module.exports = {
  render
}