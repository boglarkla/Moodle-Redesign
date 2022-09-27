import { minify } from 'csso';
import { readFileSync, writeFileSync } from 'fs';
const path = require('path');   

const PATH = path.resolve(__dirname, '../src/styles.css'),
    OUTPUT = path.resolve(__dirname, '../dist/styles.css');

console.log('Minifying CSS...');
console.log(PATH + ' -> ' + OUTPUT);    

const css = readFileSync(PATH, 'utf8');

const minified = minify(css).css;

writeFileSync(OUTPUT, minified, 'utf8');

