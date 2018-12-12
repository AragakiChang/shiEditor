export default function (editor, type) {
    editor.menu.ol.addEventListener(type, function(e) {
        editor.selection.setOl()
        editor.renderText()
    }, false)
}