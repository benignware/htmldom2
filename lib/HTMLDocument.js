const Document = require('./Document');
const HTMLElement = require('./HTMLElement');

module.exports = class HTMLDocument extends Document {
  createElement(nodeName) {
    const element = super.createElement(nodeName);
    Object.setPrototypeOf(element, HTMLElement.prototype);
    element.constructor = HTMLElement;
    return element;
  }
  get body() {
    return this.getElementsByTagName('body').shift();
  }
};
