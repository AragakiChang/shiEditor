export default function (editor, type) {
    editor.menu.h2.addEventListener(type, function(e) {
        editor.selection.setH('h2')
        editor.renderText()
    }, false)
}