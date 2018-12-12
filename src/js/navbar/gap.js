export default function (editor, type) {
    editor.menu.gap.addEventListener(type, function(e) {
        editor.selection.insertGap()
        editor.renderText()
    }, false)
}