import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import alias from '@rollup/plugin-alias';
import css from 'rollup-plugin-import-css';
import copy from 'rollup-plugin-copy';
import dts from 'rollup-plugin-dts';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const loadJSONFile = (file) => {
  return JSON.parse(fs.readFileSync(file, 'utf-8'));
};

const packageJson = loadJSONFile('./package.json');

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const projectRootDir = path.resolve(__dirname);

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
      alias({
        entries: [{ find: /\.(ts|tsx|js|jsx)/, replacement: '/src' }],
      }),
      copy({
        targets: [{ src: 'src/images', dest: 'dist' }],
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
