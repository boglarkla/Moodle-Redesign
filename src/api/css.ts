import { sleep } from "../core/core";
import { Returnable } from "./ver";

const CSS_URL = "https://raw.githubusercontent.com/GrzegorzManiak/TUD-Moodle-Reskin/main/releases/";
const MAX_RTY_AMMT = 3;

let rty_ammt: number = 0;

export default (data: Returnable): Promise<string> => {
    // -- Create the new url
    const NEW_URL = CSS_URL + data.ver + "/styles.css";

    // -- Commence fetch    
    return new Promise(async(resolve: any, reject: any) => {

        async function reload() {
            // -- Retry function
            function retry(e: any) {
                if (rty_ammt < MAX_RTY_AMMT) {
                    rty_ammt++;
                    reload();
                }
                else {
                    console.error("TUD-Moodle-Reskin: Failed to fetch CSS");
                    console.error(e);   
                    reject(e);
                }
            }

            

            // -- Fetch CSS (if needed)
            if(data.needs_update === true) {

                // -- Logs
                console.log("TUD-Moodle-Reskin: Fetching CSS from: " + NEW_URL);    

                // -- REquest parameters
                const FETCH_PARAMS: RequestInit = {
                    method: "GET",
                    mode: "cors",
                    cache: "no-cache",
                }

                // -- Commence fetch
                fetch(NEW_URL, FETCH_PARAMS)
                .then((res: Response) => res.text())
                .then((text: string) => {
                    console.log("TUD-Moodle-Reskin: CSS fetched!");
                    localStorage.setItem("tud-moodle-reskin-css", text);
                    console.log("TUD-Moodle-Reskin: CSS saved!");
                    resolve(text);
                })

                // -- Check if we should retry
                .catch((e: any) => retry(e));
            }

            

            // -- Use local CSS
            else {
                // -- Attempt to set to local storage   
                let css = localStorage.getItem("tud-moodle-reskin-css") || "";

                // -- Check if we should retry
                if(css === "") {
                    console.log("TUD-Moodle-Reskin: Missing CSS in local storage, downloading...");    
                    retry(null);
                }

                // -- Resolve
                resolve(css);
            }
        }

        // -- Start
        reload();
    });
}