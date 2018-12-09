const { readFileSync } = require('fs');
const { XMLSerializer } = require('xmldom');
const { DOMParser } = require('..');

const serializeToString = document =>
  (new XMLSerializer()).serializeToString(document);

const parseFromString = source =>
  DOMParser.parseFromString(source, 'text/html');

const loadDocument = file =>
  parseFromString(readFileSync(file, 'utf-8'), 'text/html');

module.exports = {
  serializeToString,
  parseFromString,
  loadDocument
};
