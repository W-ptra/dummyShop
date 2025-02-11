import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import {get} from "../utils/RequestAPI";



type Tag = {
    name:string;
    total:number;
}

type Seller = {
    userId:number,
    name:string,
    about:string,
    image:string,
    banner:string,
    solds:number,
    star:number
}

function Home() {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [data, setData] = useState<any>(null);
    const [sellers,setSellers] = useState<Seller[]|null>(null);
    const [tags,setTags] = useState<Tag[]|null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const fetchData = async () => {
            const data = await get(`${import.meta.env.VITE_API}/api/product?page=4&size=10`)
            if(!data){
                setError('An unknown error occurred.');
                return;
            }
            console.log(data)
            setData(data);
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const data = await get(`${import.meta.env.VITE_API}/api/user/top-sellers`)
            if(!data){
                setError('An unknown error occurred.');
                return;
            }
            console.log(data);
            setSellers(data.sellers);
        };

        fetchData();
    }, []);

    useEffect(() => {
        async function getTags(){
            const result = await get(`${import.meta.env.VITE_API}/api/tag`);
            if(result === undefined){
                return;
            }
            setTags(result.tags);
        }
        getTags();
    },[])

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        document.title = "home";
    }, []);

    function generatePastelColor() {
        const randomColorValue = () => Math.floor(Math.random() * 100 + 120);
        const r = randomColorValue();
        const g = randomColorValue();
        const b = randomColorValue();
        return `rgb(${r}, ${g}, ${b})`;
    }

    const truncateText = (text: string, max: number, min: number): string => {
        const maxLength = screenWidth < 768 ? min : max;

        return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    };

    return (
        <>
            <Navbar />
            <div className="mt-24 flex flex-col justify-center mx-2 md:mx-20">
                <img
                    className=" h-[10rem] md:h-[20rem] rounded-xl"
                    src="https://img.freepik.com/free-vector/hand-drawn-halloween-twitch-banner_23-2149602862.jpg"
                    alt=""
                />
            </div>

            <div className="flex mx-2 md:mx-20 mt-10 md:mt-16">
                <h2 className="font-bold text-xl">
                    Popular Tags
                </h2>
            </div>
            <div className="flex mx-2 md:mx-20 justify-evenly mt-5 flex-wrap">
                { tags && tags.map((tag) => (
                    <a href={`/search?query=@${tag.name}`}>
                        <span
                            style={{ backgroundColor: generatePastelColor() }}
                            className=" px-4 py-1 rounded-md flex flex-wrap m-1 font-bold text-base cursor-pointer text-white"
                        >
                            {"#" + tag.name}
                        </span>
                    </a>
                ))}
            </div>

            <div className="flex mx-2 md:mx-20 mt-10">
                <h2 className="font-bold text-xl">
                    Recommended Products
                </h2>
            </div>
            {data && (
                <Card productList={data.products.list} />
            )}

            <div className="flex mx-2 md:mx-20 mt-10 md:mt-16">
                <h2 className="font-bold text-xl">
                    Popular Products
                </h2>
            </div>
            {data && (
                <Card productList={data.products.list.slice(0,10)} />
            )}

            <div className="flex mx-2 md:mx-20 mt-10 md:mt-16">
                <h2 className="font-bold text-xl">
                    Top Seller
                </h2>
            </div>
            <div className="grid mx-2 md:mx-20 grid-cols-2 md:grid-cols-4 gap-7 gap-y-5 m-5 mb-10">
                { sellers && sellers.map((seller) => (
                    <div className="bg-gray-100 rounded-xl flex flex-col cursor-pointer">
                        <div className="basis-3/5 relative flex">
                            <img
                                className="h-full w-full rounded-t-xl rounded-none"
                                src={seller.banner ? seller.banner:""}
                                alt=""
                            />
                            <div className="absolute inset-0 bg-white opacity-0 hover:opacity-25 transition-opacity duration-300 rounded-xl">

                            </div>
                        </div>
                        <div className="basis-2/5 flex flex-col p-2">
                            <div className="flex items-center">
                                <img
                                    className="w-8 h-8 rounded-full"
                                    src={seller.image?seller.image:""}
                                    alt=""
                                />
                                <p className="ml-1.5 text-base font-bold">
                                    {seller.name?truncateText(seller.name, 18, 10):""}
                                </p>
                            </div>
                            {seller.about?(
                                <span className="p-1 text-sm">
                                    {truncateText(seller.about, 30, 35)}
                                </span>
                            ):(
                                <br />
                            )}
                            <span className="p1 text-sm ml-1 flex justify-between mr-1">
                                <div className="flex">
                                    <img className="w-5 h-5"
                                        src="https://img.icons8.com/color/48/filled-star--v1.png"
                                        alt="filled-star--v1"
                                    />
                                    <span className="mt-[0.05rem] ml-1">
                                        {seller.star}

                                    </span>
                                </div>
                                <span className="">
                                    {seller.solds + " sold"}
                                </span>
                            </span>
                        </div>
                    </div>
                    
                ))}
            </div>

            <Footer />
        </>
    )
}

export default Home;