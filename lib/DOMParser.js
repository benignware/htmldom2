const { DOMParser: XMLDOMParser } = require('xmldom');
const htmlparser = require("htmlparser2");
const DOMImplementation = require('./DOMImplementation');
const HTMLElement = require('./HTMLElement');

const objTreeToW3C = (document, { type, name, attribs, children = [], data }) => {
  const nodeTypeMapping = {
    tag: () => document.createElement(name),
    text: () => document.createTextNode(data),
    comment: () => document.createComment(data),
    script: () => document.createElement('script'),
    style: () => document.createElement('style'),
    directive: () => document.createElement('<!-- directive -->')
  };
  if (!nodeTypeMapping[type]) {
    throw new Error(`Unsupported node type: ${type}`);
  }

  const node = nodeTypeMapping[type](arguments);

  for (let child of children) {
    const el = objTreeToW3C(document, child);
    node.appendChild(el);
  }

  if (attribs) {
    for (let [ name, value ] of Object.entries(attribs)) {
      node.setAttribute(name, value);
    }
  }

  if (node.nodeType === 1) {
    Object.setPrototypeOf(node, HTMLElement.prototype);
    node.constructor = HTMLElement;
  }
  return node;
}

class DOMParser extends XMLDOMParser {

  static parseFromString(source, mimeType = 'text/xml') {
    if (/\/x?html?$/.test(mimeType)) {
      const impl = new DOMImplementation();
      const document = impl.createHTMLDocument();

      // We're going to replace initial scaffold
      while (document.lastChild) {
        document.removeChild(document.lastChild);
      }

      // Actually parse html string
      let tree;

      const handler = new htmlparser.DomHandler(function (error, dom) {
        if (error) {
          throw error;
        }
        tree = dom;
      });
      const parser = new htmlparser.Parser(handler);

      parser.write(source);
      parser.end();

      // Wrap tree into proper scaffold if missing
      let root = tree.find(node => node.name === 'html');

      if (!root) {
        root = {
          type: 'tag',
          name: 'html',
          attribs: {},
          children: tree
        };
      }

      tree = [ root ];

      const body = root.children.find(node => node.name === 'body');

      if (!body) {
        root.children = [{
          type: 'tag',
          name: 'body',
          attribs: {},
          children: root.children
        }];
      }

      // Transform to w3c-compliant object
      const fragment = document.createDocumentFragment();

      tree.forEach(node => {
        const w3cNode = objTreeToW3C(document, node);

        fragment.appendChild(w3cNode);
      });
      document.appendChild(fragment);

      return document;
    }
  }
}

module.exports = DOMParser;
