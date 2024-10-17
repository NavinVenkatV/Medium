import { useEffect, useState } from "react";
import { backend_url } from "../config";
import axios from 'axios'

export interface Blog {
    "title" : string,
    "content" : string,
    "author" : {
        "name" : string
    },
    "id" : number
}

interface Blogresponse {
    blogs : Blog[]
}

interface SingleBlog{
    blog : Blog[]
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get<Blogresponse>(`${backend_url}/api/v1/blog/bulk`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlogs(response.data.blogs);
                setLoading(false);
            })
    }, [])

    return {
        loading,
        blogs
    }
}

//////////////////////////////////for individual blog getting .....////////////./////////////////

export const useBlog = ({id} : {id : string}) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get<SingleBlog>(`${backend_url}/api/v1/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlog(response.data.blog);
                setLoading(false);
            })
    }, [id])

    return {
        loading,
        blog
    }
}