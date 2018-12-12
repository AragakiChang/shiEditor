export default function (editor, type) {
    editor.menu.italic.addEventListener(type, function(e) {
        editor.selection.setItalic()
        editor.renderText()
    }, false)
}   