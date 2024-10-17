import { Blog } from "../hooks"
import { Avatar } from "./avatar"


export const Fullblog = ({blog} : {blog : Blog})=>{
    if(!blog){
        return <div className="text-3xl p-6 font-bold font-mono">There is no data</div>
    }
    return(
         <div className="grid grid-cols-12 p-10">
            <div className="col-span-8">
                <div className="font-extrabold text-3xl">{blog.title}</div>
                <div className="text-slate-500 mt-3">Posted on Aug 06, 2025</div>
                <div className="mt-3">{blog.content}</div>
            </div>
            <div className="col-span-4 ">
                <div className="font-semibold">Author</div>
                <div className="flex mt-3">
                    <div className="flex flex-col justify-center">
                        <div><Avatar name={blog.author.name || "Anonymous"} /></div>
                    </div>
                    <div className="pl-2">
                        <div className="font-bold text-lg">{blog.author.name || "Anonymous"}</div>
                        <div className="text-slate-500">Self learn alone will not get you land high paid job you need to increse your connectivity on you line</div>
                    </div>
                </div>
            </div>
        </div>
    )
}