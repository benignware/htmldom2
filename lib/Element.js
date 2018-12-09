const { DOMImplementation } = require('xmldom');
const { compareDocumentPosition } = require('./Node');

class Element extends (
  DOMImplementation
    .prototype
    .createDocument
    .call(DOMImplementation)
    .createElement('element')
    .constructor
) {
  compareDocumentPosition(otherNode) {
    return compareDocumentPosition(this, otherNode);
  }
};

module.exports = Element;
