const { DOMImplementation } = require('xmldom');
const { compareDocumentPosition } = require('./Node');

class Document extends (
  DOMImplementation
    .prototype
    .createDocument
    .call(DOMImplementation)
    .constructor
) {
  compareDocumentPosition(otherNode) {
    return compareDocumentPosition(this, otherNode);
  }
};

module.exports = Document;
