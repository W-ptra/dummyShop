import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Pagination from "../components/Pagination";
import NotFound from "./NotFound";
import loadingIcon from "../assets/icons8-loading.gif"

function Search() {
    const [searchParams] = useSearchParams();
    const search = searchParams.get("query");

    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, _] = useState(Number(searchParams.get("page")) || 0);
    const [totalProductLength, setTotalProductLength] = useState(0);
    
    if (!search) {
        return (
            <NotFound />
        );
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/product?search=${search}&page=${page}&size=${20}`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const result = await response.json();
                console.log(result);
                setData(result);
                setTotalProductLength(result.products.totalLength);
                console.log(page, totalProductLength);
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
        document.title = search.replaceAll("@","#").replaceAll("-"," ");
    }, []);

    return (
        <>
            <Navbar searchParams={search} />

            {data ? (
                <>
                    <div className=" mx-2 md:mx-20 mt-24">
                        <h1 className="text-lg font-extrabold">
                            Search result of
                            <span className="">
                                {' "' + search.replaceAll("@","#").replaceAll("-"," ") + '"'}
                            </span>
                        </h1>
                        <h4 className="">
                            <span className="font-semibold">
                                {data.products.totalLength + " "}
                            </span>
                            Products found
                        </h4>
                    </div>
                    <Card productList={data.products.list} />
                    <Pagination currentPage={{ page: page + 1, length: totalProductLength,size:20 }} path={"search"} />
                </>
            ) : loading? (
                <div className="mx-2 md:mx-20 mt-24 flex justify-center items-center py-40">
                    <img 
                        src={loadingIcon}
                        alt={loadingIcon} 
                        className="w-44 h-44"
                    />
                </div>
            ) : (
                <>
                    <div className="bg-gray-100 mt-18 pt-[40vh] pb-[40vh] flex flex-col justify-center items-center">
                        <img className="w-20 h-20" src="https://img.icons8.com/dotty/80/6b7280/quest.png" alt="quest" />
                        <h1 className="md:text-lg font-extrabold text-gray-500 text-sm">
                        Products with query
                            <span className="">
                                {' "' + search + '" was not Found'}
                            </span>
                        </h1>
                        
                    </div>
                </>
            )}

            <Footer />
        </>
    )
}

export default Search;