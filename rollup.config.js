import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

export default {
    input: './src/index.ts',

    // Specify here external modules which you don't want to include in your bundle (for instance: 'lodash', 'moment' etc.)
    // https://rollupjs.org/guide/en#external-e-external
    external: [ ],

    plugins: [
        // Compile TypeScript/JavaScript files
        typescript({ module: 'ES2015' }),
    ],

    output: [{
        file: pkg.main,
        format: 'umd',
        name: 'library',
        sourcemap: true,
    }],
};
