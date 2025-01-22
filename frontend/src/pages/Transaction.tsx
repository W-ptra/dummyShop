import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { get, post } from "../utils/RequestAPI";

type TransactionDetail = {
    id:number,
    name: string,
    price: number,
    seller: string,
    image: string,
    quantity: number,
    reviewed: boolean
}

type TransactionHeader = {
    date: string,
    list: TransactionDetail[],
    total: number,
    status: string
}

function Transaction() {
    const [transactionHeaders, settransactionHeaders] = useState<TransactionHeader[]>([]);
    const [reviewContent, setReviewContent] = useState("good product");
    const [selectedProductId,setSelectedProductId] = useState(0);
    const [selectedProductImage,setSelectedProductImage] = useState("");
    const [reviewStar, setReviewStar] = useState(5);
    const [reviewMenu, setReviewMenu] = useState(false);
    const [token] = useState(localStorage.getItem("token"));
    const navigate = useNavigate();

    const handleReviewMenuChange = (id: number,image:string) => {
        setSelectedProductId(id);
        setSelectedProductImage(image)
        setReviewMenu((prev) => !prev);
    }

    useEffect(() => {
        if (reviewMenu) {
            document.body.style.overflow = "hidden";
            return;
        }

        document.body.style.overflow = "auto";
    }, [reviewMenu])

    useEffect(() => {
        document.title = "Transaction";
    }, []);

    useEffect(() => {
        async function getTransactions() {
            if (token === "" || token === null) {
                navigate("/login");
                return;
            }
            const result = await get("/api/transaction", token);
            console.log(result);
            if (result === undefined) {
                return;
            }

            settransactionHeaders(result.transactions)
        }
        getTransactions();
    }, []);

    const formatDate = (dateString: string): string => {
        // Parse the date string into a Date object
        const date = new Date(dateString);

        // Define month names
        const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        // Extract day, month, year, hours, and minutes
        const day = date.getUTCDate();
        const month = months[date.getUTCMonth()];
        const year = date.getUTCFullYear();
        const hours = date.getUTCHours().toString().padStart(2, "0");
        const minutes = date.getUTCMinutes().toString().padStart(2, "0");

        // Get ordinal suffix for the day
        const getOrdinalSuffix = (day: number) => {
            if (day >= 11 && day <= 13) return "th";
            const lastDigit = day % 10;
            if (lastDigit === 1) return "st";
            if (lastDigit === 2) return "nd";
            if (lastDigit === 3) return "rd";
            return "th";
        };
        const ordinalSuffix = getOrdinalSuffix(day);

        // Format the date string
        return `${day}${ordinalSuffix} ${month} ${year}, ${hours}:${minutes} (UTC)`;
    };

    const closeReviewMenu = () =>{
        setReviewContent("good product")
        setReviewStar(5);
        setReviewMenu(false);
    }

    const handleReviewContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setReviewContent(event.target.value);
    }
    const handleReviewStarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const star = Number(event.target.value)
        if (star < 1 || star > 5) return;
        setReviewStar(star);
    }

    const createReview = async () => {
        if (token === "" || token === null) return;
        const payload = {
            content: reviewContent,
            star: reviewStar,
            transactionDetailId: selectedProductId
        }

        const result = await post("/api/review", token, payload);

        if (result === undefined) {
            console.log("error can't create review");
            return;
        }
        window.location.reload();
    }

    return (
        <>
            <Navbar />
            <div className="mt-20 mb-5 mx-3 md:mx-20">
                {transactionHeaders.length !== 0 ? transactionHeaders.map((transaction) => (
                    <div className="flex flex-col my-5 py-5">
                        <div className="px-5 py-4 bg-gray-100 rounded-[1rem]">
                            <h4 className="flex flex-col md:flex-row justify-between ">
                                <span className="font-semibold">
                                    {formatDate(transaction.date)}
                                </span>
                                <span>
                                    <span>
                                        Status:
                                    </span>
                                    <span className="font-semibold">
                                        {" " + transaction.status}
                                    </span>
                                </span>
                            </h4>
                        </div>
                        <div className="flex flex-col">
                            {transaction.list.map((product) => (
                                <div className="bg-gray-100 rounded-[1.5rem] mt-1">
                                    <div className="flex p-2 mx-5 my-2 border border-gray-100 border-b-gray-700">
                                        <div className="flex items-center gap-5 basis-5/6">
                                            <a href={`/product/${product.id}`}>
                                                <img
                                                    src={product.image}
                                                    alt={product.image}
                                                    className="w-32 h-32"
                                                />
                                            </a>
                                            <span className="font-bold">
                                                {product.name}
                                            </span>
                                        </div>
                                        <div className="flex flex-col justify-center basis-1/6">
                                            <span className="font-bold flex flex-row-reverse mr-7">
                                                {"$" + product.price}
                                            </span>
                                        </div>
                                    </div>
                                    {!product.reviewed ? (
                                        <div className="flex justify-end mt-2">
                                            <button
                                                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-1.5 px-5 mx-5 mb-4 rounded-lg text-sm"
                                                onClick={()=>handleReviewMenuChange(product.id,product.image)}
                                                data-product-id={1}
                                            >
                                                Review
                                            </button>
                                        </div>

                                    ) : (
                                        <div className="flex justify-end mt-2">
                                            <h4 className="text-blue-500 font-extrabold py-1.5 px-5 mx-5 mb-4 rounded-lg text-md">
                                                Thanks for the Review
                                            </h4>
                                        </div>
                                    )}
                                </div>

                            ))}
                        </div>
                        <div className="py-5 flex flex-col bg-gray-100 mt-1 rounded-[1rem]">
                            <h4 className="flex justify-end mr-5 space-x-1">
                                <span>
                                    Total:
                                </span>
                                <span className="font-semibold">
                                    {" $" + transaction.total}
                                </span>
                            </h4>

                        </div>
                    </div>
                )) : (
                    <div className="mt-[20vh] mb-[20vh] h-[55vh] flex flex-col justify-center items-center">
                        <img
                            className="w-20 h-20"
                            src="https://img.icons8.com/windows/32/where-what-quest.png"
                            alt="where-what-quest"
                        />
                        <p className="text-lg font-bold">
                            Cart is Empty
                        </p>
                    </div>
                )}


            </div>
            {reviewMenu && (
                <div className="flex justify-center">
                    <div className="fixed z-20 left-0 right-0 top-0 bottom-0 bg-black opacity-15">

                    </div>
                    <div className="flex flex-col justify-stretch bg-white rounded-lg z-30 fixed left-2 md:left-20 right-2 md:right-20 top-20 bottom-20">
                        
                        <div className="flex justify-center basis-3/5 bg-gray-100 rounded-t-lg items-center">
                            <img
                                src={selectedProductImage}
                                alt=""
                                className="max-w-80 max-h-56"
                            />
                        </div>
                        <div className="flex flex-col basis-2/5 p-4 justify-between">
                            <div className="flex flex-col">
                                <label htmlFor="">Comment</label>
                                <textarea 
                                    name="" id="" 
                                    className="bg-gray-100 px-5 border-2 focus:border-blue-500 outline-none rounded-lg"
                                    value={reviewContent}
                                    onChange={handleReviewContentChange}
                                ></textarea>
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="">Star</label>
                                <input 
                                    type="number" min={1} max={5} 
                                    className="bg-gray-100 px-5 border-2 focus:border-blue-500 outline-none rounded-md" 
                                    value={reviewStar}
                                    onChange={handleReviewStarChange}
                                />
                            </div>
                            <div className="flex justify-center items-center gap-4 mt-2">
                                <button
                                    className="bg-red-500 hover:bg-red-400 text-white font-bold w-32 py-1.5 rounded-lg"
                                    onClick={closeReviewMenu}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="bg-blue-500 hover:bg-blue-400 text-white font-bold w-32 py-1.5 rounded-lg"
                                    onClick={createReview}
                                >
                                    Post
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </>
    )
}

export default Transaction