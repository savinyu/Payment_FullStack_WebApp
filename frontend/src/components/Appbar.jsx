export default function Appbar({label}){
    return(
        <>
            <div className="shadow h-14 flex justify-between">
                <div className="flex flex-col justify-center h-full ml-4 font-semibold">
                    PayTM App
                </div>
                <div className="flex">
                    <div className="flex flex-col justify-center h-full mr-4 font-semibold">
                        Hello
                    </div>
                    <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                        <div className="flex flex-col justify-centre h-full text-xl pt-2 font-semibold">
                            U
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}