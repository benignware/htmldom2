const path = require('path');
const fs = require('fs');
const { strict: assert } = require('assert');
const pretty = require('pretty');
const { serializeToString } = require('./utils');

const { DOMParser } = require('..');

describe('DOMParser', function() {
  describe('parseFromString', () => {
    it('parses html', () => {
      const source = fs.readFileSync(`${__dirname}/fixtures/example.html`, 'utf-8');
      const document = new DOMParser().parseFromString(source, 'text/html');
      const actual = pretty(serializeToString(document));
      const expected = pretty(source);

      assert.equal(actual, expected);
    });

    it('creates scaffold', () => {
      const source = fs.readFileSync(`${__dirname}/fixtures/partial.html`, 'utf-8');
      const document = new DOMParser().parseFromString(source, 'text/html');
      const actual = pretty(serializeToString(document));
      const expected = pretty(`<html><body>${source}</body></html>`);

      assert.equal(actual, expected);
    });
  })
});
