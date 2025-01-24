import { useNavigate } from "react-router-dom";
import { Truncet } from "../utils/Truncet";

type profile = {
    id: number,
    email:string,
    name:string,
    role:string,
    image:string,
    banner:string
  }

interface userProfile{
    UserProfile:profile|null;
}

function ProfileMenu({UserProfile}:userProfile){
    const navigation = useNavigate();
    const logOut = () =>{
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        window.location.reload();
      }
    return (
        <div 
            className="flex flex-col fixed right-3 top-16 h-64 w-1/2 md:w-1/5 z-50 
            bg-white border-2 rounded-xl border-black-100"
        >
            <div className="basis-1/4 bg-gray-100">
            
            {UserProfile?.banner && (
                <img 
                    src={UserProfile.banner} alt="" 
                    className="w-[30rem] h-[4rem] rounded-none rounded-t-xl"
                />
            )}

            <img
                  className="cursor-pointer absolute top-[14%] md:top-[11%] ml-5 w-14 md:w-16 h-14 md:h-16 bg-white rounded-full"
                  onClick={() => navigation("/profile") }
                  src={UserProfile?.image ? UserProfile.image : "https://img.icons8.com/ios/50/user-male-circle--v1.png"}
                  
                  alt="user-male-circle--v1"
                />
            </div>
            <ul className="basis-3/4 flex flex-col mt-9 mb-5 ml-5 mr-5 justify-between">
                    <li className="font-extrabold text-lg pl-1">
                        { UserProfile && Truncet(UserProfile.name,20)}
                    </li>
                    <li className="font-bold text-xs text-gray-500 pl-1">
                        User Id: {UserProfile?.id}
                    </li>
                    <li className="font-normal text-xs text-black pl-1">
                        Role: {UserProfile?.role}
                    </li>
                    <li className="flex p-0.5 rounded items-center hover:bg-gray-100 cursor-pointer"
                        onClick={logOut}
                    >
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