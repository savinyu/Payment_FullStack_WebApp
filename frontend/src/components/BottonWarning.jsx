import {Link} from 'react-router-dom'
export default function BottomWarning({label,buttontext,to}){
    return(
        <>
            <div className="py-2 text-sm flex justify-around ">
                <div>
                {label}
                </div>
                <Link className='pointer underline pl-1 cursor-pointer' to={to}>{buttontext}</Link>
            </div>
        </>
    )
}