import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Profile(){

    const user = {
        id: 1,
        name: "ahmad",
        email: "sebastian@yahoo.com",
        role: "buyer",
        banner: "https://img.freepik.com/free-vector/winter-countryside-landscape-with-snow-fields_107791-12827.jpg",
        image: "https://img.icons8.com/ios/50/user-male-circle--v1.png"
    }

    return (
        <>
            <Navbar/>
            <div className="flex flex-col justify-between">

                <div 
                    className="flex h-[10rem] md:h-[20rem] bg-gray-100 mt-[4.8rem] relative">
                    <img  
                        className="h-full w-full"
                        src={user.banner} alt="" 
                    />
                    <div className="flex absolute right-[2.6rem] md:right-[4.9rem]  bottom-3 md:bottom-5 cursor-pointer gap-3">
                        <div className="bg-gray-500 hover:bg-gray-400 p-1 rounded-full">
                            <img className="w-6 h-6 md:w-8 md:h-8" src="https://img.icons8.com/sf-black-filled/64/FFFFFF/edit.png" alt="edit"/>                
                        </div>
                        <div className="bg-gray-500 hover:bg-gray-400 p-1 rounded-full">
                            <img className="w-8 h-8" src="https://img.icons8.com/sf-black-filled/64/FFFFFF/delete.png" alt="edit"/>                
                        </div>
                    </div>

                    <div className=" top-[7.5rem] md:top-[16rem]  left-[2rem] md:left-20 absolute bg-white rounded-full">

                        <img
                            className="w-20 h-20 md:w-32 md:h-32"
                            src={user.image}
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
                            value={user.id}
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
                            value={user.name}
                            className=" p-2 bg-gray-100 rounded-md focus:border-2 pl-3 focus:outline-none focus:border-blue-500 transition duration-200 ease-in-out"
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
                            value={user.email}
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
                            value={user.role}
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
                        >
                        </textarea>
                        
                    </div>
                    <div className="flex justify-center items-center mt-5">
                        <button className="bg-blue-500 hover:bg-blue-400 p-2 text-white font-bold w-[20rem] rounded-xl">
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