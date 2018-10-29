/*
 * base64-arraybuffer
 * https://github.com/niklasvh/base64-arraybuffer
 *
 * Copyright (c) 2017 Brett Zamir, 2012 Niklas von Hertzen
 * Licensed under the MIT license.
 */
var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'; // Use a lookup table to find the index.

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
  var encoded1, encoded2, encoded3, encoded4;

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

export { encode, decode };
