import { useEffect, useState } from "react";

function Login() {
    const API = import.meta.env.VITE_API;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("$");
    const [isInputEmpty,setIsInputEmpty] = useState(false);
    const [errorMessage,setErrorMessage] = useState("");

    useEffect(() => {
        document.title = "Login";
    }, []);

    const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const passwordChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const proceedLogin = async () =>{
        if(email === "" || password === ""){
            setErrorMessage("Input can't empty");
            setIsInputEmpty(true);
            return;
        }

        // api call

        setIsInputEmpty(false);
    }

    return (
        <>
            <div className="fixed left-0 right-0 top-0 bottom-0 flex justify-center items-center bg-gray-100">
                <div className="flex bg-white justify-center rounded-lg flex-col p-5 w-full h-[60%] md:w-2/5 md:h-4/5">
                    <div className="flex flex-col justify-center items-center">
                        <img
                            src="https://img.icons8.com/ios-filled/50/228BE6/shop-local.png"
                            alt=""
                            className=""
                        />
                        <h4 className="text-blue-500 font-bold">
                            DummyShop
                        </h4>
                    </div>
                    <div className="flex justify-center">
                        <div className="flex flex-col my-5 w-full md:w-[30rem] gap-3">
                            <input
                                type="text"
                                placeholder="E-mail address"
                                className="bg-gray-50 px-5 py-2 mx-5 border-2 border-white focus:border-blue-500 outline-none rounded-lg font-semibold"
                                onChange={emailChangeHandler}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="bg-gray-50 px-5 py-2 mx-5 border-2 border-white focus:border-blue-500 outline-none rounded-lg font-semibold"
                                onChange={passwordChangeHandler}
                            />
                            <div className="mx-6">
                                <a href="">
                                    <p className="text-blue-400">
                                        Forgot password?
                                    </p>
                                </a>
                            </div>
                            {isInputEmpty && (
                                <p className="text-red-500 flex justify-center">
                                    {errorMessage}
                                </p>
                            )}
                            <div className="flex justify-center items-center mt-3">
                                <button
                                    className="bg-blue-500 py-2 w-[10rem] text-white font-bold hover:bg-blue-400 rounded-lg"
                                    onClick={proceedLogin}
                                >
                                    Login
                                </button>
                            </div>

                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <a href="/register">
                            <span className="font-semibold text-gray-400 hover:text-blue-400 text-sm">
                                Not a member?
                                <span className="ml-1 underline">
                                    Register now
                                </span>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login