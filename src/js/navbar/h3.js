export default function (editor, type) {
    editor.menu.h3.addEventListener(type, function(e) {
        editor.selection.setH('h3')
        editor.renderText()
    }, false)
}