import {encode, decode} from '../src/base64-arraybuffer.js';

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

function stringArrayBuffer (str) {
    const buffer = new ArrayBuffer(str.length);
    const bytes = new Uint8Array(buffer);

    [...str].forEach((str, i) => {
        bytes[i] = str.charCodeAt(0);
    });

    return buffer;
}

function testArrayBuffers (buffer1, buffer2) {
    const len1 = buffer1.byteLength;
    const len2 = buffer2.byteLength;
    const view1 = new Uint8Array(buffer1);
    const view2 = new Uint8Array(buffer2);

    if (len1 !== len2) {
        return false;
    }

    for (let i = 0; i < len1; i++) {
        if (!view1[i] || view1[i] !== view2[i]) {
            return false;
        }
    }
    return true;
}

export const base64tests = {
    encode (test) {
        test.expect(4);

        test.equal(
            encode(stringArrayBuffer('Hello world')),
            'SGVsbG8gd29ybGQ=',
            "encode 'Hello world'"
        );
        test.equal(
            encode(stringArrayBuffer('Man')),
            'TWFu',
            "encode 'Man'"
        );
        test.equal(
            encode(stringArrayBuffer('Ma')),
            'TWE=',
            "encode 'Ma'"
        );
        test.equal(
            encode(stringArrayBuffer('Hello worlds!')),
            'SGVsbG8gd29ybGRzIQ==',
            "encode 'Hello worlds!'"
        );
        test.done();
    },
    decode (test) {
        test.expect(3);
        test.ok(
            testArrayBuffers(
                decode('TWFu'),
                stringArrayBuffer('Man')
            ),
            "decode 'Man'"
        );
        test.ok(
            testArrayBuffers(
                decode('SGVsbG8gd29ybGQ='),
                stringArrayBuffer('Hello world')
            ),
            "decode 'Hello world'"
        );
        test.ok(
            testArrayBuffers(
                decode('SGVsbG8gd29ybGRzIQ=='),
                stringArrayBuffer('Hello worlds!')
            ),
            "decode 'Hello worlds!'"
        );
        test.done();
    }
};
