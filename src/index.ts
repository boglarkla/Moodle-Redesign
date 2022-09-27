import { apply_css } from "./core/core";
import startup, { load_css } from "./core/startup";

// -- Start loading CSS
const css = load_css();

// -- Check for updates
const server = setInterval(async() => {
    if (document.getElementsByTagName('body')) {
        clearInterval(server);
        return apply_css(await css);
    }
}, 1);


// -- Wait till everything we need is loaded
const local = setInterval(async() => {
    if (document.getElementsByTagName('body')) {
        clearInterval(local);
        return startup();
    }
}, 1);