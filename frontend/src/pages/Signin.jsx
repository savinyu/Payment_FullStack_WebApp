import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import Heading from "../components/Heading";
import InputBox from "../components/Inputbox";
import Subheading from "../components/Subheading";
import Button from "../components/Button";
import BottomWarning from "../components/BottonWarning";

export default function Signin(){
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    return(
        <>
            <div className="bg-slate-300 h-screen flex justify-center">
                <div className=" flex flex-col justify-center">
                    <div className="bg-white rounded-2xl w-100 p-2 text-centre h-max px-4">
                        <Heading label={"Sign in"}/>
                        <Subheading label={"Enter your credentials to access your account"}/>
                        <InputBox onChange={e=>{
                            setUsername(e.target.value)
                        }} label={"Username"} placeholder={"Email"}/>
                        <InputBox onChange={e=>{
                            setPassword(e.target.value)
                        }} label={"Password"} placeholder={"Password"}/>
                        <div className="pt-4">
                            <Button label={"Sign in"} onclick={async()=>{
                                const response = await axios.post('http://localhost:3000/api/v1/user/signin',{
                                    username,
                                    password
                                });
                                localStorage.setItem("token",response.data.token);
                                navigate('/');
                            }}/>
                        </div>
                        <BottomWarning label={"New User?"} to={'/signup'} buttontext={"Sign up"}/>
                    </div>
                </div>
            </div>
        </>
    )
}