import remove from "./core/remove";
import buttons from "./core/buttons";

import css from "./api/css";
import ver from "./api/ver";

// -- Initialize
remove();
buttons();

(async () => {
    // -- Get CSS
    let data = await ver();

    // -- Logs
    console.log("TUD-Moodle-Reskin: Needs update: " + data.needs_update);
    console.log("TUD-Moodle-Reskin: Version: " + data.ver);

    // -- Set version
    localStorage.setItem("tud-moodle-reskin-ver", data.ver);

    let css_text = await css(data);

    // -- Create style element
    let style = document.createElement("style");
    style.id = "tud-moodle-reskin-css";
    style.innerHTML = css_text;
    document.head.appendChild(style);
})();