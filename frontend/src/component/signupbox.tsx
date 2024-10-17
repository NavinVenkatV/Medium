import { Link, useNavigate } from "react-router-dom"
import { ChangeEvent, useState } from "react"
import { signupInput } from "@navin_venkat/medium-app-common"
import axios from 'axios'
import { backend_url } from "../config"

export const Signupbox = ({ type } : {type : "signup" | "signin"})=>{
    const navigate = useNavigate();
    const [postInput , setpostInput] = useState<signupInput>({
        name : "",
        email : "",
        password : ""
    })

interface ResponseData{
    jwt : string
}

    async function sendReq(){
        try{
            const response = await axios.post<ResponseData>(`${backend_url}/api/v1/user/signup`,postInput);
            const jwt  = response.data.jwt
            localStorage.setItem("token",jwt)
            navigate('/blogs')
        }catch(e){
            alert("Something went wrong")
        }
    }

    return (
        <div className="flex flex-col justify-center h-screen">
            <div className="flex justify-center">
                <div className="max-w-lg">
                    <div className="px-10">
                        <div className="font-extrabold text-4xl text-center">{type === "signup"? "Create an Account" : "Medium"}</div>
                        <div className="text-center text-slate-400">{type === "signup"? "Already have an account?" : "Don't have an account"}
                            <Link className="pl-2 underline"  to={type === 'signup' ? '/signin' : '/signup'}>{type === "signup"? "Sign In?" : "Sign Up"}</Link>
                        </div>
                    </div>
                    <br />
                    <Inputlabelbox placeholder="Enter your name" label="Name(optional)" onChange={(e:any)=>{
                        setpostInput({
                            ...postInput,
                            name : e.target.value
                        })
                    }}/>
                    <Inputlabelbox placeholder="Enter your Email" label="Email" onChange={(e : any)=>{
                        setpostInput({
                            ...postInput,
                            email : e.target.value
                        })
                    }}/>
                    <Inputlabelbox placeholder="Enter your password" label="Password" type={"password"} onChange={(e : any)=>{
                        setpostInput({
                            ...postInput,
                            password : e.target.value
                        })
                    }}/>
                    <button onClick={sendReq} className="bg-black w-full text-white p-2 mt-7 rounded-lg">{type === "signup"? "Sign Up" : "Sign In"}</button>
                </div>
            </div>
        </div>
    )

}

interface typesElement {
    label :string,
    placeholder : string,
    onChange : ( e : ChangeEvent<HTMLInputElement>) => void,
    type? : string
}

function Inputlabelbox({label , placeholder , onChange , type} : typesElement){
    return (
        <div>
            <div className="font-bold mt-2">{label}</div>
            <input type={type || "text" } onChange={onChange} className="w-full bg-transparent mt-2 placeholder:text-slate-600 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder={placeholder} />
        </div>
    )
}
