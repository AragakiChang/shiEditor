export default function (editor, type) {
    editor.menu.h6.addEventListener(type, function(e) {
        editor.selection.setH('h6')
        editor.renderText()
    }, false)
}