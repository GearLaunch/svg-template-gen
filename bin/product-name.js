
function orientationSuffix(orientation, frameColor = '') {
  const frameColorSuffix = frameColor.length > 1 ? frameColor[0] + frameColor[1] : 'n';
  const displaySuffix = orientation.length > 0 ? orientation[0] : 's';
  return `${displaySuffix}-${frameColorSuffix}`;
}

function transparencyMaskName(category, dimensions, orientation = '', frameColor = '') {
  
  return `${category}-${dimensions}-${orientationSuffix(orientation, frameColor)}__transp-mask`;
}

function frontRectClipName(category, dimensions, orientation = '', frameColor = '') {
  return `${category}-${dimensions}-${orientationSuffix(orientation, frameColor)}__art-fr-clippath`;
}

function dShadow(category, dimensions, orientation = '') {
  return `${category}-${dimensions}-${orientationSuffix(orientation)}__dshadow`;
}

function mirrorEdgesAcronym(category, dimensions, orientation = '', side, color = '') {
  const colorhint = color.length ? `-${color.substr(0, 2)}` : '';
  return `${category}-${dimensions}-${orientationSuffix(orientation)}${colorhint}__${side}`;
}

function frameClipName(category, dimensions, orientation = '', frameColor = '') {
  return `${category}-${dimensions}-${orientationSuffix(orientation, frameColor)}__frame-clip`;
}

function artworkClipName(category, dimensions, orientation = '', frameColor = '') {
  return `${category}-${dimensions}-${orientationSuffix(orientation, frameColor)}__artwork-frontrect-clip`;
}

function panelName(category, dimensions, index) {
  return `${category}-${dimensions}-pnl${index}`;
}

module.exports = {
  transparencyMaskName,
  frontRectClipName,
  dShadow,
  mirrorEdgesAcronym,
  frameClipName,
  artworkClipName,
  panelName
};
