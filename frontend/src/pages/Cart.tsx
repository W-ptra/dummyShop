import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useEffect } from "react";

function Cart() {
    useEffect(() => {
        document.title = "Cart";
    }, []);

    const cart = [
        {
            id:1,
            name: "trouser by H&M",
            price: 12.9,
            image: "https://img.freepik.com/free-vector/cute-astronaut-samurai-with-kitsune-mask-katana-sword-cartoon-vector-icon-illustration-science_138676-9360.jpg",
            quantity: 4
        },
        {
            id:2,
            name: "trouser by H&M",
            price: 12.9,
            image: "https://img.freepik.com/free-vector/cute-astronaut-samurai-with-kitsune-mask-katana-sword-cartoon-vector-icon-illustration-science_138676-9360.jpg",
            quantity: 4
        },
        {
            id:3,
            name: "trouser by H&M",
            price: 12.9,
            image: "https://img.freepik.com/free-vector/cute-astronaut-samurai-with-kitsune-mask-katana-sword-cartoon-vector-icon-illustration-science_138676-9360.jpg",
            quantity: 4
        }
    ];

    return (
        <>
            <Navbar />
            <div className="pt-20 px-2 md:px-20 pb-5 bg-gray-100 flex flex-col">
                {cart.length === 0?(
                    <div className="mt-20 mb-20 h-[55vh] flex flex-col justify-center items-center">
                        <img 
                            className="w-20 h-20" 
                            src="https://img.icons8.com/windows/32/where-what-quest.png" 
                            alt="where-what-quest"
                        />
                        <p className="text-lg font-bold">
                            Cart is Empty
                        </p>
                    </div>
                ):(
                    <>
                        <div className="bg-white mb-3 p-2 rounded flex">
                            <div className="basis-2/6 flex justify-center">
                            
                                <span className="text-sm md:text-base">
                                    Product
                                </span>
                            </div>
                            <div className="basis-1/6 flex justify-center">
                                <span className="text-sm md:text-base">
                                    Price
                                </span>
                            </div>
                            <div className="basis-1/6 flex justify-center">
                                <span className="text-sm md:text-base">
                                    Quantity
                                </span>
                            </div>
                            <div className="basis-1/6 flex justify-center">
                                <span className="text-sm md:text-base">
                                    Total
                                </span>
                            </div>
                            <div className="basis-1/6 flex justify-center">
                                <span className="text-sm md:text-base">
                                    Action
                                </span>
                            </div>
                        </div>
                        <div className="bg-white px-2 pb-10 pt-2 rounded">
                            
                            {cart.map((product)=>(
                                <div className="flex p-1 md:p-2 py-5 items-center justify-evenly border border-white border-b-gray-500">
                                    
                                    <div className="basis-2/6 flex justify-center items-center">
                                        <input 
                                            type="checkbox" 
                                            name="" 
                                            id={`${product.id}`}
                                            className="mr-1 md:mr-3 w-4 h-4"
                                        />
                                        <label 
                                            className="flex"
                                            htmlFor={`${product.id}`}
                                        >
                                            
                                        </label>  
                                        <img 
                                                src={product.image} 
                                                alt="" 
                                                className=" w-10 h-10 md:w-20 md:h-20 rounded"
                                        /> 
                                        <h2 className="ml-0.5 md:ml-2 font-bold text-gray-500 text-xs md:text-base">
                                            {product.name}    
                                        </h2>                                     
                                    </div>

                                    <div className="basis-1/6 flex justify-center text-gray-500">
                                        <h2 className="font-bold text-sm md:text-base">
                                            {" $"+product.price}
                                        </h2>
                                    </div>
                                    <div className="basis-1/6 flex justify-center text-gray-500">
                                        <h2 className="text-sm md:text-base">
                                            {product.quantity}
                                        </h2>
                                    </div>
                                    <div className="basis-1/6 flex justify-center text-gray-500">
                                        <h2 className="font-bold text-sm md:text-base">
                                            $900
                                        </h2>
                                    </div>
                                    <div className="basis-1/6 flex justify-center">
                                        <button 
                                            className="bg-red-500 hover:bg-red-400 p-1 md:p-2 px-2 
                                                md:px-4 rounded-lg text-white font-bold text-xs md:text-base">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <div className="flex justify-center md:justify-end mt-10 mr-0 md:mr-10 items-center">
                                <h2 className="mr-2 md:mr-0">
                                    Total {"(3 Products):"}  <span className="font-bold md:ml-1 mr-0 md:mr-5 text-lg">$2000</span>
                                </h2>
                                <button className=" bg-blue-500 hover:bg-blue-400 px-10 py-2 rounded-md font-bold text-white">
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
            <Footer />
        </>
    )
}

export default Cart