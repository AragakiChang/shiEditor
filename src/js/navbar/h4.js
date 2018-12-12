export default function (editor, type) {
    editor.menu.h4.addEventListener(type, function(e) {
        editor.selection.setH('h4')
        editor.renderText()
    }, false)
}