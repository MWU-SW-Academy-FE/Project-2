function Editor({
    $target,
    initialState,
    onUpdating
}) {
    
    const $editor = document.createElement("div")
    $editor.className = 'editorDiv'
    $target.appendChild($editor)


    let isInitialized = false
    
    this.state = initialState

    this.setState = (nextState) =>{
        this.state = nextState
        $editor.querySelector('[name=title]').value = this.state.title
        $editor.querySelector('[name=content]').value = this.state.content
        this.render()
    }

    this.render = () => {
        if (!isInitialized){
            $editor.innerHTML = `
                <input type="text" name="title"  class="editorTitle" placeholder="제목 없음" value="${this.state.title}" style="width:600px">
                <textarea name="content" class="editorContent" placeholder="내용을 입력하세요"  style="width:600px; height:600px;" >${this.state.content}</textarea>
            `
        }
        isInitialized = true
    }

    this.render()

    $editor.addEventListener('keyup', (e) => {
        const { target } = e
        const { title } = this.state
        const name = target.getAttribute('name')


        const nextState = {
            ...this.state,
            [name]: target.value
        }
        this.setState(nextState)
        onUpdating(this.state)
   })

}

export default Editor;