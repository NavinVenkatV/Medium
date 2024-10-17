import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign} from 'hono/jwt'
import { signinSchema, signupSchema } from '@navin_venkat/medium-app-common'
export const userRouter = new Hono<{
    Bindings : {
        DATABASE_URL : string,
        JWT_KEY : string
    }
}>() 



userRouter.post('/signup', async (c) => {  //=> c means context which has req,res,next
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  const body = await c.req.json();
  const { success } = signupSchema.safeParse(body);
  if(!success){
    c.status(411)
    return c.text("Invalid Inputs")
  }
  try{
    const user = await prisma.user.create({
      data:{
        email    : body.email,
        password : body.password,
        name : body.name
      }
    })
    
    const token = await sign({id : user.id} , c.env.JWT_KEY)
    return c.json({
      jwt : token
    })
  }catch(err){
    c.status(411)
    return c.text("Something went wrong")
  }
})


userRouter.post('signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())
const body = await c.req.json();

const { success } = signinSchema.safeParse(body);
  if(!success){
    c.status(411)
    return c.text("Invalid Inputs")
  }

try{
const user = await prisma.user.findUnique({
  where : {
    email : body.email,
    password : body.password
  }
})
if(!user){
  c.status(403) //statusCode - 403 usually for unauthorized
  return c.text("User not found")
}
  const token = await sign({id : user.id},c.env.JWT_KEY)
  return c.json({
    jwt : token
})
}catch(err){
    c.status(411)
    return c.text("Something went wrong")
} 
})