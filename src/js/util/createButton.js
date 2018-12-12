export default function (str) {
    let node = document.createElement('div')
    let text = document.createTextNode(str)
    node.appendChild(text)
    node.classList.add('s-e-button')
    return node
}