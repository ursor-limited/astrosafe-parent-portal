import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import alias from '@rollup/plugin-alias';
import css from 'rollup-plugin-import-css';
import json from '@rollup/plugin-json';
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

const replaceImports = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf8');

  // Regular expression to find absolute imports starting with '@/src'
  const regex = /from\s+['"]@\/src\/([^'"]+)['"]/g;

  // Get the directory of the file for relative path resolution
  const dir = path.dirname(filePath);

  // Replace absolute imports with relative imports
  const updatedContent = content.replace(regex, (match, p1) => {
    // Compute the relative path
    const absolutePath = path.join(__dirname, 'src', p1);
    const relativePath = path.relative(dir, absolutePath);

    // Ensure relative path is in correct format
    const formattedPath = relativePath.replace(/\\/g, '/');

    // Return the updated import statement
    return match.replace(
      /@\/src\/[^'"]+/g,
      formattedPath.replace(/\.tsx?$/, '')
    );
  });

  fs.writeFileSync(filePath, updatedContent, 'utf8');
};

// Function to process a directory recursively
const processDirectory = (dirPath) => {
  fs.readdirSync(dirPath).forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (
      path.extname(fullPath) === '.ts' ||
      path.extname(fullPath) === '.tsx'
    ) {
      replaceImports(fullPath);
    }
  });
};

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'es',
      },
    ],
    plugins: [
      alias({
        entries: [
          {
            find: /^@\/src\/(.*)$/,
            replacement: processDirectory(path.join(__dirname, 'src')),
          },
        ],
      }),
      resolve({
        extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
      }),
      commonjs(),
      json(),
      css(),
      copy({
        targets: [{ src: 'src/images', dest: 'dist' }],
      }),
      typescript({ tsconfig: './tsconfig.json' }),
    ],
  },
  {
    input: 'src/index.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [dts()],
  },
];