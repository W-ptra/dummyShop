import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useEffect, useState } from "react"

function CreateUpdateProduct() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState("");
    const [price, setPrice] = useState(0);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState("");

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            setSelectedFile(file);
            setImagePreview(URL.createObjectURL(file));
            return;
        }

        setSelectedFile(null);
        setImagePreview("");
    }

    useEffect(() => {
        document.title = "Create Product";
    }, []);

    useEffect(() => {
        const imageUpload = document.getElementById("imageUpload");
        if (imageUpload) {
            if (selectedFile) {
                imageUpload.classList.remove("h-[60vh]");
                imageUpload.classList.add("h-[90vh]");
            } else {
                imageUpload.classList.remove("h-[90vh]");
                imageUpload.classList.add("h-[60vh]");
            }
        }
    }, [selectedFile]);

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    }

    const handleTagsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTags(event.target.value);
    }

    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(Number(event.target.value));
    }

    const removeImagePreview = () => {
        setSelectedFile(null);
        setImagePreview("");
    }

    const post = () => {
        console.log(title);
        console.log(description);
        console.log(tags);
        console.log(price);
        console.log(imagePreview);
    }

    return (
        <>
            <Navbar />
            <div className="bg-gray-200 pb-10 mt-16">

                <div
                    className="flex justify-center items-center h-[60vh] bg-slate-700 mb-10"
                    id="imageUpload"
                >
                    {selectedFile ? (
                        <div className="relative w-96 h-full bg-gray-400 flex justify-center items-center ">
                            <img
                                src={imagePreview} alt={imagePreview}
                                className="max-h-full max-w-full"
                            />
                            <img className="w-12 h-12 absolute top-5 right-5 bg-gray-800 p-1 rounded-full cursor-pointer"
                                src="https://img.icons8.com/sf-black-filled/64/FFFFFF/multiply.png"
                                alt="external-cross-essentials-tanah-basah-glyph-tanah-basah"
                                onClick={removeImagePreview}
                            />
                        </div>
                    ) : (
                        <div className="flex flex-col justify-center items-center">
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
                        </div>
                    )}
                </div>

                <div className="flex flex-col bg-white ml-[2rem] mr-[2rem] md:ml-[10rem] md:mr-[10rem] rounded-xl">
                    <div className="flex border border-gray-200 border-b-gray-300">
                        <input
                            type="text"
                            placeholder="Title"
                            className=" w-full p-3 ml-4 outline-none rounded-lg"
                            onChange={handleTitleChange}
                        />
                    </div>
                    <div className="flex">
                        <textarea
                            className="ml-4 w-full h-16 outline-none p-3 rounded-lg"
                            name="" id=""
                            placeholder="description"
                            onChange={handleDescriptionChange}
                        />
                    </div>
                </div>

                <div className="flex flex-col bg-white ml-[2rem] mr-[2rem] md:ml-[10rem] md:mr-[10rem] rounded-xl mt-5">
                    <div className="flex border border-gray-200 border-b-gray-300">
                        <input
                            type="text"
                            placeholder="Tags"
                            className=" w-full p-3 ml-4 outline-none rounded-lg"
                            onChange={handleTagsChange}
                        />
                    </div>
                    <div className="flex border border-gray-200 border-b-gray-300">
                        <input
                            type="number"
                            placeholder="Price"
                            className=" w-full p-3 ml-4 outline-none rounded-lg"
                            min={0}
                            max={9999999999}
                            onChange={handlePriceChange}
                        />
                    </div>

                </div>
                <div className="flex justify-center items-center mt-5">
                    <button
                        className="p-2 px-10 hover:bg-blue-400 bg-blue-500 text-white font-extrabold rounded-lg"
                        onClick={post}
                    >
                        Upload
                    </button>
                </div>

            </div>
            <Footer />
        </>
    )
}

export default CreateUpdateProduct