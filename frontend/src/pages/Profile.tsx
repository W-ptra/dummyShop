import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deletes, get, put } from "../utils/RequestAPI";

type UserProfile = {
    id: number,
    email: string,
    name: string,
    role: string,
    image: string,
    banner: string,
    about: string | null
}

function Profile() {
    const [token] = useState(localStorage.getItem("token"));
    const [imageUpdateType, setImageUpdateType] = useState("");
    const [updateImageToggle, setUpdateImageToggle] = useState(false);
    const [confirmToggle,setConfirmToggle] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [id, setId] = useState(0);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [image, setImage] = useState("");
    const [banner, setBanner] = useState("");
    const [about, setAbout] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        document.title = "Profile";
    }, []);

    useEffect(() => {
        async function getProfile() {
            if (token === "" || token === null) {
                navigate('/login');
                return;
            }

            const result = await get("/api/user/profile", token);
            if (result === undefined) {
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
    }, []);

    useEffect(() => {
        if (updateImageToggle || confirmToggle) {
            document.body.style.overflow = "hidden";
            return;
        }

        document.body.style.overflow = "auto";
    }, [updateImageToggle,confirmToggle])

    const updateProfile = async () => {

        if (token === null || token === "") {
            navigate("/login");
            return;
        }

        const payload = {
            name,
            about
        }

        const result = await put("/api/user/profile", token, payload);

        if (result === undefined) {
            console.log("error cant update profile")
            return;
        }
        window.location.reload();
    }

    const nameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    const aboutChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setAbout(event.target.value);
    }

    const updateImageToggleHandler = (type: string) => {
        setImageUpdateType(type);
        setFile(null);
        setUpdateImageToggle((prev) => !prev);
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            setFile(file);

            return;
        }
    }

    const confirmToggleHandler = () => {
        setConfirmToggle((prev)=>!prev);
    }

    const updateImage = async () => {
        if (token === null || token === "" || file === null) return;

        const formData = new FormData();
        formData.append("file", file);
        let link: string;
        try {
            const data = {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            }
            const request = await fetch("/api/files", data);
            const result = await request.json();
            link = result.link;
            console.log("new image link: ", result.link);

        } catch (err: any) {
            console.log(err);
            return;
        }

        if (imageUpdateType === "Banner") {
            const payload = {
                image: link
            }
            const result = await put("/api/user/banner", token, payload);
            console.log(result);
            if (result === undefined) {
                console.log("cant update banner");
            }
            window.location.reload();
            return;
        }
        const payload = {
            image: link
        }
        const result = await put("/api/user/image", token, payload);
        if (result === undefined) {
            console.log("cant update image");
        }
        window.location.reload();
        return;
    }

    const deleteBanner = async () => {
        if(token === "" || token === null)return;

        const result = await deletes("/api/user/banner",token);
        if(result === undefined)return;
        window.location.reload();
    }

    return (
        <>
            <Navbar />
            <div className="flex flex-col justify-between">

                <div
                    className="flex h-[10rem] md:h-[20rem] bg-gray-100 mt-[4.8rem] relative">
                    {banner && (
                        <img
                            className="h-full w-full"
                            src={banner} alt=""
                        />
                    )}
                    <div className="flex absolute right-[2.6rem] md:right-[4.9rem]  bottom-3 md:bottom-5 cursor-pointer gap-3">
                        <div
                            className="bg-gray-500 hover:bg-gray-400 w-10 h-10 rounded-full flex items-center justify-center"
                            onClick={() => updateImageToggleHandler("Banner")}
                        >
                            <img 
                                className="w-6 h-6 md:w-8 md:h-8" 
                                src="https://img.icons8.com/sf-black-filled/64/FFFFFF/edit.png" alt="edit"  
                            />

                        </div>
                        <div 
                            className="bg-gray-500 hover:bg-gray-400  w-10 h-10 flex items-center justify-center rounded-full"
                            onClick={confirmToggleHandler}    
                        >
                            <img className="w-8 h-8" src="https://img.icons8.com/sf-black-filled/64/FFFFFF/delete.png" alt="edit" />
                        </div>
                    </div>

                    <div className="top-[7.5rem] md:top-[16rem]  left-[2rem] md:left-20 absolute bg-white rounded-full">
                        <div className="relative">

                            <div className="bg-gray-500 absolute bottom-0 right-0 hover:bg-gray-400 w-10 h-10 rounded-full flex items-center justify-center">
                                <img
                                    className="w-6 h-6 md:w-8 md:h-8 cursor-pointer"
                                    src="https://img.icons8.com/sf-black-filled/64/FFFFFF/edit.png" alt="edit"
                                    onClick={() => updateImageToggleHandler("Image Profile")}
                                />
                            </div>
                            <img
                                className="w-20 h-20 md:w-32 md:h-32 rounded-full"
                                src={image ? image : "https://img.icons8.com/ios/50/user-male-circle--v1.png"}
                                alt="user-male-circle--v1"

                            />
                        </div>

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

                {updateImageToggle && (
                    <div
                        className="fixed z-40 top-0 bottom-0 left-0 right-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
                    >
                        <div className="flex flex-col w-[95vw] md:w-[40vw] h-[80vh] md:h-[70vh] bg-white rounded-lg gap-y-5">

                            <div
                                className="flex flex-col justify-center rounded-none rounded-t-lg 
                                                items-center bg-slate-700 py-5 basis-4/5 relative"

                            >
                                <img src="https://img.icons8.com/?size=100&id=VaHFapP3XCAj&format=png&color=FFFFFF" alt=""
                                    className="absolute w-10 h-10 top-5 right-5 bg-black rounded-full bg-opacity-40 cursor-pointer"
                                    onClick={() => updateImageToggleHandler("")}
                                />

                                {file ? (
                                    <img
                                        src={URL.createObjectURL(file)} alt=""
                                        className="max-w-[10rem] max-h-[12rem]"

                                    />
                                ) : (
                                    <>
                                        <label
                                            htmlFor="image"
                                            className="bg-blue-500 hover:bg-blue-400 cursor-pointer w-44 h-14 flex justify-center items-center rounded-full"
                                        >
                                            <img
                                                className="w-10 h-10"
                                                src="https://img.icons8.com/sf-black-filled/64/FFFFFF/add-image.png"
                                                alt="add-image"
                                            />
                                            <span className="text-base font-extrabold text-white ml-2">Add Image</span>

                                        </label>
                                        <input
                                            type="file"
                                            id="image"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleFileChange}
                                        />
                                        <p className="text-gray-200 mt-3">
                                            PNG / JPEG / JPG
                                        </p>
                                        <p className="text-gray-200">
                                            Max size 30MB
                                        </p>
                                    </>
                                )}

                            </div>
                            <div className="flex flex-col gap-y-2 px-10 basis-1/5">
                                <button
                                    className="p-2 px-5 mt-2 hover:bg-blue-400 bg-blue-500 text-white font-extrabold rounded-lg"
                                    onClick={updateImage}
                                >
                                    Update {imageUpdateType}
                                </button>

                            </div>
                        </div>
                    </div>
                )}

                { confirmToggle && (
                    <div
                        className="fixed z-40 top-0 bottom-0 left-0 right-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
                    >
                        <div className="flex flex-col justify-evenly w-[80vw] md:w-[30vw] h-[25vh] md:h-[30vh] bg-white rounded-lg">

                            <div className="flex flex-col justify-center items-center">
                                <h4 className="font-extrabold mb-3 text-lg">
                                    Confirm to Delete?
                                </h4>
                                <div className="flex gap-x-2">
                                    <button
                                        className="p-2 px-5 mt-2 hover:bg-red-400 bg-red-500 text-white font-extrabold rounded-lg"
                                        onClick={confirmToggleHandler}
                                    >
                                        Cancel {imageUpdateType}
                                    </button>
                                    <button
                                        className="p-2 px-5 mt-2 hover:bg-blue-400 bg-blue-500 text-white font-extrabold rounded-lg"
                                        onClick={deleteBanner}
                                    >
                                        Delete {imageUpdateType}
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                )}


            </div>
            <Footer />
        </>
    )
}

export default Profile;