import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { get } from "../utils/RequestAPI";
import loadingIcon from "../assets/icons8-loading.gif"

type Seller = {
    id:number,
    image:string,
    name:string
}

type Product = {
    id:number,
    name:string,
    description:string,
    image:string,
    price:number,
    sold:number,
    star:number,
    tags:string[],
    seller:Seller
}

function MyProduct() {
    const [searchParams] = useSearchParams();

    const [products,setProducts] = useState<Product[]|null>(null);
    const [loading,setLoading] = useState(true);
    const [token] = useState(localStorage.getItem("token"));
    const [role] = useState(localStorage.getItem("role"));
    const [page, _] = useState(Number(searchParams.get("page")) || 0);
    const [totalProductLength, setTotalProductLength] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        document.title = "My Product";

        if(token === null || token === ""){
            navigate("/login");
            return;
        }

        if(role !== "seller"){
            navigate("/")
            return;
        }

        async function getProducts(){
            if(token === null || token === ""){
                return;
            }
            const userResult = await get("/api/user/profile",token);
            
            if(userResult === undefined){
                localStorage.removeItem("role");
                localStorage.removeItem("token");
                navigate("/login");
                return;
            }
            const result = await get(`/api/product/seller/${userResult.user.id}?page=${page}&size=${19}`);
            setProducts(result.products.list)            
            setTotalProductLength(result.products.totalLength)

        }
        setLoading(false);
        getProducts();
    }, []);

    return (
        <>
            <Navbar />

            <div className="mt-24 mx-2 md:mx-20">
                <h1 className="text-lg font-extrabold">
                    My Products
                </h1>
            </div>

            {products? (
                <>
                    <Card productList={products} newCard={true} />
                    <Pagination currentPage={{ page: page + 1, length: totalProductLength,size:19 }} path="my-product" />
                </>
            ):loading?(
                <div className="mx-2 md:mx-20 mt-24 flex justify-center items-center py-40">
                    <img 
                        src={loadingIcon} 
                        alt={loadingIcon} 
                        className="w-44 h-44"
                    />
                </div>
            ):(
                <div className="grid mx-2 md:mx-20 mt-[10vh] mb-[20vh] grid-cols-2 md:grid-cols-5 gap-1 md:gap-7 gap-y-5 m-5">
                    <a href="/create-product">
                        <div className="bg-gray-100 hover:bg-gray-50 rounded-xl py-[5.5rem] flex flex-col justify-center items-center cursor-pointer">
                            <img 
                                className="w-16 h-16" 
                                src="https://img.icons8.com/external-glyph-silhouettes-icons-papa-vector/78/9ca3af/external-Plus-interface-glyph-silhouettes-icons-papa-vector.png" 
                                alt="external-Plus-interface-glyph-silhouettes-icons-papa-vector"
                            />
                            <h4 className="text-gray-500 font-extrabold">Add Product</h4>
                        </div>
                    </a> 
                </div>
            )}
            <Footer />
        </>
    )
}

export default MyProduct