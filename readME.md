# shiEditor
> 基于 marked.js 的 markdown 编辑器，这是究极最简陋的版本！

## 引入方法

通过使用 webpack
  ```
    import Editor from 'shiEditor/index'

    let root = document.querySelector('.root')
    let editor = new Editor(root)

    console.log(editor.renderText())
  ```

通过 script　引入
　```
    <script src="./dist/bundle.js"></script>
    <script>
        let root = document.querySelector('.root')
        let editor = new _shi_Editor(root)
    </script>
  ```