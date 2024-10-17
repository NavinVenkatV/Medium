import { Link } from "react-router-dom"
import { Avatar } from "./avatar"

interface cardTypes {
    authorName : string,
    publishedDate : string,
    title : string,
    content : string,
    id : number
}

export const BlogCard = ({
    authorName,
    publishedDate,
    title,
    content,
    id
}:cardTypes)=>{

    return (
       <Link to={`/blog/${id}`}>
            <div className=" p-7 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer ">
                <div className="flex">
                    <Avatar name={authorName} />
                    <div className="font-extralight pl-2 text-sm flex justify-center flex-col">{authorName}</div>
                    <div className="flex justify-center flex-col pl-2">
                        <Circle />
                    </div>
                    <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
                        {publishedDate}
                    </div>
                </div>
                <div className="text-xl font-semibold pt-2">
                    {title}
                </div>
                <div className="text-md font-thin">
                    {content.slice(0, 100) + "..."}
                </div>
                <div className="text-slate-500 text-sm font-thin pt-4">
                    {`${Math.ceil(content.length / 100)} minute(s) read`}
                </div>
        </div>
    </Link>
    )
}

export function Circle(){
    return <div className="w-1 h-1 bg-slate-500 rounded-full">

    </div>
}

