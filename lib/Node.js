const DOMImplementation = require('./DOMImplementation');

class Node {
  static get DOCUMENT_POSITION_DISCONNECTED() { return 1 };
  static get DOCUMENT_POSITION_PRECEDING() { return 2 };
  static get DOCUMENT_POSITION_FOLLOWING() { return 4 };
  static get DOCUMENT_POSITION_CONTAINS() { return 8 };
  static get DOCUMENT_POSITION_CONTAINED_BY() { return 16 };
  static get DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC() { return 32 };
}

/**
 * compareDocumentPosition
 * @see https://github.com/aimwhy/polyfill/blob/master/compareDocumentPosition.md
 */

const compareDocumentPosition = ((() => {
  const indexOf = (arr, needle) => {
    if (arr.indexOf) {
      return arr.indexOf(needle);
    } else {
      for (let i = 0, length = arr.length; i < length; i++) {
        if (arr[i] === needle) {
          return i;
        }
      }
      return -1;
    }
  };

  return (container, element) => {
    let thisOwner;
    let otherOwner;

    if (container.nodeType === 9) {
      thisOwner = container;
    } else {
      thisOwner = container.ownerDocument;
    }


    if (element.nodeType === 9) {
      otherOwner = element;
    } else {
      otherOwner = element.ownerDocument;
    }

    if (container === element) {
      return 0;
    }

    if (container === otherOwner) {
      return 4 + 16;
    }
    if (thisOwner === element) {
      return 2 + 8;
    }
    if (thisOwner !== otherOwner) {
      return 1;
    }

    // Text nodes for attributes does not have a _parentNode. So we need to find them as attribute child.
    if (container.nodeType === 2 && container.childNodes && indexOf(container.childNodes, element) !== -1) {
      return 4 + 16;
    }
    if (element.nodeType === 2 && element.childNodes && indexOf(element.childNodes, container) !== -1) {
      return 2 + 8;
    }

    let point = container;
    const parents = [];
    let previous;

    while (point) {
      if (point == element) {
        return 2 + 8;
      }
      parents.push(point);
      point = point.parentNode;
    }

    point = element;
    previous = null;

    while (point) {
      if (point == container) {
        return 4 + 16;
      }
      const location_index = indexOf(parents, point);
      if (location_index !== -1) {
        const smallest_common_ancestor = parents[location_index];
        const this_index = indexOf(smallest_common_ancestor.childNodes, parents[location_index - 1]);
        const other_index = indexOf(smallest_common_ancestor.childNodes, previous);
        if (this_index > other_index) {
          return 2;
        } else {
          return 4;
        }
      }
      previous = point;
      point = point.parentNode;
    }

    return 1;
  };
}))();



module.exports = {
  default: Node,
  compareDocumentPosition
};
