import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import css from 'rollup-plugin-import-css';
import copy from 'rollup-plugin-copy';
import dts from 'rollup-plugin-dts';
import fs from 'fs';

const loadJSONFile = (file) => {
  return JSON.parse(fs.readFileSync(file, 'utf-8'));
};

const packageJson = loadJSONFile('./package.json');

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
      },
      {
        file: packageJson.module,
        format: 'esm',
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      css(),
      copy({
        targets: [{ src: 'src/images', dest: 'dist/images' }],
      }),
      typescript({ tsconfig: './tsconfig.json' }),
    ],
  },
  {
    input: 'dist/esm/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
  },
];
