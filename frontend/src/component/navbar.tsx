import { Link } from "react-router-dom";
import { Avatar } from "./avatar";

export function Navbar({name} : {name : string}){
    return (
        <div className="flex justify-between py-3 px-8 border">
            <div>
                <Link to="/blogs" ><div className="font-bold text-3xl cursor-pointer">Medium</div></Link>
            </div>
            <div className="flex">
                <div className="mr-10 flex flex-col justify-center mt-1">
                    <Link to="/publish"><button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 
                    focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600
                     dark:hover:bg-green-700 dark:focus:ring-green-800">Publish</button></Link>
                </div>
                <div className="flex flex-col justify-center">
                     <Avatar name={name[0] || "Navin"}/>
                </div>
            </div>
        </div>
    )
}


