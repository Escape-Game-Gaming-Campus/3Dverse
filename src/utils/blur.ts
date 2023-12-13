export default function bluringCanvas(percent: number = 0) {
    (document.getElementById('display-canvas') as HTMLElement).style.webkitFilter = `blur(${percent}px)`
}