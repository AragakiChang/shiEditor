export default function (editor, type) {
    editor.menu.url.addEventListener(type, function(e) {
        if (editor.picInput.classList.contains('active')) {
            editor.picInput.classList.remove('active')
        }
        editor.urlInput.classList.toggle('active')
    }, false)
}