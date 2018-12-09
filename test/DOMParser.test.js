const path = require('path');
const fs = require('fs');
const { strict: assert } = require('assert');
const { serializeToString } = require('./utils');

const { DOMParser } = require('..');

describe('DOMParser', function() {
  describe('parseFromString', () => {
    it('parses html', () => {
      const source = fs.readFileSync(`${__dirname}/fixtures/example.html`, 'utf-8');
      const document = DOMParser.parseFromString(source, 'text/html');

      assert.equal(serializeToString(document), source);
    });
  })
});
