class Selection {
    constructor (editor) {
        this._currentRange = null
        this.editor = editor
        this.initRange()
    }

    initRange () {
        let range = document.createRange()
        let div = this.editor.textInput.children[0]
        range.setStart(div, 0)
        range.setEnd(div, 0)
        window.getSelection().addRange(range)
        this.saveRange(range)
    }

    getRange() {
        return this._currentRange
    }

    saveRange(_range) {
        if (_range) {
            this._currentRange = _range
            return
        }

        let selection = window.getSelection()
        if (selection.rangeCount === 0) return
        
        const range = selection.getRangeAt(0)
        // console.log(this.editor.textInput.hasChildNodes(range.commonAncestorContainer))
        if (this.editor.textInput.hasChildNodes(range.commonAncestorContainer)) {
            this._currentRange = range
        }
    }

    setH(tag) {
        let tags = null
        switch(tag) {
            case 'h1': {
                tags = {
                    num: 2,
                    content: '# '
                }
                break
            }
            case 'h2': {
                tags = {
                    num: 3,
                    content: '## '
                }
                break
            }
            case 'h3': {
                tags = {
                    num: 4,
                    content: '### '
                }
                break
            }
            case 'h4': {
                tags = {
                    num: 5,
                    content: '#### '
                }
                break
            }
            case 'h5': {
                tags = {
                    num: 6,
                    content: '##### '
                }
                break
            }
            case 'h6': {
                tags = {
                    num: 7,
                    content: '###### '
                }
                break
            }
            default:
                break
        }
        if (tags === null) {
            throw new Error('you should get h1 - h6 to the function')
        }
        // console.log(this.getRange())

        let startNode = this._currentRange.startContainer,
            startOffset = this._currentRange.startOffset,
            endNode = this._currentRange.endContainer,
            endOffset = this._currentRange.endOffset,
            data = startNode.data || startNode.innerHTML

        let i = tags.num,
            c = tags.content

        
        if (startNode.children && startNode.children.length === 1 && startNode.innerHTML === '<br>') {
            alert('请先选择内容！')
            return
        }
        if (data.substring(0,i) === c) {
            // console.log(this._currentRange)
            startNode.data = data.substring(i)
            let soff = startOffset - i < 0 ? startOffset : startOffset - i
            this._currentRange.setStart(startNode, soff)
            if (startNode === endNode) {
                this._currentRange.setEnd(startNode, endOffset- i)
            } else {
                this._currentRange.setEnd(endNode, endOffset)
            }
        } else {
            startNode.data = c + data
            this._currentRange.setStart(startNode, startOffset + i)
            if (startNode === endNode) {
                this._currentRange.setEnd(startNode, endOffset + i)
            } else {
                this._currentRange.setEnd(endNode, endOffset)
            }
        }
    }

    setItalic() {
        let startNode = this._currentRange.startContainer,
            startOffset = this._currentRange.startOffset,
            endNode = this._currentRange.endContainer,
            endOffset = this._currentRange.endOffset

            if (startNode.children && startNode.children.length === 1 && startNode.innerHTML === '<br>') {
                alert('请先选择内容！')
                return
            }

        if (startNode.data[startOffset] === '*' && endNode.data[endOffset-1] === '*') {
            /** 考虑到开始和结束的父节点为同一节点的时候，先设置 endNode 可以避免对选区位置的影响 */
            endNode.data = endNode.data.substring(0, endOffset-1)+endNode.data.substring(endOffset)
            startNode.data = startNode.data.substring(0, startOffset)+startNode.data.substring(startOffset+1)
            this._currentRange.setStart(startNode,startOffset)
            if (startNode === endNode) {
                this._currentRange.setEnd(endNode, endOffset-2)
            } else {
                this._currentRange.setEnd(endNode, endOffset-1)
            }
        } else {
            endNode.data = endNode.data.substring(0, endOffset)+'*'+endNode.data.substring(endOffset)
            startNode.data = startNode.data.substring(0, startOffset)+'*'+startNode.data.substring(startOffset)
            this._currentRange.setStart(startNode,startOffset)
            if (startNode === endNode) {
                this._currentRange.setEnd(endNode, endOffset+2)
            } else {
                this._currentRange.setEnd(endNode, endOffset+1)
            }
        }
    }

    setStrike() {
        let startNode = this._currentRange.startContainer,
            startOffset = this._currentRange.startOffset,
            endNode = this._currentRange.endContainer,
            endOffset = this._currentRange.endOffset


            if (startNode.children && startNode.children.length === 1 && startNode.innerHTML === '<br>') {
                alert('请先选择内容！')
                return
            }

        if (startNode.data.substring(startOffset, startOffset+2) === '**' && endNode.data.substring(endOffset-2, endOffset) === '**') {
            endNode.data = endNode.data.substring(0, endOffset-2)+endNode.data.substring(endOffset)
            startNode.data = startNode.data.substring(0, startOffset)+startNode.data.substring(startOffset+2)
            this._currentRange.setStart(startNode,startOffset)
            if (startNode === endNode) {
                this._currentRange.setEnd(endNode, endOffset-4)
            } else {
                this._currentRange.setEnd(endNode, endOffset-2)
            }  
        } else {
            endNode.data = endNode.data.substring(0, endOffset)+'**'+endNode.data.substring(endOffset)
            startNode.data = startNode.data.substring(0, startOffset)+'**'+startNode.data.substring(startOffset)
            this._currentRange.setStart(startNode,startOffset)
            if (startNode === endNode) {
                this._currentRange.setEnd(endNode, endOffset+4)
            } else {
                this._currentRange.setEnd(endNode, endOffset+2)
            }   
        }
    }

    setDelete() {
        let startNode = this._currentRange.startContainer,
            startOffset = this._currentRange.startOffset,
            endNode = this._currentRange.endContainer,
            endOffset = this._currentRange.endOffset

            if (startNode.children && startNode.children.length === 1 && startNode.innerHTML === '<br>') {
                alert('请先选择内容！')
                return
            }
        
        if (startNode.data.substring(startOffset, startOffset+2) === '~~' && endNode.data.substring(endOffset-2, endOffset) === '~~') {
            endNode.data = endNode.data.substring(0, endOffset-2)+endNode.data.substring(endOffset)
            startNode.data = startNode.data.substring(0, startOffset)+startNode.data.substring(startOffset+2)
            this._currentRange.setStart(startNode,startOffset)
            if (startNode === endNode) {
                this._currentRange.setEnd(endNode, endOffset-4)
            } else {
                this._currentRange.setEnd(endNode, endOffset-2)
            }  
        } else {
            endNode.data = endNode.data.substring(0, endOffset)+'~~'+endNode.data.substring(endOffset)
            startNode.data = startNode.data.substring(0, startOffset)+'~~'+startNode.data.substring(startOffset)
            this._currentRange.setStart(startNode,startOffset)
            if (startNode === endNode) {
                this._currentRange.setEnd(endNode, endOffset+4)
            } else {
                this._currentRange.setEnd(endNode, endOffset+2)
            }   
        }        
    }

    setUl() {    
        let startNode = this._currentRange.startContainer,
            startOffset = this._currentRange.startOffset,
            endNode = this._currentRange.endContainer,
            endOffset = this._currentRange.endOffset,
            data = startNode.data,
            edata = endNode.data,
            list = this._currentRange.commonAncestorContainer.childNodes,
            isSelected = false, // 是否是选区中的节点
            nodeContent = null,  // 节点的文本内容
            begin = null,
            last = null



            if (startNode.children && startNode.children.length === 1 && startNode.innerHTML === '<br>') {
                alert('请先选择内容！')
                return
            }            
        if (startNode === endNode) {
            if (data.substring(0, 2) === '+ ') {
                startNode.data = data.substring(2)
                let soff = startOffset - 2 < 0 ? startOffset : startOffset - 2
                let eoff = endOffset - 2 < 0 ? endOffset : endOffset - 2
                this._currentRange.setStart(startNode, soff)
                this._currentRange.setEnd(startNode, eoff)
            } else {
                startNode.data = '+ ' + data
                this._currentRange.setStart(startNode, startOffset + 2)
                this._currentRange.setEnd(startNode, endOffset + 2)
            }
            return 
        }
        for(let i = 0; i < list.length; i++) {
            nodeContent = list[i].nodeType === 3 ? list[i].data: list[i].innerText
            if (!isSelected && nodeContent === data) {
                isSelected = true
                if (data.substring(0, 2) === '+ ') {
                    startNode.data = data.substring(2)
                    begin = startOffset -2 < 0? startOffset : startOffset -2
                } else {
                    startNode.data = '+ ' + data
                    begin = startOffset + 2
                }
            } else if (isSelected && nodeContent !== endNode.data ) {
                if (nodeContent.substring(0, 2) === '+ ') {
                    list[i].innerText = nodeContent.substring(2)
                } else {
                    list[i].innerText = '+ ' + nodeContent
                }
            } else if (isSelected && nodeContent === edata ) {
                isSelected = false
                if (edata.substring(0, 2) === '+ ') {
                    endNode.data = edata.substring(2)
                    last = endOffset - 2
                } else {
                    endNode.data = '+ ' + edata
                    last = endOffset + 2
                }
            }
        }
        this._currentRange.setStart(startNode, begin)
        this._currentRange.setEnd(endNode, last)       
    }

    setOl() {
        let startNode = this._currentRange.startContainer,
            startOffset = this._currentRange.startOffset,
            endNode = this._currentRange.endContainer,
            endOffset = this._currentRange.endOffset,
            data = startNode.data,
            edata = endNode.data,
            list = this._currentRange.commonAncestorContainer.childNodes,
            isSelected = false, // 是否是选区中的节点
            nodeContent = null,  // 节点的文本内容
            begin = null,
            last = null,
            index = 1


            if (startNode.children && startNode.children.length === 1 && startNode.innerHTML === '<br>') {
                alert('请先选择内容！')
                return
            }
        
        if (startNode === endNode) {
            console.log(data.substring(0, 3) === '1. ')
            if (data.substring(0, 3) === '1. ') {
                startNode.data = data.substring(3)
                let soff = startOffset - 3 < 0 ? startOffset : startOffset - 3
                let eoff = endOffset - 3 < 0 ? endOffset : endOffset - 3
                this._currentRange.setStart(startNode, soff)
                this._currentRange.setEnd(startNode, eoff)
            } else {
                startNode.data = '1. ' + data
                this._currentRange.setStart(startNode, startOffset + 3)
                this._currentRange.setEnd(startNode, endOffset + 3)
            }
            return 
        }
        for(let i = 0; i < list.length; i++) {
            nodeContent = list[i].nodeType === 3 ? list[i].data: list[i].innerText
            if (!isSelected && nodeContent === data) {
                isSelected = true
                if (data.substring(0, 3) === `${index}. `) {
                    startNode.data = data.substring(3)
                    begin = startOffset -3 < 0? startOffset : startOffset -3
                } else {
                    startNode.data = `${index}. ` + data
                    begin = startOffset + 3
                }
                ++index
            } else if (isSelected && nodeContent !== endNode.data ) {
                if (nodeContent.substring(0, 3) === `${index}. `) {
                    list[i].innerText = nodeContent.substring(3)
                } else {
                    list[i].innerText = `${index}. ` + nodeContent
                }
                ++index
            } else if (isSelected && nodeContent === edata ) {
                isSelected = false
                if (edata.substring(0, 3) === `${index}. `) {
                    endNode.data = edata.substring(3)
                    last = endOffset - 3
                } else {
                    endNode.data = `${index}. ` + edata
                    last = endOffset + 3
                }
            }
        }
        this._currentRange.setStart(startNode, begin)
        this._currentRange.setEnd(endNode, last)       
    }

    insertGap() {
        let frg = document.createDocumentFragment(),
            div1 = document.createElement('div'),
            div2 = document.createElement('div'),
            br = document.createElement('br'),
            g = document.createTextNode('---'),
            node = null

        div1.append(br)
        div2.append(g)
        frg.append(div1)
        frg.append(div2)

        if (this._currentRange.startContainer.nodeType === 3) {
            node = this._currentRange.startContainer.parentNode
        } else {
            node = this._currentRange.startContainer
        }
        node = node.sibling

        this.editor.textInput.insertBefore(frg, node)
        this.editor.renderText()
    }

    insertPic(alt, title, url) {
        let frg = document.createDocumentFragment(),
            text = document.createTextNode(`![${alt}](${url} "${title}")`)

        frg.append(text)
        this._currentRange.insertNode(frg)
        this.editor.renderText()
    }

    insertUrl(name, title, url) {
        let frg = document.createDocumentFragment(),
            text = document.createTextNode(`[${name}](${url} "${title}")`)

        frg.append(text)
        this._currentRange.insertNode(frg)
        this.editor.renderText()
    }
}

export default Selection