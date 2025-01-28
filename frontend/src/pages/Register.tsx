import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [role,setRole] = useState("buyer");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [errorMessage,setErrorMessage] = useState<string|null>(null);
    const navigate = useNavigate();
    useEffect(() => {
        document.title = "Register";
    }, []);
    
    const nameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setName(event.target.value)
    }

    const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setEmail(event.target.value)
    }

    const roleChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setRole(event.target.value);
    };

    const passwordChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setPassword(event.target.value)
    }

    const confirmPasswordChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setConfirmPassword(event.target.value)
    }

    const proceedRegister = async () =>{
        if(name === "" || email === "" || password === "" || confirmPassword === ""){
            setErrorMessage("Input can't empty");
            return;
        }

        if( password !== confirmPassword){
            setErrorMessage("Password and Confirm Password not match");
            return;
        }

        try{
            const payload = {
                name,
                email,
                password,
                role
            }
            const data = {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(payload)
            }
            const respond = await fetch(`${import.meta.env.VITE_API}/api/auth/register`,data);
            const result = await respond.json();
            if(!respond.ok){
                setErrorMessage(result.error);
                return;
            }
            navigate("/login");
        } catch (err: any){
            setErrorMessage(err);
            
            return;
        }

        setErrorMessage(null);
    }

    return (
        <>
            <div className="fixed left-0 right-0 top-0 bottom-0 flex justify-center items-center bg-gray-100">
                <div className="flex flex-col justify-center bg-white rounded-lg p-5 w-full h-[70%] md:w-2/5 md:h-[90%]">
                    <div className="flex flex-col justify-center items-center">
                        <img
                            src="https://img.icons8.com/ios-filled/50/228BE6/shop-local.png"
                            alt=""
                            className=""
                        />
                        <h4 className="text-blue-500 font-bold">DummyShop</h4>
                    </div>
                    <div className="flex justify-center">
                        <div className="flex flex-col my-5 w-full md:w-[30rem] gap-3">
                            <input
                                type="text"
                                placeholder="Name"
                                className="bg-gray-50 px-5 py-2 mx-5 border-2 border-white focus:border-blue-500 outline-none rounded-lg font-semibold"
                                onChange={nameChangeHandler}
                            />
                            <input
                                type="text"
                                placeholder="E-mail address"
                                className="bg-gray-50 px-5 py-2 mx-5 border-2 border-white focus:border-blue-500 outline-none rounded-lg font-semibold"
                                onChange={emailChangeHandler}
                            />
                            <select name="" id=""
                                className="bg-gray-50 px-5 py-2 mx-5 border-2 border-white focus:border-blue-500 outline-none rounded-lg font-semibold text-gray-400"                                
                                value={role}
                                onChange={roleChangeHandler}
                                
                            >                               
                                 
                                <option value="buyer">Buyer</option>
                                <option value="seller">Seller</option>
                            </select>
                            <input
                                type="password"
                                placeholder="Password"
                                className="bg-gray-50 px-5 py-2 mx-5 border-2 border-white focus:border-blue-500 outline-none rounded-lg font-semibold"
                                onChange={passwordChangeHandler}
                            />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                className="bg-gray-50 px-5 py-2 mx-5 border-2 border-white focus:border-blue-500 outline-none rounded-lg font-semibold"
                                onChange={confirmPasswordChangeHandler}
                            />
                            {errorMessage && (
                                <p className="text-red-500 flex justify-center">
                                    {errorMessage}
                                </p>
                            )}
                            <div className="flex justify-center items-center mt-3">
                                <button 
                                    className="bg-blue-500 py-2 w-[10rem] text-white font-bold hover:bg-blue-400 rounded-lg"
                                    onClick={proceedRegister}
                                >
                                    Register
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <a href="/login">
                            <span className="font-semibold text-gray-400 hover:text-blue-400 text-sm">
                                Already a member?
                                <span className="ml-1 underline">Login now</span>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;
