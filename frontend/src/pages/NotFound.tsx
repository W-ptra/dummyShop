import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function NotFound(){
    useEffect(() => {
        document.title = "404 Not Found";
    },[]);
    return(
        <>
            <Navbar/>
            <div className="bg-gray-100 mt-18 pt-[40vh] pb-[40vh] flex flex-col justify-center items-center">
                <img className="w-20 h-20" src="https://img.icons8.com/dotty/80/6b7280/quest.png" alt="quest"/>
                <h1 className="text-lg font-extrabold text-gray-500">404 Not Found</h1>
                <a href="/">
                    <button className="bg-blue-500 hover:bg-blue-400 text-white font-extrabold text-sm px-8 py-2 mt-5 rounded-full">
                        Back to Home
                    </button>
                </a>
            </div>
            <Footer/>
        </>

    )
}

export default NotFound;