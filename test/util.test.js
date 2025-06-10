const assert = require('assert');

const Util = require('../util.js');

// *********************************************************************

describe("Test Util Object", function () {

  it("Test Util.clean() ", function () {

    var actual = Util.clean("UPPERCASE slash / whitespace ");
    assert.strictEqual(actual, "uppercaseslashwhitespace");
  });

  it("Test Util.isValidString() ", function () {

    var valid = Util.isValidString('string');
    var notValid = Util.isValidString({});

    assert.strictEqual(valid, true);
    assert.strictEqual(notValid, false);
  });

});