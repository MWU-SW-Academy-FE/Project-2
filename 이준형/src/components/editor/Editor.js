export default function Editor({ $target, initialState, onEditing }){
    const $editer = document.createElement('div')
    $editer.className = "editorDiv"
    $target.appendChild($editer)

    this.state = initialState
    let isInit = false

    this.setState = (nextState) => {
        this.state = nextState
        $editer.querySelector('[name=title]').value = this.state.title
        $editer.querySelector('[name=content]').value = this.state.content
        this.render()
    }

    this.render = () => {
        if(!isInit){
            $editer.innerHTML = `
            <input type="text" name="title" class="editorTitle" value="" placeholder="UnTitle" autofocus />
            <textarea name="content" class="editorContent" placeholder="제목을 입력하세요" autofocus></textarea>
        `
        isInit = true
        }
    }

    $editer.addEventListener('click', (e) => {
        const attrName = e.target.getAttribute('name')

        this.setState({
            ...this.state,
            [attrName]: e.target.value
        })
        onEditing(this.state)
    })
    
    this.render()
}