const path = require('path'),
    fs = require('fs');

const tampermonkey_header = `
// ==UserScript==
// @name         Moodle Redesign
// @namespace    https://github.com/boglarkla/Moodle-Redesign
// @version      1.1.3
// @description  Moodle Design script
// @author       Boglarka Toth
// @match        *://elearning.uni-obuda.hu/*
// @icon         https://elearning.uni-obuda.hu/indexassets/icon.png
// @run-at       document-start
// @grant        GM_getResourceText
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @grant        GM_getResourceURL
// @grant        GM_xmlhttpRequest
// ==/UserScript==
`;

const bundle_path = path.join(__dirname, "../dist/bundle.js");

// -- Verify that the bundle exists
if (!fs.existsSync(bundle_path))
    throw new Error("Bundle not found");

// -- Read the bundle
const bundle = fs.readFileSync(bundle_path, "utf-8");

// -- Write the tampermonkey script
fs.writeFileSync(path.join(__dirname, "../dist/tampermonkey.user.js"), tampermonkey_header + bundle);

console.log("Tampermonkey script generated");