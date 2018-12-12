export default function (editor, type) {
    editor.menu.pic.addEventListener(type, function(e) {
        if (editor.urlInput.classList.contains('active')) {
            editor.urlInput.classList.remove('active')
        }
        editor.picInput.classList.toggle('active')
    }, false)
}