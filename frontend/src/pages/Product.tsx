import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import NotFound from "./NotFound";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { get, post } from "../utils/RequestAPI";

function Product() {
    const { id } = useParams<{ id?: string }>();
    const [token] = useState(localStorage.getItem("token"));
    const [quantity, setQuantity] = useState(1);
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    useEffect(() => {        
        const fetchData = async () => {
            const result = await get(`/api/product/${id}`);
            
            if(result === undefined){
                setError("failed to retrive product")
                return;
            }
            console.log(result);
            setData(result);
        };

        fetchData();
    }, []);

    useEffect(() => {
        document.title = `Product ${id}`;
    }, []);

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
        
        if(token === null){
            navigate("/login");
            return;
        }

        const payload = {
            productId:id,
            quantity
        }
        const result = await post("/api/cart",token,payload);
        if(result === undefined){
            console.log("failed to add to cart");
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
                        <div className=" pt-[5.1rem] md:pt-20 flex flex-col items-center bg-gray-100">
                            <div className="bg-white rounded-xl w-[100vw]] md:w-[60vw] flex flex-col mb-10">
                                <div className="w-full h-[20rem] bg-gray-400 items-center flex justify-center rounded-none rounded-t-lg">
                                    <img
                                        className="max-w-full max-h-full"
                                        src={data.product.image}
                                        alt=""
                                    />
                                </div>
                                <div className="">
                                    <div className="mx-5">

                                        <h4 className="font-extrabold text-lg mt-4">
                                            {data.product.name}
                                        </h4>
                                        <p className="text-gray-500 font-semibold mt-1">
                                            {data.product.description}
                                        </p>
                                        <div className="flex gap-x-3 gap-y-1 mt-3 flex-wrap">
                                            {data.product.tags.map((tag: string) => (
                                                <a href={`/search?name=${tag}`}>
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
                                        <button className="bg-blue-500 rounded flex px-6 py-2 w-[10rem] h-10 hover:bg-blue-400 justify-center items-center ml-2.5 mr-5 basis-1/2">
                                            <span className="text-white font-extrabold">
                                                Buy
                                            </span>
                                        </button>
                                        
                                    </div>
                                    
                                    <div className="my-2 px-5 pb-1 flex border border-white border-b-gray-400" key={data.product.seller.id}>
                                        <img 
                                            src={data.product.seller.image} alt="" 
                                            className="w-16 h-16 rounded-full bg-gray-100" 
                                        />
                                        <div className="flex flex-col justify-center items-center">
                                            <h4 className="font-bold ml-5">
                                                {data.product.seller.name}
                                            </h4>
                                        </div>
                                    </div>

                                    <div className="mx-5 mt-2 mb-5">
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

                                </div>
                            </div>
                        </div>
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