import { useState } from "react";
import Heading from "../components/Heading";
import InputBox from "../components/Inputbox";
import Subheading from "../components/Subheading";
import Button from "../components/Button";
import BottomWarning from "../components/BottonWarning";
import axios from 'axios';
import {  useNavigate } from "react-router-dom";

export default function Signup(){
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    return(
        <>
            <div className="bg-slate-300 h-screen flex justify-center">
                <div className="flex flex-col justify-center">
                    <div className="rounded-2xl bg-white w-100 p-2 text-centre h-max px-4">
                    <Heading label={"Sign up"} />
                    <Subheading label={"Enter your information to create an account"}/>
                    <InputBox onChange={e=>{
                        setFirstName(e.target.value);
                    }} placeholder="First Name" label={"First Name"}/>
                    <InputBox onChange={e=>{
                        setLastName(e.target.value);
                    }} placeholder="Last Name" label={"Last Name"}/>
                    <InputBox onChange={e=>{
                        setUsername(e.target.value);
                    }} placeholder="Email" label={"Username"}/>
                    <InputBox onChange={e=>{
                        setPassword(e.target.value);
                    }} placeholder="Password" label={"Password"}/>
                    <div className="pt-4">
                        <Button onclick={async()=>{
                            const response = await axios.post('http://localhost:3000/api/v1/user/signup',{
                                username,
                                password,
                                firstName,
                                lastName
                            });
                            localStorage.setItem("token",response.data.token);
                            navigate('/');
                        }} label={"Sign up"}/>
                    </div>
                    <BottomWarning label={"Already have an account?"} to={"/signin"} buttontext={"Signin"}/>
                    </div>
                </div>
            </div>
        </>
    )
}