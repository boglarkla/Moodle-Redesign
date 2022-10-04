import { minify } from 'csso';
import { readFileSync, writeFileSync } from 'fs';
const path = require('path'),
    fs = require('fs');

const PATH = path.resolve(__dirname, '../src/styles/'),
    OUTPUT = path.resolve(__dirname, '../dist/styles.css');

console.log('Minifying CSS...');
console.log('Reading files from ' + PATH);
console.log('Writing to ' + OUTPUT);

// -- Read all files in the path
const files = fs.readdirSync(PATH);

// -- Read all files and minify them
let css = '';

files.forEach((file: string) => {
    const filePath = path.resolve(PATH, file);

    if (fs.statSync(filePath).isFile()) {
        css += minify(readFileSync(filePath, 'utf8')).css;
    }
});

// -- Write the minified css to the output file
const MINIFIED = minify(css).css;

console.log('Writing ' + MINIFIED.length + ' bytes to ' + OUTPUT);

writeFileSync(OUTPUT, MINIFIED);

console.log('Done!');