export default function (editor, type) {
    editor.menu.delete.addEventListener(type, function (e) {
        editor.selection.setDelete()
        editor.renderText()
    }, false)
}