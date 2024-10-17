import { Quote } from "../component/quote";
import { Signupbox } from "../component/signupbox";

export function Signin(){
    return (
        <div className="grid grid-cols-1  lg:grid-cols-2">
            <Signupbox type="signin"/>
            <div className="invisible lg:visible">
                <Quote/>
            </div>
        </div>
    )
}