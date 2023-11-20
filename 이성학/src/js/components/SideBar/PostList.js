import { request } from "../api.js"
import { push } from "../router.js"

function PostList({$target, initialState}) {
    const $postList = document.createElement("div")
    $postList.className = 'postList'
    $target.appendChild($postList)

    this.state = initialState

    this.setState = (nextState) => {
        this.state = nextState
        // 데이터가 갱신 될 때 마다 
        this.render() 
    }

    this.createTreeView = (data, main=false) => {
        let str = ""
        let mainstr = ""
        if (main) {
            mainstr= "🗒 "
        }
        //console.log(data)
        if(data.documents.length!==0){
            str += `<li class="dataList" data-id="${data.id}">${mainstr + data.title}<button data-id="${data.id}" class="addBtn">+</button><button data-id="${data.id}" class="delBtn">x</button></li>
                <ul>
                    ${data["documents"].map(element => {
                        return this.createTreeView(element)  
                    }).join("")}
                </ul>
            `
        } else {
            str += `<li class="dataList" data-id="${data.id}">${mainstr + data.title}<button data-id="${data.id}" class="addBtn">+</button><button data-id="${data.id}" class="delBtn">x</button></li>`
        }
        

        return str
    }

    this.render = () => {
        $postList.innerHTML = `
            <ul>
                ${this.state
                    .map((data) => `
                    ${
                        `${this.createTreeView(data, true)}` 
                    }
                    `).join("")
                }
            </ul>
        `
    }
    // 최초 한번 시작
    this.render()


    
    $postList.addEventListener('click',async(e)=>{
        const $target = e.target
        const {className} = e.target

        if($target){
            const {id} = $target.dataset
            if (className==="addBtn"){
                console.log(id)
                const newpost = await request('/documents', {
                    method: 'POST',
                    body: JSON.stringify({
                        title: '제목없음',
                        parent: id
                    })
                  })
                
                push(`/${newpost.id}`)
            } else if (className==="delBtn"){
                const x = await request(`/documents/${id}`,{method:"DELETE"})
                push(``)
            } else if (className==="dataList"){
                push(`/${id}`)
            }
        } 
    })
}



export default PostList;