const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

console.log("TUD-Moodle-Reskin: Building...");

const include = [
    'manifest.json',    
    './icons/icon.png',
    './dist/bundle.js',     
];

const INP = path.join(__dirname, '..');
const OUT = path.join(__dirname, '..', 'dist', 'addon');

// Copy files to dist folder
include.forEach((file) => {
    // -- Create output path        
    let out = path.join(OUT, file); 

    // -- Create output directory
    fs.mkdirSync(path.dirname(out), { recursive: true });   

    fs.copyFileSync(path.join(INP, file), out);
    console.log(`TUD-Moodle-Reskin: Copied ${file} to ./dist/addon/${file}`);
});

// compress dist/addon folder
const output = fs.createWriteStream(path.join(OUT, 'addon.zip'));
console.log("TUD-Moodle-Reskin: Compressing addon folder...");

const archive = archiver('zip', {   
    zlib: { level: 5 }  
});

archive.finalize();

let exit = false;
setInterval(() => {
    if (exit) {
        console.log("TUD-Moodle-Reskin: Done!");
        process.exit(0);
    }
}, 150);


output.on('end', () => {
    console.log(`TUD-Moodle-Reskin: ${archive.pointer()} total bytes`);
    console.log('TUD-Moodle-Reskin: Build finished');

    // -- clone to /dist
    fs.copyFileSync(
        path.join(OUT, 'addon.zip'), 
        path.join(INP, 'dist', 'addon.xpi')
    );

    exit = true;
});