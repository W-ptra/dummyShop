import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { get, put } from "../utils/RequestAPI";

type UserProfile = {
    id: number,
    email:string,
    name:string,
    role:string,
    image:string,
    banner:string,
    about:string|null
  }

function Profile(){

    const [token] = useState(localStorage.getItem("token"));
    const [id,setId] = useState(0);
    const [email,setEmail] = useState("");
    const [name,setName] = useState("");
    const [role,setRole] = useState("");
    const [image,setImage] = useState("");
    const [banner,setBanner] = useState("");
    const [about,setAbout] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
            document.title = "Profile";
        },[]);

    useEffect(()=>{
        async function getProfile(){
            if(token === "" || token === null){
                navigate('/login');
                return;
            }

            const result = await get("/api/user/profile",token);
            if(result === undefined){
                localStorage.removeItem("role");
                localStorage.removeItem("token");
                navigate("/login");
                return;
            }
            setId(result.user.id);
            setEmail(result.user.email);
            setName(result.user.name);
            setRole(result.user.role);
            setImage(result.user.image);
            setBanner(result.user.banner);
            setAbout(result.user.about);
        }
        getProfile();
    },[]);
    
    const updateProfile = async() => {

        if(token === null || token === ""){
            navigate("/login");
            return;
        }

        const payload = {
            name,
            about
        }

        const result = await put("/api/user/profile",token,payload);

        if(result === undefined){
            console.log("error cant update profile")
            return;
        }
        window.location.reload();
    }

    const nameChangeHandler = (event:React.ChangeEvent<HTMLInputElement>)=>{
        setName(event.target.value);
    }

    const aboutChangeHandler = (event:React.ChangeEvent<HTMLTextAreaElement>)=>{
        setAbout(event.target.value);
    }

    return (
        <>
            <Navbar/>
            <div className="flex flex-col justify-between">

                <div 
                    className="flex h-[10rem] md:h-[20rem] bg-gray-100 mt-[4.8rem] relative">
                    <img  
                        className="h-full w-full"
                        src={banner} alt="" 
                    />
                    <div className="flex absolute right-[2.6rem] md:right-[4.9rem]  bottom-3 md:bottom-5 cursor-pointer gap-3">
                        <div className="bg-gray-500 hover:bg-gray-400 w-10 h-10 rounded-full flex items-center justify-center">
                            <img className="w-6 h-6 md:w-8 md:h-8" src="https://img.icons8.com/sf-black-filled/64/FFFFFF/edit.png" alt="edit"/>                
                        </div>
                        <div className="bg-gray-500 hover:bg-gray-400  w-10 h-10 flex items-center justify-center rounded-full">
                            <img className="w-8 h-8" src="https://img.icons8.com/sf-black-filled/64/FFFFFF/delete.png" alt="edit"/>                
                        </div>
                    </div>

                    <div className=" top-[7.5rem] md:top-[16rem]  left-[2rem] md:left-20 absolute bg-white rounded-full">

                        <img
                            className="w-20 h-20 md:w-32 md:h-32 rounded-full"
                            src={image}
                            alt="user-male-circle--v1"
                        />
                    
                    </div>

                </div>
                <div className="flex flex-col gap-3 m-10 mt-[4rem] md:mt-24 md:m-20 mb-10">
                    <h4 className="font-semibold">
                        My Profile
                    </h4>

                    <div className="flex flex-col">
                        <label 
                            htmlFor="id" 
                            className="mr-5 font-bold"
                        >
                            User Id
                        </label>
                        <input 
                            type="text"  
                            value={id}
                            className=" p-2 bg-gray-100 rounded-md pl-3"
                            disabled={true}
                        />
                    </div>
                    
                    <div className="flex flex-col">
                        <label 
                            htmlFor="id" 
                            className="mr-5 font-bold"
                        >
                            Name
                        </label>
                        <input 
                            type="text"  
                            value={name}
                            className=" p-2 bg-gray-100 rounded-md focus:border-2 pl-3 focus:outline-none focus:border-blue-500 transition duration-200 ease-in-out"
                            onChange={nameChangeHandler}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label 
                            htmlFor="id" 
                            className="mr-5 font-bold"
                        >
                            Email 
                        </label>
                        <input 
                            type="text"  
                            value={email}
                            className=" p-2 bg-gray-100 rounded-md focus:border-2 pl-3 focus:outline-none focus:border-blue-500 transition duration-200 ease-in-out"
                        />
                    </div>
    
                    <div className="flex flex-col">
                        <label 
                            htmlFor="id" 
                            className="mr-5 font-bold"
                        >
                            Role 
                        </label>
                        <input 
                            type="text"  
                            value={role}
                            className=" p-2 bg-gray-100 rounded-md pl-3"
                            disabled={true}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label 
                            htmlFor="id" 
                            className="mr-5 font-bold"
                        >
                            About me 
                        </label>
                        <textarea name="" id=""
                            className=" p-2 bg-gray-100 rounded-md focus:border-2 pl-3 focus:outline-none focus:border-blue-500 transition duration-200 ease-in-out"
                            onChange={aboutChangeHandler}
                            value={about}
                        >
                        </textarea>
                        
                    </div>
                    <div className="flex justify-center items-center mt-5">
                        <button 
                            className="bg-blue-500 hover:bg-blue-400 p-2 text-white font-bold w-[20rem] rounded-xl"
                            onClick={updateProfile}
                        >
                            Save
                        </button>
                    </div>
                </div>

                
            </div>
            <Footer/>
        </>
    )
}

export default Profile;