export default function bluringCanvas(percent: number = 0) {
    if (percent > 0)
    {
        const off = document.getElementsByClassName('bluringOff').length;
        for (let index = 0; index < off; index++) {
            const element = document.getElementsByClassName('bluringOff')[0];
            element.className = element.className.replaceAll('bluringOff', 'bluringOn')
        }
    }
    else
    {
        const on = document.getElementsByClassName('bluringOn').length;
        for (let index = 0; index < on; index++) {
            const element = document.getElementsByClassName('bluringOn')[0];
            element.className = element.className.replaceAll('bluringOn', 'bluringOff')
        }
    }
    (document.getElementById('display-canvas') as HTMLElement).style.webkitFilter = `blur(${percent}px)`
}