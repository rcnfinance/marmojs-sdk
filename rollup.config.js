import typescript from 'rollup-plugin-typescript';
import pkg from './package.json';

const name = 'RollupTypeScriptBabel';

export default {
    input: './src/index.ts',

    // Specify here external modules which you don't want to include in your bundle (for instance: 'lodash', 'moment' etc.)
    // https://rollupjs.org/guide/en#external-e-external
    external: [],

    plugins: [
        typescript(),
    ],

    output: [{
        file: pkg.main,
        format: 'cjs',
    }, {
        file: pkg.module,
        format: 'es',
    }, {
        file: pkg.browser,
        format: 'iife',
        name,

        // https://rollupjs.org/guide/en#output-globals-g-globals
        globals: {},
    }],
};
