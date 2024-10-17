import { BlogSkeleton } from "../component/blogskeleton";
import { Fullblog } from "../component/fullblog"
import { Navbar } from "../component/navbar";
import { Spinner } from "../component/spinner";
import { useBlog } from "../hooks"
import { useParams } from 'react-router';


export function Blog(){
    const { id } = useParams()
    const {loading,blog} = useBlog({
        id : id || ""
    })
    if(loading){
        return <div>
            <Navbar name="Navin"/>
            <div className="flex flex-col justify-center h-screen">
                <div className="flex justify-center">
                    <Spinner/>
                </div>
            </div>
        </div>
    }

    return (
        <div>
            <div><Navbar name="Navin"/></div>
            <div>
                <Fullblog blog={blog}></Fullblog>
            </div>
        </div>

    )
}