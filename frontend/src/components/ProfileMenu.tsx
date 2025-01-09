import { useNavigate } from "react-router-dom";

function ProfileMenu(){
    const navigation = useNavigate();

    return (
        <div 
            className="flex flex-col fixed right-3 top-16 h-64 w-1/2 md:w-1/5 z-10 
            bg-white border-2 rounded-xl border-black-100"
        >
            <div className="basis-1/4 bg-gray-100">
            <img
                  className="cursor-pointer absolute top-[11%] md:top-[6%] ml-5 w-10 md:w-16 h-10 md:h-16 bg-white rounded-full"
                  onClick={() => navigation("/profile") }
                  src="https://img.icons8.com/ios/50/user-male-circle--v1.png"
                  alt="user-male-circle--v1"
                />
            </div>
            <ul className="basis-3/4 flex flex-col mt-9 mb-5 ml-5 mr-5 justify-between">
                    <li className="font-extrabold text-lg pl-1">
                        Juan
                    </li>
                    <li className="font-bold text-xs text-gray-500 pl-1">
                        User Id: 1
                    </li>
                    <li className="font-normal text-xs text-black pl-1">
                        Age: 20
                    </li>
                    <li className="font-normal text-xs text-black pl-1">
                        Balance: $20
                    </li>
                    <li className="flex p-0.5 rounded items-center hover:bg-gray-100 cursor-pointer">
                        <img className="w-5 h-5" 
                            src="https://img.icons8.com/windows/32/exit.png" alt="exit"
                        />
                        
                        <span className="text-xs font-semibold">
                                Log Out
                        </span>
                    </li>
            </ul>
        </div>
    )
}

export default ProfileMenu