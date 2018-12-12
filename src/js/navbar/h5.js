export default function (editor, type) {
    editor.menu.h5.addEventListener(type, function(e) {
        editor.selection.setH('h5')
        editor.renderText()
    }, false)
}