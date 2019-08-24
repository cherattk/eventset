const assert = require('assert');

const Util = require('../build/util.js');

// *********************************************************************

describe("Test Util Object", function () {

  it("Test .clean() ", function () {

    var actual = Util.clean("UPPERCASE slash / whitespace ");
    assert.strictEqual(actual, "uppercaseslashwhitespace");
  });

  it("Test .isValidString() ", function () {

    var valid = Util.isValidString('string');
    var notValid = Util.isValidString({});

    assert.strictEqual(valid, true);
    assert.strictEqual(notValid, false);
  });

});