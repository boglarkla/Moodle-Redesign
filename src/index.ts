import remove from "./core/remove";
import buttons from "./core/buttons";

// -- Constants
const MAX_RTY_AMMT = 3;
const VER_REGEX = /css-([0-9].[0-9].[0-9]);/;   

// -- CSS Version url
const VER_URL = "https://raw.githubusercontent.com/GrzegorzManiak/TUD-Moodle-Reskin/main/.ver";
const CSS_URL = "https://github.com/GrzegorzManiak/TUD-Moodle-Reskin/releases/download/css-";

// -- Local toggles
let rty_ammt: number = 0;

// -- Initialize
remove();
buttons();

console.log("TUD-Moodle-Reskin: Loading CSS version...");

// -- Get our version from storage
let local_ver: string | undefined = localStorage.getItem("tud-moodle-reskin-ver");
local_ver = undefined;
console.log("TUD-Moodle-Reskin: Local version: " + local_ver);

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function fetch_css(needs_update: boolean, ver: string) {
    const NEW_URL = CSS_URL + ver + "/styles.css";
    console.log("TUD-Moodle-Reskin: Fetching CSS from: " + NEW_URL);    

    return new Promise(async(resolve: any, reject: any) => {
        
        // -- Fetch CSS (if needed)
        if(needs_update === true) 
        fetch(NEW_URL , {
            method: "GET",
            mode: "same-origin",
            redirect: "follow", 
            headers: {
                'Accept': "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
                'Accept-Encoding': "gzip, deflate, br",   
            }
        })
        .then((res: Response) => {
            console.log(res);
            res.text()
        })
        // .then((text: string) => {
        //     console.log("TUD-Moodle-Reskin: CSS fetched!");
        //     localStorage.setItem("tud-moodle-reskin-css", text);
        //     console.log("TUD-Moodle-Reskin: CSS saved!");
        //     resolve(text);
        // })
        // .catch(async(err: any) => {
        //     // -- Check if we should retry
        //     rty_ammt++;
        //     if(rty_ammt < MAX_RTY_AMMT) {
        //         console.log("TUD-Moodle-Reskin: Failed to fetch CSS, retrying...");
        //         await sleep(1000);
        //         resolve(fetch_css(needs_update, ver));
        //     }
        //     else reject(`Tried to fetch CSS ${rty_ammt} times, but failed.`);

        //     // -- Log error
        //     console.error("TUD-Moodle-Reskin: Failed to fetch CSS: " + err);
        //     reject(err);
        // });


        // -- Use local CSS
        else {
            // -- Attempt to set to local storage   
            let css = localStorage.getItem("tud-moodle-reskin-css") || "";

            // -- Check if we should retry
            if(css === "") {
                rty_ammt++;
                if(rty_ammt < MAX_RTY_AMMT) {
                    console.log("TUD-Moodle-Reskin: Failed to fetch CSS, retrying... LS");
                    await sleep(1000);
                    resolve(fetch_css(needs_update, ver));
                }
                else reject(`Tried to fetch CSS ${rty_ammt} times, but failed.`);
            }

            // -- Resolve
            resolve(css);
        }
    });
}

// -- Get version from github
fetch(VER_URL,
{
    mode: 'cors',
    cache: 'no-cache',
    method: 'GET'
})
.then((res) => res.text())
.then((content) => {

    // -- Decode version
    let ver = content.match(VER_REGEX)[1],
        needs_update = false;

    // -- Check if the request was successful   
    if(ver === undefined) {
        console.error("TUD-Moodle-Reskin: Failed to fetch version!");
        return;
    }

    // -- If versions are different
    if (ver !== local_ver) {
        // -- Update local version
        localStorage.setItem("tud-moodle-reskin-ver", ver);

        // -- Updating
        console.log("TUD-Moodle-Reskin: Updating CSS version..." + (local_ver ? local_ver : 'none') + " -> " + ver);

        // -- Update CSS
        needs_update = true;
    }

    console.log("TUD-Moodle-Reskin: Version " + ver);

    // -- Fetch CSS
    fetch_css(needs_update, ver)
    .then((css: string) => {
        // -- Create style element
        let style = document.createElement("style");
        style.innerHTML = css;
        document.head.appendChild(style);   

        console.log("TUD-Moodle-Reskin: CSS applied!");
        console.log(css);
    })
    .catch((err: any) => {
        console.error("TUD-Moodle-Reskin: Failed to fetch CSS: ");
        console.error(err);    
    });

})
.catch((e) => {
    console.error("TUD-Moodle-Reskin: Error while fetching version");
    console.error(e);
});
