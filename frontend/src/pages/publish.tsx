import { ChangeEvent, useState } from "react";
import { Navbar } from "../component/navbar"
import { backend_url } from "../config"
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface ResponseData{
    id : number
}

export const Publish = ()=>{
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("")
    const navigate = useNavigate()

    return (
    <div>
        <div><Navbar name="Harkirat"/></div>
        <div className="flex justify-center p-3">
            <div className="mt-10 max-w-screen-lg w-full">
                <div className="font-semibold text-lg font-mono ">Title</div>
                <input onChange={(e)=>{
                    setTitle(e.target.value)
                }} type="text" className=" text-gray-900 text-sm border border-black rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600  " placeholder="Title" required />
                <Content onChange={(e)=>{
                    setDescription(e.target.value)
                }}/>
                <div className="mt-3">
                    <button onClick={async ()=>{
                        const response = await axios.post<ResponseData>(`${backend_url}/api/v1/blog`,{
                            title,
                            content : description,
                            published : true
                        },{
                            headers : {
                                Authorization : localStorage.getItem("token")
                            }
                        })
                        navigate(`/blog/${response.data.id}`)
                    }} type="submit" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-black rounded-lg hover:bg-gray-800">
                        Publish post
                    </button>
                </div>
            </div>   
        </div>
    </div>
    )

    
}
function Content({onChange}:{onChange : (e : ChangeEvent<HTMLTextAreaElement>)=>void}){
    return <div>
        <div className="font-semibold text-lg font-mono ">Content</div>
        <textarea onChange={onChange} id="content" rows="5" class="block w-full p-2 border border-black rounded-md  focus:border-black " placeholder="Type your content here..."></textarea>
       
    </div>
}

