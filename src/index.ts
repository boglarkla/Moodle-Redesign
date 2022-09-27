const remove_id: Array<string> = [
    'page-header'
]

let cleared_ids: Array<string> = [];

function removeElementById(id: string) {
    const timeout_seconds = 5;

    new Promise((resolve: any) => {
        if (cleared_ids.includes(id))
            resolve();
        
        const interval = setInterval(() => {
            const element = document.getElementById(id);

            if (element) {
                element.remove();
                cleared_ids.push(id);
                clearInterval(interval);
                resolve();
            }
        }, 10);

        setTimeout(() => {
            clearInterval(interval);
            resolve();
        }, timeout_seconds * 1000);
    });
}


const LAB_UPLOAD_CLASS = 'ad-activity-meta-container';
let lab_btns: Array<HTMLElement> = [];

function set_upload_color() {
    // -- fetch all lab upload buttons
    let btns = Array.from(document.getElementsByClassName(LAB_UPLOAD_CLASS));

    // -- filter out buttons that are already recorded
    btns = btns.filter((btn: HTMLElement) => !lab_btns.includes(btn));
 
    // -- set color of new buttons
    btns.forEach((btn: HTMLElement) => {
        let parent = btn.parentElement;
        if (!parent) return;

        // -- Lab was not uploaded
        if(
            parent.innerText.toLowerCase().includes('due') ||
            parent.innerText.toLowerCase().includes('not submitted')
        ) parent.classList.add('lab-not-uploaded');

        // -- Lab was uploaded
        else parent.classList.add('lab-uploaded');

        // -- push button to recorded buttons
        lab_btns.push(btn);
    });
}


// -- Only needs to be called once as 
// this function already has a built in
// interval that waits for the element to
// be loaded
remove_id.forEach(removeElementById);
set_upload_color();

setInterval(() => {
    set_upload_color();
}, 150);