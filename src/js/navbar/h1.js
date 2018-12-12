export default function (editor, type) {
    editor.menu.h1.addEventListener(type, function(e) {
        editor.selection.setH('h1')
        editor.renderText()
    }, false)
}