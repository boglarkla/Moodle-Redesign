const path = require('path'),
    fs = require('fs');

const tampermonkey_header = `
// ==UserScript==
// @name         TUD Moodle Reskin
// @namespace    https://github.com/GrzegorzManiak/TUD-Moodle-Reskin
// @version      1.0.0
// @description  TUD Tallaght Moodle Reskin 
// @author       Grzegorz Maniak
// @match        *://elearning-ta.tudublin.ie/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tudublin.ie
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