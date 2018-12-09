const path = require('path');
const { readFileSync } = require('fs');
const { strict: assert } = require('assert');
const { serializeToString, loadDocument } = require('./utils');

const HTMLElement = require('../lib/HTMLElement');

describe('HTMLElement', function() {
  const document = loadDocument(`${__dirname}/fixtures/example.html`);

  describe('querySelectorAll', () => {
    it('selects elements by tagname', () => {
      const elements = document.documentElement.querySelectorAll('main');

      assert.deepStrictEqual(elements.map(({ nodeName }) => nodeName), [ 'main' ]);
    });

    it('selects elements by id', () => {
      const elements = document.documentElement.querySelectorAll('#main');

      assert.deepStrictEqual(elements.map(({ nodeName }) => nodeName), [ 'main' ]);
    });

    it('selects elements by class', () => {
      const elements = document.documentElement.querySelectorAll('.article');

      assert.deepStrictEqual(elements.map(({ nodeName }) => nodeName), [ 'article' ]);
    });
  });

  describe('querySelector', () => {
    it('selects a single element', () => {
      const element = document.documentElement.querySelector('main');

      assert.deepStrictEqual(element.nodeName, 'main');
    });
  });
});
