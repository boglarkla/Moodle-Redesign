const VER_URL = "https://raw.githubusercontent.com/GrzegorzManiak/TUD-Moodle-Reskin/main/.ver";
const VER_REGEX = /css-([0-9].[0-9].[0-9]);/;   

export interface Returnable {
    needs_update: boolean;
    ver: string;
}

export default (): Promise<Returnable> => {
    // -- Get our version from storage
    let local_ver: string | undefined = localStorage.getItem("tud-moodle-reskin-ver");

    // -- Fetch paramaters 
    const FETCH_PARAMS: RequestInit = {
        mode: 'cors',
        cache: 'no-cache',
        method: 'GET'
    }
    
    // -- Commence fetch
    return new Promise(async(resolve: any, reject: any) => {

        // -- Get version from github
        fetch(VER_URL, FETCH_PARAMS)
        .then((res) => res.text())
        .then((content) => {
            // -- Decode version
            let ver = content.match(VER_REGEX);
        
            console.log("TUD-Moodle-Reskin: Remote version: " + ver);
        
            // -- If versions are different
            if (ver.length > 0 && ver[1] !== local_ver) 
                resolve({needs_update: true, ver: ver[1]});

            else resolve({needs_update: false, ver: local_ver || ""});

        })
        .catch((e) => reject);
    });
};