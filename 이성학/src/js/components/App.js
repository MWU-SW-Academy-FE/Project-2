import PostEditPage from "./PostMain/PostEditPage.js";
import PostPage from "./SideBar/PostPage.js";
import { initRouter } from "./router.js";
function App({$target}) {
    const $sideBar = document.createElement("div")
    $sideBar.className = 'listContainer'
    const $postMain = document.createElement("div")
    $postMain.className = 'rendingContainer'
    $target.appendChild($sideBar)
    $target.appendChild($postMain)

    const postPage = new PostPage({
        $target :$sideBar
    })


    
    const postEditPage = new PostEditPage({
        $target : $postMain,
        initialState: {}
    })



    this.route = () => {
        const {pathname} = window.location
        if (pathname==='/이성학/src/index.html'){
            postEditPage.setState({})
            postPage.setState()
        } else {
            const [q,id] = pathname.split('/src/index.html/')
            console.log(id)
            postEditPage.setState({id})
            postPage.setState()
        }
    }

    this.route()



    initRouter(()=>this.route())
}

export default App;