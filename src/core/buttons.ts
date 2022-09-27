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

export default () => {
    setInterval(() => {
        set_upload_color();
    }, 150);
}