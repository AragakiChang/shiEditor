export default function (editor, type) {
    editor.menu.strike.addEventListener(type, function (e) {
        editor.selection.setStrike()
        editor.renderText()
    }, false) 
}