import babel from 'rollup-plugin-babel';

export default [{
    input: 'src/base64-arraybuffer.js',
    output: {
        file: 'dist/base64-arraybuffer.js',
        format: 'umd',
        name: 'Base64ArrayBuffer'
    },
    plugins: [
        babel()
    ]
}, {
    input: 'test/test.js',
    output: {
        file: 'test/test-polyglot.js',
        format: 'umd',
        name: 'Base64ArrayBufferTests'
    },
    plugins: [
        babel()
    ]
}];
