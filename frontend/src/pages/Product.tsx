import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import NotFound from "./NotFound";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Product() {
    const { id } = useParams<{ id?: string }>();
    const [quantity, setQuantity] = useState(1);

    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8080/api/product/${id}`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const result = await response.json();
                console.log(result)
                setData(result);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        document.title = `Product ${id}`;
    }, []);

    const product = {
        name: "trouser by H&M",
        price: 12.9,
        description: "great trouser, cool aaa aaaaaaaaaa aaaaaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaa aaaaaa",
        image: "https://img.freepik.com/free-vector/cute-astronaut-samurai-with-kitsune-mask-katana-sword-cartoon-vector-icon-illustration-science_138676-9360.jpg",
        seller: "jojon jojon",
        star: 4,
        sold: 2,
        tags: [
            "juanP2",
            "kopiHItam1",
            "samsel",
            "samsul",
            "jiji",
            "bobon",
            "p",
            "hehe"
        ],
        reviews: [
            {
                name: "mulki",
                image: "https://img.freepik.com/free-photo/rendering-bee-anime-character_23-2150963632.jpg",
                content: "i mean its alright aaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaa",
                star: 4
            },
            {
                name: "mulki",
                image: "https://img.freepik.com/free-photo/medium-shot-anime-characters-hugging_23-2150970815.jpg",
                content: "i mean its alright",
                star: 4
            }
        ]
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
                                    <div className="flex justify-evenly mt-2 pb-7  border border-white border-b-gray-400">
                                        <button className="bg-blue-500 rounded flex w-[10rem] h-10 hover:bg-blue-400 justify-center items-center ml-5 mr-2.5 basis-1/2">
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