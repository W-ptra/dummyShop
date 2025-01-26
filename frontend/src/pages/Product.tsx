import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import NotFound from "./NotFound";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { get, post, put } from "../utils/RequestAPI";
import { Truncet } from "../utils/Truncet";

function Product() {
    const { id } = useParams<{ id?: string }>();
    const [token] = useState(localStorage.getItem("token"));
    const [role] = useState(localStorage.getItem("role"));
    const [quantity, setQuantity] = useState(1);
    const [data, setData] = useState<any>(null);
    const [nameUpdate,setNameUpdate] = useState("");
    const [descriptionUpdate,setDescriptionUpdate] = useState("");
    const [tagsUpdate,setTagsUpdate] = useState("");
    const [priceUpdate,setPriceUpdate] = useState(0);
    const [updateToggle,setUpdateToggle] = useState(false);
    const [file,setFile] = useState<File|null>(null);

    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            const result = await get(`${import.meta.env.VITE_API}/api/product/${id}`);

            if (result === undefined) {
                setError("failed to retrive product")
                return;
            }
            setData(result);
            setNameUpdate(result.product.name);
            setDescriptionUpdate(result.product.description);
            setPriceUpdate(result.product.price);
            let tags = "";
            result.product.tags.map((tag:string)=>tags= tags + " " +tag)
            setTagsUpdate(tags);
        };

        fetchData();
    }, []);

    useEffect(() => {
        document.title = `Product ${id}`;
    }, []);

    useEffect(() => {
        if (updateToggle) {
            document.body.style.overflow = "hidden";
            return;
        }

        document.body.style.overflow = "auto";
    }, [updateToggle])

    const handleToggleUpdate = () => {
        setUpdateToggle((prev)=>!prev)
    }

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(Number(event.target.value));
    }

    const quantityIncrement = () => {
        setQuantity(quantity + 1)
    }

    const quantityDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    const addToCart = async () => {

        if (token === null || token === "") {
            navigate("/login");
            return;
        }

        const payload = {
            productId: id,
            quantity
        }
        const result = await post(`${import.meta.env.VITE_API}/api/cart`, token, payload);
        if (result === undefined) {
            console.log("failed to add to cart");
            return;
        }
        window.location.reload();
    }

    const buyProduct = async () => {
        if (token === null || token === "") {
            navigate("/login");
            return;
        }

        const payload = {
            productId: id,
            quantity
        }
        const result = await post(`${import.meta.env.VITE_API}/api/cart`, token, payload);
        if (result === undefined) {
            console.log("failed to add to cart");
            return;
        }
        navigate("/cart");
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            setFile(file);
            
            return;
        }
    }

    const handleNameUpdateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNameUpdate(event.target.value);
    }
    const handleDescriptionUpdateChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescriptionUpdate(event.target.value);
    }
    const handleTagsUpdateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTagsUpdate(event.target.value);
    }
    const handlePriceUpdateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPriceUpdate(Number(event.target.value));
    }

    const updateProduct = async () => {
        if(token === null || token === "" || role !== "seller")return;

        let image = data.product.image;

        if(file){
            const formData = new FormData();
            formData.append("file",file);
            try{
                const data = {
                    method:"POST",
                    headers:{
                        "Authorization":`Bearer ${token}`
                    },
                    body:formData
                }
                const request = await fetch(`${import.meta.env.VITE_API}/api/files`,data);
                const result = await request.json();
                console.log("new image link: ",result.link);
                image = result.link;               
            } catch(err:any){
                console.log(err);
            }
        }
        const tags = tagsUpdate.split(" ");
        const payload = {
            name: nameUpdate,
            price: priceUpdate,
            description:descriptionUpdate,
            image,
            tags
        }
        const result = await put(`${import.meta.env.VITE_API}/api/product/${id}`,token,payload);
        console.log(result);

        if(result === undefined){
            console.log("error failed to update product");
            return;
        }
        window.location.reload();
    }

    return (
        <>
            {id ? (
                <>
                    <Navbar />
                    {data && (
                        <>
                            <div className=" pt-[5.1rem] md:pt-20 flex flex-col items-center bg-gray-100">
                                <div className="bg-white rounded-xl w-[100vw]] md:w-[60vw] flex flex-col mb-10">
                                    <div
                                        className="w-full h-[20rem] bg-gray-400 
                                        items-center flex justify-center 
                                        rounded-none rounded-t-lg 
                                        relative
                                        "

                                    >   
                                        {role==="seller" && (
                                            <img
                                                src="https://img.icons8.com/sf-black-filled/64/FFFFFF/edit.png"
                                                alt=""
                                                className="w-14 h-14 z-10 absolute top-2 right-2 bg-gray-500 rounded-full p-1 cursor-pointer"
                                                onClick={handleToggleUpdate}
                                            />
                                        )}
                                        <img
                                            className="max-w-full max-h-full absolute z-0"
                                            src={data.product.image}
                                            alt=""
                                        />
                                    </div>
                                    <div className="mb-5">
                                        <div className="mx-5">

                                            <h4 className="font-extrabold text-lg mt-4">
                                                {data.product.name}
                                            </h4>
                                            <p className="text-gray-500 font-semibold mt-1">
                                                {data.product.description}
                                            </p>
                                            <div className="flex gap-x-3 gap-y-1 mt-3 flex-wrap">
                                                {data.product.tags.map((tag: string) => (
                                                    <a href={`/search?query=@${tag}`}>
                                                        <span className="text-blue-600 font-bold">
                                                            {"#" + tag + " "}
                                                        </span>
                                                    </a>
                                                ))}
                                            </div>

                                            <div className="flex justify-between my-2">
                                                <span className="font-bold">
                                                    {"$ " + data.product.price}
                                                </span>
                                                <span className="flex items-center">
                                                    <img className="w-5 h-5"
                                                        src="https://img.icons8.com/color/48/filled-star--v1.png"
                                                        alt="filled-star--v1"
                                                    />
                                                    <span className="mt-[0.05rem] ml-1">
                                                        {data.product.star}

                                                    </span>
                                                </span>
                                                <span className="">
                                                    {data.product.sold + " Sold"}
                                                </span>
                                            </div>
                                        </div>
                                        {role!=="seller" && (
                                            <>
                                                <div className="mx-5 flex mt-10 items-center">
                                                    <p className="text-md font-semibold text-gray-600">
                                                        Quantity
                                                    </p>
                                                    <div className="bg-blue-500 ml-3">

                                                        <button
                                                            className="text-[1.05rem] bg-blue-500 w-10 text-white font-bold"
                                                            onClick={quantityDecrement}
                                                        >
                                                            -
                                                        </button>
                                                        <input
                                                            className="border-blue-500 outline-none border pl-[0.4rem] w-[2.5rem]"
                                                            type="number"
                                                            name=""
                                                            id=""
                                                            min={1}
                                                            value={quantity}
                                                            onChange={handleQuantityChange}
                                                        />
                                                        <button
                                                            className="text-[1.05rem] bg-blue-500 w-10 text-white font-bold"
                                                            onClick={quantityIncrement}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="flex justify-evenly mt-2">
                                                    <button
                                                        className="bg-blue-500 rounded flex w-[10rem] h-10 hover:bg-blue-400 justify-center items-center ml-5 mr-2.5 basis-1/2"
                                                        onClick={addToCart}
                                                    >
                                                        <img className="w-5 h-5"
                                                            src="https://img.icons8.com/sf-regular-filled/48/FFFFFF/add-shopping-cart.png"
                                                            alt="add-shopping-cart"
                                                        />
                                                        <span className="text-white font-extrabold">
                                                            Add to Cart
                                                        </span>
                                                    </button>
                                                    <button
                                                        className="bg-blue-500 rounded flex px-6 py-2 w-[10rem] h-10 hover:bg-blue-400 justify-center items-center ml-2.5 mr-5 basis-1/2"
                                                        onClick={buyProduct}
                                                    >
                                                        <span className="text-white font-extrabold">
                                                            Buy
                                                        </span>
                                                    </button>

                                                </div>   
                                                <div className="my-2 px-5 flex pb-2" key={data.product.seller.id}>
                                                    <img
                                                        src={data.product.seller.image? data.product.seller.image : "https://img.icons8.com/ios/50/user-male-circle--v1.png"} alt=""
                                                        className="w-16 h-16 rounded-full bg-gray-100"
                                                    />
                                                    <div className="flex flex-col justify-center items-center">
                                                        <h4 className="font-bold ml-5">
                                                            {Truncet(data.product.seller.name,80)}
                                                        </h4>
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        { data.product.reviews.length !== 0 && (
                                            <div className="px-5 pt-4 mt-2 mb-5 border border-white border-t-gray-400">
                                                <h2 className="font-bold">
                                                    Comment
                                                </h2>
                                                <div className="flex flex-col">
                                                    {data.product.reviews.map((review: any) => (
                                                        <div className="flex gap-1 my-3" key={review.user.id}>
                                                            <div className="basis-2/12 flex justify-center">
                                                                <img
                                                                    className="w-10 h-10 rounded-full"
                                                                    src={review.user.image} alt=""
                                                                />
                                                            </div>
                                                            <div className="flex flex-col flex-wrap basis-10/12">
                                                                <h4 className="font-bold">
                                                                    {review.user.name}
                                                                </h4>
                                                                <p className="text-gray-600">
                                                                    {review.content}
                                                                </p>
                                                            </div>
                                                            <div className="flex flex-col justify-center items-center">
                                                                <span className="flex items-center">
                                                                    <img className="w-5 h-5"
                                                                        src="https://img.icons8.com/color/48/filled-star--v1.png"
                                                                        alt="filled-star--v1"
                                                                    />
                                                                    <span className="mt-[0.05rem] ml-1">
                                                                        {review.star}

                                                                    </span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                            </div>
                                        )}

                                    </div>
                                </div>
                            </div>
                            { updateToggle && (
                                <div
                                    className="fixed z-40 top-0 bottom-0 left-0 right-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
                                >
                                    <div className="flex flex-col w-[95vw] md:w-[40vw] h-[80vh] md:h-[95vh] bg-white rounded-lg gap-y-5">

                                        <div 
                                            className="flex flex-col justify-center rounded-none rounded-t-lg 
                                            items-center bg-slate-700 py-5 basis-1/6 relative"
                                            
                                        >
                                            <img src="https://img.icons8.com/?size=100&id=VaHFapP3XCAj&format=png&color=FFFFFF" alt="" 
                                                className="absolute w-10 h-10 top-5 right-5 bg-black rounded-full bg-opacity-40 cursor-pointer"
                                                onClick={handleToggleUpdate}
                                            />

                                            {file? (
                                                <img 
                                                    src={URL.createObjectURL(file)} alt="" 
                                                    className="max-w-[10rem] max-h-[12rem]"   
                                                     
                                                />
                                            ):(
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
                                        <div className="flex flex-col gap-y-2 px-10 basis-5/6">

                                            <div className="flex flex-col">
                                                <label htmlFor="name" className="font-bold">Name</label>
                                                <input 
                                                    type="text" className="w-full bg-gray-100 border-2 border-gray-100 focus:border-blue-500 focus:outline-none rounded  p-1 h-9 transition duration-200 ease-in-out" 
                                                    value={nameUpdate} 
                                                    onChange={handleNameUpdateChange}   
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="name" className="font-bold">Description</label>
                                                <textarea name="" id="" 
                                                    className="w-full bg-gray-100 border-2 border-gray-100 
                                                    focus:border-blue-500 focus:outline-none rounded  p-1 h-9 
                                                    transition duration-200 ease-in-out 
                                                    max-h-16"
                                                    value={descriptionUpdate} 
                                                    onChange={handleDescriptionUpdateChange}
                                                ></textarea>
                                            </div>
                                            <div>
                                                <label htmlFor="name" className="font-bold">Tag</label>
                                                <input 
                                                    type="text" 
                                                    className="w-full bg-gray-100 border-2 border-gray-100 focus:border-blue-500 focus:outline-none rounded  p-1 h-9 transition duration-200 ease-in-out" 
                                                    value={tagsUpdate}  
                                                    onChange={handleTagsUpdateChange}   
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="name" className="font-bold">Price</label>
                                                <input 
                                                    min={1}
                                                    type="number" 
                                                    className="w-full bg-gray-100 border-2 border-gray-100 focus:border-blue-500 focus:outline-none rounded  p-1 h-9 transition duration-200 ease-in-out" 
                                                    value={priceUpdate}   
                                                    onChange={handlePriceUpdateChange}  
                                                />
                                            </div>
                                            <button
                                                className="p-2 px-5 mt-2 hover:bg-blue-400 bg-blue-500 text-white font-extrabold rounded-lg"
                                                onClick={updateProduct}
                                            >
                                                Update
                                            </button>
                                            
                                        </div>
                                    </div>
                                </div>
                            ) }

                        </>
                    )}

                    <Footer />
                </>
            ) : (
                <NotFound />
            )}
        </>
    )
}

export default Product