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

export default () => {
    remove_id.forEach(removeElementById);
}