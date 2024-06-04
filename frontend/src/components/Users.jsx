import { useEffect, useState } from "react";
import Button from './Button'
import {useNavigate} from 'react-router-dom'
import axios from "axios";

export default function Users(){
    const [filter,setFilter] = useState(""); 
    const [users,setUsers] = useState([]);
    useEffect(()=>{
        axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`)
            .then(response=>{
                setUsers(response.data.user);
            });
    },[filter]);
    return(
        <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input type="text" placeholder="Search users" onChange={e=>{
                setFilter(e.target.value);
            }} className="w-full px-2 py-1 border rounded border-slate-200 "/>
        </div>
        <div>
            {users.map((user,ind)=> <User key={ind} user={user} />)}
        </div>                
        </>
    )
}

function User({user}){
    const navigate = useNavigate();
    return (
        <>
        <div className="flex justify-between m-2">
            <div className="flex">
                <div className=" rounded-full h-12 w-12 bg-slate-200 flex justify-centre mt-1 mr-2 ">
                    <div className="flex flex-col justify-center h-full text-xl pl-4 ">
                        {user.firstName[0].toUpperCase()}
                    </div>
                </div>
                <div className="flex flex-col justify-center h-full">
                    <div>
                        {user.firstName} {user.lastName}
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center h-full">
                <Button onclick={()=>{
                    navigate(`/send?id=${user._id}&name=${user.firstName}`);
                }} label={"Send Money"}/>
            </div>
        </div>
        </>
    )
}