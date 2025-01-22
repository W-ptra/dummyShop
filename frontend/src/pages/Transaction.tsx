import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useEffect, useState } from "react";
import ReviewInput from "../components/ReviewMenu";
import { useNavigate } from "react-router-dom";
import { get } from "../utils/RequestAPI";

type TransactionDetail = {
    name:string,
    price:number,
    seller:string,
    image:string,
    quantity:number
}

type TransactionHeader = {
    date:string,
    list:TransactionDetail[],
    total:number,
    status:string
}

function Transaction() {
    const [transactionHeaders,settransactionHeaders] = useState<TransactionHeader[]>([]);
    const [reviewMenu,setReviewMenu] = useState(false);
    const [token] = useState(localStorage.getItem("token"));
    const navigate = useNavigate();
    const handleReviewMenuChange = () => {
        setReviewMenu((prev)=>!prev);
    }

    useEffect(()=>{
        if(reviewMenu){
            document.body.style.overflow = "hidden";
            return;
        }

        document.body.style.overflow = "auto";
    },[reviewMenu])

    useEffect(() => {
        document.title = "Transaction";
    }, []);

    useEffect(()=>{
        async function getTransactions(){
            if(token === "" || token === null){
                navigate("/login");
                return;
            }
            const result = await get("/api/transaction",token);
            console.log(result);
            if(result === undefined){
                return;
            }

            settransactionHeaders(result.transactions)
        }
        getTransactions();
    },[]);
    
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



    return (
        <>
            <Navbar />
            <div className="mt-20 mb-5 mx-3 md:mx-20">
                { transactionHeaders.length !== 0 ? transactionHeaders.map((transaction)=>(
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
                                        {" "+transaction.status}
                                    </span>                                  
                                </span>
                            </h4>
                        </div>
                        <div className="flex flex-col">
                            {transaction.list.map((product)=>(
                                <div className="bg-gray-100 rounded-[1.5rem] mt-1">
                                    <div className="flex p-2 mx-5 my-2 border border-gray-100 border-b-gray-700">
                                        <div className="flex items-center gap-5 basis-5/6">
                                            <img 
                                                src={product.image}
                                                alt={product.image}
                                                className="w-32 h-32"
                                            />
                                            <span className="font-bold">
                                                {product.name}
                                            </span>
                                        </div>
                                        <div className="flex flex-col justify-center basis-1/6">
                                            <span className="font-bold flex flex-row-reverse mr-7">
                                                {"$"+product.price}
                                            </span>
                                        </div>                                    
                                    </div>
                                    <div className="flex justify-end mt-2">
                                        <button 
                                            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-1.5 px-5 mx-5 mb-4 rounded-lg text-sm"
                                            onClick={handleReviewMenuChange}
                                            data-product-id={1}
                                        >
                                            Review
                                        </button>
                                    </div>
                                </div>
                                
                            ))}
                        </div>
                        <div className="py-5 flex flex-col bg-gray-100 mt-1 rounded-[1rem]">
                            <h4 className="flex justify-end mr-5 space-x-1">
                                <span>
                                    Total:
                                </span>
                                <span className="font-semibold">
                                    {" $"+transaction.total}
                                </span>
                            </h4>
                    
                        </div>
                    </div>
                )):(
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
            { reviewMenu && (
                <ReviewInput setReviewMenu={setReviewMenu}/>
            ) }
            
            <Footer />
        </>
    )
}

export default Transaction