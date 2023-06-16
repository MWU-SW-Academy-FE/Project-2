import { request } from "../api.js";
import Editor from "./Editor.js";

function PostEditPage({$target, initialState}) {
    const $page = document.createElement("div")
    $target.appendChild($page)

    this.state = initialState

    const post = {
        title: '',
        content: ''
    }

    const editor = new Editor({
        $target: $page,
        initialState: post,
        onUpdating : (post) => {
            setTimeout(async ()=>{
                const a = await request(`/documents/${this.state.id}`,{
                    method: "PUT",
                    body: JSON.stringify({
                        title : post.title,
                        content : post.content
                    })
                })
            }, 200)
        }
    })

    this.setState = (nextState) => {

        if (this.state.id !== nextState.id){
            this.state = nextState
            this.fetch()
            return
        }
        
        this.state = nextState
        editor.setState(this.state.post || {
            title: '',
            content: ''
        })
    }



    this.fetch = async () => {
        const {id} = this.state
        const post = await request(`/documents/${id}`)
        
        console.log(post)
        this.setState({
            ...this.state,
            post
        }) 
    }
}

export default PostEditPage;