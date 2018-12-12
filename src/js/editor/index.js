import Selection from '../selection'
import createByTag from '../util/createByTag'
import create from '../util/createButton'
import createByHTML from '../util/createByHTML'
import barEvents from '../navbar'
import Marked from 'marked'

import '../../less/index.less'

class Editor {
    constructor(container) {
        if (container.childNodes.length !== 0) {
            throw new Error('container should not has content !')
        }

        //按钮
        this.menu = {
            h1: create('h1'),
            h2: create('h2'),
            h3: create('h3'),
            h4: create('h4'),
            h5: create('h5'),
            h6: create('h6'),
            italic: create('italic'),
            strike: create('strike'),
            delete: create('delete'),
            ul: create('ul'),
            ol: create('ul'),
            gap: create('insertGap'),
            pic: create('insertPic'),
            url: create('insertUrl')
        }

        let textContent = createByTag('div'),
            textbar = createByTag('div'),
            textInput = createByTag('div'),
            textShower = createByTag('div'),
            picInput = createByHTML(`
                <div class="s-e-picInput-msg">
                    <label for="s-e-pic-alt">alt:</label>
                    <input type="text" id="s-e-pic-alt">
                </div>
                <div class="s-e-picInput-msg">
                    <label for="s-e-pic-title">title:</label>
                    <input type="text" id="s-e-pic-title">
                </div>
                <div class="s-e-picInput-msg">
                    <label for="s-e-pic-url">url:</label>
                    <input type="text" id="s-e-pic-url">
                </div>
                <div id="s-e-pic-submit">确认插入</div>`),
            urlInput = createByHTML(`
                <div class="s-e-urlInput-msg">
                    <label for="s-e-url-name">name</label>
                    <input type="text" id="s-e-url-name">
                </div>
                <div class="s-e-urlInput-msg">
                    <label for="s-e-url-title">title</label>
                    <input type="text" id="s-e-url-title">
                </div>
                <div class="s-e-urlInput-msg">
                    <label for="s-e-url-url">url</label>
                    <input type="text" id="s-e-url-url">
                </div>
                <div id="s-e-url-submit">确认插入</div>`),
            frg = document.createDocumentFragment()

        container.classList.add('s-e-container')
        textbar.classList.add('s-e-textbar')
        textContent.classList.add('s-e-textContent')
        textInput.classList.add('s-e-textInput')
        textShower.classList.add('s-e-textShower')
        picInput.classList.add('s-e-picInput')
        urlInput.classList.add('s-e-urlInput')

        textInput.setAttribute('contenteditable', true)
        let div = document.createElement('div')
        let br = document.createElement('br')
        div.append(br)
        textInput.append(div)

        this.textInput = textInput
        this.textShower = textShower
        this.picInput = picInput
        this.urlInput = urlInput

        textContent.appendChild(textInput)
        textContent.appendChild(textShower)

        Object.keys(this.menu).forEach(item=>{
            textbar.appendChild(this.menu[item])
        })

        frg.appendChild(textbar)
        frg.appendChild(textContent)
        frg.appendChild(picInput)
        frg.appendChild(urlInput)

        container.appendChild(frg)
        this.init()
        console.log(this.selection.getRange().startContainer)
    }

    init () {
        this.selection = new Selection(this)
        this.buttonEvent()
        this.initText()
        this.initPicAndUrl()
    }

    buttonEvent () {
        let type = 'click'
        Object.keys(barEvents).forEach(item => {
            barEvents[item](this, type)
        })
    }

    initText() {
        let selection = this.selection
        let textInput = this.textInput
        let textShower = this.textShower

        textInput.addEventListener('blur', function(e) {
            // console.dir(selection)
            selection.saveRange()
        }, false)
        
        textInput.addEventListener('keyup', function (e) {
            if (e.keyCode === 8) {
                if (textInput.childNodes.length === 1) {
                    let dom = textInput.children[0]
                    if (dom.tagName.toLowerCase() === 'div' && dom.childNodes.length === 1 && dom.childNodes[0] && dom.childNodes[0].nodeType === 1) {
                        // console.log('stop')
                        e.preventDefault()
                    } 
                    if (dom.tagName.toLowerCase() === 'br') {
                        textInput.innerHTML = '<div><br></div>'
                    }
                }
            }
            textShower.innerHTML = Marked(e.target.innerText)
        }, false)
        
        textInput.addEventListener('keydown', function (e) {
            if (e.keyCode === 8) {
                if (textInput.childNodes.length === 1) {
                    let dom = textInput.children[0]
                    if (dom.tagName.toLowerCase() === 'div' && dom.childNodes.length ===1 && dom.childNodes[0] && dom.childNodes[0].nodeType === 1) {
                        // console.log('stop')
                        e.preventDefault()
                    }
                }
            }
        })  
    }

    //图片和 URL提交页面
    initPicAndUrl () {
        let picInput = this.picInput
        let urlInput = this.urlInput
        let selection = this.selection
        picInput.querySelector('#s-e-pic-submit').addEventListener('click', function(e){
            let alt = picInput.querySelector('#s-e-pic-alt').value
            let title = picInput.querySelector('#s-e-pic-title').value
            let url = picInput.querySelector('#s-e-pic-url').value

            selection.insertPic(alt, title, url)
            picInput.classList.remove('active')
        }, false)

        urlInput.querySelector('#s-e-url-submit').addEventListener('click', function(e){
            let name = urlInput.querySelector('#s-e-url-name').value
            let title = urlInput.querySelector('#s-e-url-title').value
            let url = urlInput.querySelector('#s-e-url-url').value

            selection.insertUrl(name, title, url)
            urlInput.classList.remove('active')
        }, false)
    }

    // 获取markdown文本

    renderText() {
        this.textShower.innerHTML = Marked(this.textInput.innerText)
    }

    getText() {
        return this.textShower.innerText
    }
}

window.Editor = Editor

export default Editor