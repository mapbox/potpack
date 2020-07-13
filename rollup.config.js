import buble from '@rollup/plugin-buble';

export default {
    input: 'index.mjs',
    output: {
        name: 'potpack',
        format: 'umd',
        indent: false,
        file: 'index.js'
    },
    plugins: [buble({transforms: {dangerousForOf: true}})]
};
