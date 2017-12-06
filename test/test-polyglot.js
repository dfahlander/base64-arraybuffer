(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.Base64ArrayBufferTests = {})));
}(this, (function (exports) { 'use strict';

/*
 * base64-arraybuffer
 * https://github.com/niklasvh/base64-arraybuffer
 *
 * Copyright (c) 2017 Brett Zamir, 2012 Niklas von Hertzen
 * Licensed under the MIT license.
 */

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

// Use a lookup table to find the index.
var lookup = new Uint8Array(256);
for (var i = 0; i < chars.length; i++) {
    lookup[chars.charCodeAt(i)] = i;
}

var encode = function encode(arraybuffer, byteOffset, length) {
    var bytes = new Uint8Array(arraybuffer, byteOffset, length),
        len = bytes.length;
    var base64 = '';

    for (var _i = 0; _i < len; _i += 3) {
        base64 += chars[bytes[_i] >> 2];
        base64 += chars[(bytes[_i] & 3) << 4 | bytes[_i + 1] >> 4];
        base64 += chars[(bytes[_i + 1] & 15) << 2 | bytes[_i + 2] >> 6];
        base64 += chars[bytes[_i + 2] & 63];
    }

    if (len % 3 === 2) {
        base64 = base64.substring(0, base64.length - 1) + '=';
    } else if (len % 3 === 1) {
        base64 = base64.substring(0, base64.length - 2) + '==';
    }

    return base64;
};

var decode = function decode(base64) {
    var len = base64.length;

    var bufferLength = base64.length * 0.75;
    var p = 0;
    var encoded1 = void 0,
        encoded2 = void 0,
        encoded3 = void 0,
        encoded4 = void 0;

    if (base64[base64.length - 1] === '=') {
        bufferLength--;
        if (base64[base64.length - 2] === '=') {
            bufferLength--;
        }
    }

    var arraybuffer = new ArrayBuffer(bufferLength),
        bytes = new Uint8Array(arraybuffer);

    for (var _i2 = 0; _i2 < len; _i2 += 4) {
        encoded1 = lookup[base64.charCodeAt(_i2)];
        encoded2 = lookup[base64.charCodeAt(_i2 + 1)];
        encoded3 = lookup[base64.charCodeAt(_i2 + 2)];
        encoded4 = lookup[base64.charCodeAt(_i2 + 3)];

        bytes[p++] = encoded1 << 2 | encoded2 >> 4;
        bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
        bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
    }

    return arraybuffer;
};

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

/*
======== A Handy Little Nodeunit Reference ========
https://github.com/caolan/nodeunit

Test methods:
test.expect(numAssertions)
test.done()
Test assertions:
test.ok(value, [message])
test.equal(actual, expected, [message])
test.notEqual(actual, expected, [message])
test.deepEqual(actual, expected, [message])
test.notDeepEqual(actual, expected, [message])
test.strictEqual(actual, expected, [message])
test.notStrictEqual(actual, expected, [message])
test.throws(block, [error], [message])
test.doesNotThrow(block, [error], [message])
test.ifError(value)
*/

function stringArrayBuffer(str) {
    var buffer = new ArrayBuffer(str.length);
    var bytes = new Uint8Array(buffer);

    [].concat(toConsumableArray(str)).forEach(function (str, i) {
        bytes[i] = str.charCodeAt(0);
    });

    return buffer;
}

function testArrayBuffers(buffer1, buffer2) {
    var len1 = buffer1.byteLength;
    var len2 = buffer2.byteLength;
    var view1 = new Uint8Array(buffer1);
    var view2 = new Uint8Array(buffer2);

    if (len1 !== len2) {
        return false;
    }

    for (var i = 0; i < len1; i++) {
        if (!view1[i] || view1[i] !== view2[i]) {
            return false;
        }
    }
    return true;
}

var base64tests = {
    encode: function encode$$1(test) {
        test.expect(4);

        test.equal(encode(stringArrayBuffer('Hello world')), 'SGVsbG8gd29ybGQ=', "encode 'Hello world'");
        test.equal(encode(stringArrayBuffer('Man')), 'TWFu', "encode 'Man'");
        test.equal(encode(stringArrayBuffer('Ma')), 'TWE=', "encode 'Ma'");
        test.equal(encode(stringArrayBuffer('Hello worlds!')), 'SGVsbG8gd29ybGRzIQ==', "encode 'Hello worlds!'");
        test.done();
    },
    decode: function decode$$1(test) {
        test.expect(3);
        test.ok(testArrayBuffers(decode('TWFu'), stringArrayBuffer('Man')), "decode 'Man'");
        test.ok(testArrayBuffers(decode('SGVsbG8gd29ybGQ='), stringArrayBuffer('Hello world')), "decode 'Hello world'");
        test.ok(testArrayBuffers(decode('SGVsbG8gd29ybGRzIQ=='), stringArrayBuffer('Hello worlds!')), "decode 'Hello worlds!'");
        test.done();
    }
};

exports.base64tests = base64tests;

Object.defineProperty(exports, '__esModule', { value: true });

})));
