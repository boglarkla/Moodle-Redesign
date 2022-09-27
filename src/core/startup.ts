import css from "../api/css";
import ver from "../api/ver";
import buttons from "./buttons";
import { apply_css } from "./core";
import remove from "./remove";

export default () => {
    // -- Remove transitions so the page doesn't look like it's loading
    const TRANSITION_CSS = `* { transition: none !important; }`;
    const t = apply_css(TRANSITION_CSS);

    // -- First, load from storage      
    let css_ls = localStorage.getItem("tud-moodle-reskin-css") || "";
    apply_css(css_ls);

    // -- Initialize
    remove();
    buttons();

    // -- Remove transition CSS
    t.remove();
}

export function load_css(): Promise<string> {
    return new Promise(async(resolve: any, reject: any) => {
        // -- Get ver
        ver().then((data) => {

            // -- Logs
            console.log("TUD-Moodle-Reskin: Needs update: " + data.needs_update);
            console.log("TUD-Moodle-Reskin: Version: " + data.ver);

            // -- Set version
            localStorage.setItem("tud-moodle-reskin-ver", data.ver);

            // -- Fetch CSS
            css(data).then((css) => {
                // -- Resolve
                resolve(css);
            })
            .catch((e) => reject(e));

        }).catch((e) => reject(e)); 
    });
}