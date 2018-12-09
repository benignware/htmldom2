const { DOMImplementation: XMLDOMImplementation } = require('xmldom');
const HTMLDocument = require('./HTMLDocument');

class DOMImplementation extends XMLDOMImplementation {
  createHTMLDocument(title) {
    const document = this.createDocument('html', null);
    Object.setPrototypeOf(document, HTMLDocument.prototype);
    document.constructor = HTMLDocument;

    const html = document.createElement('html');
    const body = document.createElement('body');
    html.appendChild(body);
    document.appendChild(html);

    return document;
  }
}

module.exports = DOMImplementation;
