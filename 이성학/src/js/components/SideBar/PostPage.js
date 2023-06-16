import { request } from "../api.js";
import { push } from "../router.js";
import PostList from "./PostList.js";

function PostPage({$target}) {
    
    const $page = document.createElement("div")
    $target.appendChild($page)

    const postList = new PostList({
        $target: $page,
        initialState: []
    })

    this.setState = async () => {
        const data = await request("/documents")
        postList.setState(data)

    }

    
    const $newBtn =  document.createElement("button")
    $page.appendChild($newBtn)
    $newBtn.textContent = "new Page"

    $newBtn.addEventListener('click', async (e)=>{
        const x = await request(`/documents`,{method:"POST"},JSON.stringify({title:"new",parent:null}))
        push(`/${x.id}`)
    })

}
export default PostPage;