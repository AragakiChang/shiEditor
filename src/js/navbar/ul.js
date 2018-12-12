export default function (editor, type) {
    editor.menu.ul.addEventListener(type, function() {
        editor.selection.setUl()
        editor.renderText()
    }, false)
}