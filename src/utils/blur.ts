export default function bluringCanvas(percent: number = 0) {
    console.log(document.getElementsByClassName('bluringOff'));
    console.log(document.getElementsByClassName('bluringOff').length)
    console.log(document.getElementsByClassName('bluringOn'));
    if (percent > 0)
    {
        for (let index = 0; index < document.getElementsByClassName('bluringOff').length; index++) {
            const element = document.getElementsByClassName('bluringOff')[index];
            element.className = 'bluringOn'
        }
    }
    else
    {
        for (let index = 0; index < document.getElementsByClassName('bluringOn').length; index++) {
            const element = document.getElementsByClassName('bluringOn')[index];
            element.className = 'bluringOff'
        }
    }
    (document.getElementById('display-canvas') as HTMLElement).style.webkitFilter = `blur(${percent}px)`
}