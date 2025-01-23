import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { get } from "../utils/RequestAPI";
import loadingIcon from "../assets/icons8-loading.gif"

function MyProduct() {
    const [searchParams] = useSearchParams();

    const [products,setProducts] = useState<any>(null);
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
            console.log(userResult);
            if(result === undefined){
                localStorage.removeItem("role");
                localStorage.removeItem("token");
                navigate("/login");
                return;
            }
            
            setProducts(result)
            setTotalProductLength(result.products.totalLength)
            console.log(products,totalProductLength);
        }

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

            {products.products !== null ?(
                <>
                    <Card productList={products.products.list} newCard={true} />
                    <Pagination currentPage={{ page: page + 1, length: totalProductLength,size:19 }} path="my-product" />
                </>
            ):(
                <div className="mx-2 md:mx-20 mt-24 flex justify-center items-center py-40">
                    <img 
                        src={loadingIcon} 
                        alt={loadingIcon} 
                        className="w-44 h-44"
                    />
                </div>
            )}


            <Footer />
        </>
    )
}

export default MyProduct