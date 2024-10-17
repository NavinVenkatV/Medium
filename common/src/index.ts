import z from 'zod'

export const signupSchema = z.object({
    email : z.string().email(),
    password : z.string().min(8),
    name : z.string().optional()
})


export const signinSchema = z.object({
    email : z.string().email(),
    password : z.string().min(8)
})



export const blogSchema = z.object({
    title : z.string(),
    content : z.string(),
    published : z.boolean().optional()
})


export const updateBlog = z.object({
    title : z.string(),
    content : z.string(),
    id : z.number()
})

export type updateblogInput = z.infer<typeof updateBlog> 
export type blogInput = z.infer<typeof blogSchema>
export type signinInput = z.infer<typeof signinSchema>
export type signupInput = z.infer<typeof signupSchema>

