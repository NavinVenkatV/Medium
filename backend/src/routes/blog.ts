import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import { blogSchema , updateBlog } from '@navin_venkat/medium-app-common'
export const blogRouter = new Hono<{
    Bindings : {
        DATABASE_URL : string,
        JWT_KEY : string
    },
    Variables : {
        userid  : string
    }
}>()

//Middleware Authentication
blogRouter.use('/*', async(c, next)=>{
    const header = await c.req.header('authorization')  || "";
    try{
        const user = await verify(header, c.env.JWT_KEY)
        if(user){
            c.set("userid",String(user.id))
            await next();
        }
    }catch(e){
        c.status(411)
        return c.text("You are not logged In")
    }
})

//Routes

blogRouter.post('/',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json();
    const { success } = blogSchema.safeParse(body);
    if(!success){
        c.status(411)
        return c.text("Invalid Inputs")
    }
    const userid = await c.get("userid")
    const blog = await prisma.post.create({
        data : {
            title : body.title,
            content : body.content,
            published : body.published,
            authorId : Number(userid)
        }
    })
    return c.json({
        id : blog.id
    })
})

blogRouter.put('/',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json();
    const { success } = updateBlog.safeParse(body);
    if(!success){
        c.status(411)
        return c.text("Invalid Inputs")
    }
    const blog = await prisma.post.update({
        where :{
            id : body.id
        },
        data : { 
            title : body.title,
            content : body.content,
        }
    })
    return c.json({
        id : blog.id
    })
})

//Todo : add pagination=> we should no show up all the blog posts first when the user scroll up all post should addon at first only some posts should appear on screen
blogRouter.get('/bulk',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog = await prisma.post.findMany({
        select:{
            title : true,
            content :true,
            id : true,
            author:{
                select:{
                    name : true
                }
            }
        }
    });
    return c.json({
        blogs : blog
    })
})

blogRouter.get('/:id',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        const id = c.req.param("id")
        const blog = await prisma.post.findFirst({
            where : {
                id : Number(id)
            },
            select : {
                id : true,
                title : true , 
                content : true,
                author : {
                    select : {
                        name : true
                    }
                }
            }
        })
        return c.json({
            blog
        })
    }catch(err){
        c.status(411)
        return c.text("Something went wrong")
    }
})

