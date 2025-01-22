import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deletes, get, post } from "../utils/RequestAPI";

type Product = {
    id: number,
    name: string,
    price: number,
    image: string,
    quantity: number
}

function Cart() {
    const [token] = useState(localStorage.getItem("token"));
    const [role] = useState(localStorage.getItem("role"));
    const checkboxRef = useRef<HTMLInputElement[]>([]);
    const [products, setProducts] = useState<Product[] | null>(null);
    const navigate = useNavigate();

    const [selectedProduct, setSelectedProduct] = useState<Product[]>([]);

    const calculateTotal = (list: Product[]) => {
        let total = 0;
        list.forEach(element => total += (element.price * element.quantity));
        return total;
    }

    useEffect(() => {
        document.title = "Cart";
    }, []);

    useEffect(() => {
        if (token === null || token === "") {
            navigate("/login");
            return;
        }

        if (role === null || role === "" || role === "seller") {
            navigate("/");
            return;
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (token === null || token === "") {
                return;
            }
            const result = await get("/api/cart", token);
            if (result === undefined || result.error) {
                console.log("error can't get cart")
                localStorage.removeItem("role");
                localStorage.removeItem("token");
                return;
            }

            setProducts(result.carts);
        };
        fetchData();
    }, []);

    const deleteCartById = async (productId: number) => {

        if (token === null || token === "") {
            return;
        }
        await deletes(`/api/cart/${productId}`, token);
        window.location.reload();
    }

    const incrementChangeHandle = (id: number) => {
        if (!products) return;

        const updatedProducts = products.map((prevProduct) => {
            if (prevProduct.id === id) {
                return { ...prevProduct, quantity: prevProduct.quantity + 1 };
            }
            return prevProduct;
        });

        setProducts(updatedProducts);
    };

    const decrementChangeHandle = (id: number) => {
        if (!products) return;

        const updatedProducts = products.map((prevProduct) => {
            if (prevProduct.quantity < 2) return prevProduct;
            if (prevProduct.id === id) {
                return { ...prevProduct, quantity: prevProduct.quantity - 1 };
            }
            return prevProduct;
        });

        setProducts(updatedProducts);
    };

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!products) return;
        const id = Number(event.currentTarget.getAttribute("data-id"));
        console.log(id)

        const productList = products.map((prevProduct) => {
            if (prevProduct.id === id) {
                return { ...prevProduct, quantity: Number(event.target.value) }
            }
            return prevProduct;
        })

        setProducts(productList);
    }

    const handleCheckboxCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!products) return;

        const { checked } = event.target;
        const id = Number(event.currentTarget.getAttribute("data-id"));
        const product = products.find(element => {
            if (element.id === id) return element;
        });

        if (!product) return;

        if (checked) {
            setSelectedProduct((prev) => [...prev, product]);
            return;
        }

        setSelectedProduct((prev) => prev.filter((item) => item.id !== product.id));
    }

    const handleCheckAllCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!products) return;
        const { checked } = event.target;
        setSelectedProduct([]);
        checkboxRef.current.forEach((checkbox) => {
            if (checkbox) checkbox.checked = false;
        });

        if (checked) {
            checkboxRef.current.forEach((checkbox) => {
                if (checkbox) checkbox.checked = true;
            });

            setSelectedProduct([...products]);
            return;
        }
    }

    function delay(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
     }

    const createTransaction = async () => {
        if (token === null || token === "") {
            return;
        }
        const payload = {
            details : [...selectedProduct]
        }

        const result = await post("/api/transaction",token,payload);

        if(result === undefined){
            return;
        }

        selectedProduct.forEach((element)=>{
            deletes(`/api/cart/${element.id}`,token);
        })

        await delay(1000);
        window.location.reload();
    }

    return (
        <>
            <Navbar />
            <div className="pt-20 px-2 md:px-20 pb-5 bg-gray-100 flex flex-col">
                {products === undefined ? (
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
                ) : (
                    <>
                        <div className="bg-white mb-3 p-2 rounded flex">
                            <div className="basis-2/6 flex">
                                <div className="basis-1/5 flex justify-center items-center">
                                    <input
                                        className="w-4 h-4 cursor-pointer"
                                        type="checkbox" name="" id="all"
                                        onChange={handleCheckAllCheckbox}
                                    />
                                    <label htmlFor="all"></label>
                                </div>
                                <span className="text-sm md:text-base basis-4/5 flex justify-center font-semibold">
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
                        <div className="bg-white px-1 pb-10 pt-2 rounded">

                            {products && products.map((product) => (
                                <div className="flex p-1 md:p-2 py-5 items-center justify-evenly border border-white border-b-gray-500">

                                    <div className="basis-2/6 flex items-center">
                                        <div className="basis-1/5 flex justify-center items-center">

                                            <input
                                                type="checkbox"
                                                name=""
                                                id="productCheck"
                                                ref={(el) => (checkboxRef.current[product.id] = el!)}
                                                data-id={product.id}
                                                className="mr-1 md:mr-3 w-4 h-4 cursor-pointer"
                                                onChange={handleCheckboxCheck}
                                            />
                                            <label
                                                className="flex"
                                                htmlFor={`${product.id}`}
                                            >

                                            </label>
                                        </div>
                                        <img
                                            src={product.image}
                                            alt=""
                                            className=" w-10 h-10 md:w-20 md:h-20 rounded basis-1/6"
                                        />
                                        <h2 className="ml-0.5 md:ml-2 font-bold text-gray-500 text-xs md:text-base basis-3/6">
                                            {product.name}
                                        </h2>
                                    </div>

                                    <div className="basis-1/6 flex justify-center text-gray-500">
                                        <h2 className="font-bold text-sm md:text-base">
                                            {" $" + product.price}
                                        </h2>
                                    </div>
                                    <div className="basis-1/6 flex justify-center text-gray-500">
                                        <button
                                            className="text-[1.05rem] bg-blue-500 w-10 text-white font-bold"
                                            onClick={() => decrementChangeHandle(product.id)}
                                        >
                                            -
                                        </button>
                                        <input
                                            className="border-blue-500 outline-none border pl-[0.4rem] w-[2.5rem]"
                                            type="number"
                                            name=""
                                            id=""
                                            min={1}
                                            data-id={product.id}
                                            value={product.quantity}
                                            onChange={handleQuantityChange}
                                        />
                                        <button
                                            className="text-[1.05rem] bg-blue-500 w-10 text-white font-bold"
                                            onClick={() => incrementChangeHandle(product.id)}
                                        >
                                            +
                                        </button>

                                    </div>
                                    <div className="basis-1/6 flex justify-center text-gray-500">
                                        <h2 className="font-bold text-sm md:text-base">
                                            {"$" + product.price * product.quantity}
                                        </h2>
                                    </div>
                                    <div className="basis-1/6 flex justify-center">
                                        <button
                                            className="bg-red-500 hover:bg-red-400 p-1 md:p-2 px-2 
                                                md:px-4 rounded-lg text-white font-bold text-xs md:text-base"
                                            onClick={async () => await deleteCartById(product.id)}
                                        >

                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {products && (
                                <div className="flex justify-center md:justify-end mt-10 mr-0 md:mr-10 items-center">
                                    <h2 className="mr-2 md:mr-0">
                                        Total {`(${selectedProduct.length} Products):`}
                                        <span className="font-bold md:ml-1 mr-0 md:mr-5 text-lg">
                                            {"$" + calculateTotal(selectedProduct)}
                                        </span>
                                    </h2>
                                    <button 
                                        className=" bg-blue-500 hover:bg-blue-400 px-10 py-2 rounded-md font-bold text-white"
                                        onClick={createTransaction}    
                                    >
                                        Checkout
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
            <Footer />
        </>
    )
}

export default Cart