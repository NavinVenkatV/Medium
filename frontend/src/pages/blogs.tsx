import { BlogCard } from "../component/Blogcard"
import { BlogSkeleton } from "../component/blogskeleton"
import { Navbar } from "../component/navbar"
import { useBlogs } from "../hooks"

export const Blogs= ()=>{
    const {loading , blogs}  = useBlogs()
    if(loading){
        return <div>
            <Navbar name="Navin"/>
            <div className="flex justify-center">
               <div className="flex flex-col justify-center my-6 ">
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
               </div>
            </div>
        </div>
    }

    return (
        <div>
            <Navbar name={"Navin Venkat"}/>
             <div className="flex justify-center">
            <div className="my-6">
                {blogs.map(blog => <BlogCard id={blog.id} authorName={blog.author.name || "harkirat singh"} publishedDate="Dec 3 2004" content={blog.content}
                title={blog.title}/>)}
            </div>
        </div>
        </div>
       
    )
}



