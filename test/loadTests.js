/* globals nodeunit */
import {base64tests} from './test.js';

const tests = {base64tests};

// Todo:
// see loadTests-node file on problems compiling nodeunit
nodeunit.run(
    Object.entries(tests).reduce((suites, [suiteName, suite]) => {
        const tests = nodeunit.testCase(suite); // Calls `setup`
        suites[suiteName] = tests;
        return suites;
    }, {})
);
