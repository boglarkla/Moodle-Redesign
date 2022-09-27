export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let c = 0;
export function apply_css(css: string): Element {
    c++;
    let id = "tud-moodle-reskin-css-" + c;
    const style = document.createElement("style");
    style.innerHTML = css;
    document.head.appendChild(style);
    style.id = id;
    return style;
}