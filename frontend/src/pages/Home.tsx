import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import { useEffect, useState } from "react";

function Home(){
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    
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
    },[]);

    function generatePastelColor() {
        const randomColorValue = () => Math.floor(Math.random() * 100 + 120);
        const r = randomColorValue();
        const g = randomColorValue();
        const b = randomColorValue();
        return `rgb(${r}, ${g}, ${b})`;
    }

    const obj1 = {
        id: 1,
        name: "Product 1",
        description: "description 1",
        image: "https://img.freepik.com/free-vector/cute-astronaut-samurai-with-kitsune-mask-katana-sword-cartoon-vector-icon-illustration-science_138676-9360.jpg",
        seller: "juan",
        price: 20.75,
        star: 2,
        sold: 1
    }
    const obj2 = {
        id: 2,
        name: "Product 2",
        description: "description 2",
        image: "https://img.freepik.com/free-photo/illustration-anime-city_23-2151779683.jpg",
        seller: "juan",
        price: 15.15,
        star: 5,
        sold: 2
    }

    const productList = []
    
    const popularTag = [
        "cheap","delicous","durable","test","ant","motor oil","tissue","plant","animal","table"
    ]

    const topSeller = []
    // https://img.freepik.com/free-vector/flat-sale-banner-template-back-school-season_23-2150590734.jpg
    for(let x=1;x<=4;x++){
        topSeller.push({
            id:1,
            name:"extra shop by juan carlos",
            banner:"https://img.freepik.com/free-photo/mythical-dragon-beast-anime-style_23-2151112819.jpg",
            image:"https://img.freepik.com/free-photo/rendering-bee-anime-character_23-2150963632.jpg",
            about:"i sell everything from material to meal, just call me aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            sold:9715,
            star:4.8
        });
    }

    for(let x=1;x<=10;x++){
        if(x%2===1){
            productList.push(obj1)
        } else {
            productList.push(obj2)
        }
    }

    const truncateText = (text: string, max: number, min:number): string => {
        const maxLength = screenWidth < 768 ? min : max;
        return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    };

    return (
        <>
            <Navbar/>
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
                { popularTag.map((tag)=> (
                    <a href={`/search?name=${tag}`}>
                        <span 
                            style={{backgroundColor: generatePastelColor()}}
                            className=" px-4 py-1 rounded-md flex flex-wrap m-1 font-bold text-base cursor-pointer text-white"
                        >
                            {"#"+tag}
                        </span>
                    </a>
                )) }
            </div>

            <div className="flex mx-2 md:mx-20 mt-10">
                <h2 className="font-bold text-xl">
                    Recommended Products
                </h2>
            </div>
            <Card productList={productList} />       

            <div className="flex mx-2 md:mx-20 mt-10 md:mt-16">
                <h2 className="font-bold text-xl">
                    Popular Products
                </h2>
            </div>
            <Card productList={productList} />    
            
            <div className="flex mx-2 md:mx-20 mt-10 md:mt-16">
                <h2 className="font-bold text-xl">
                    Top Seller
                </h2>
            </div>
            <div className="grid mx-2 md:mx-20 grid-cols-2 md:grid-cols-4 gap-7 gap-y-5 m-5 mb-10">
                {topSeller.map((seller)=>(
                    <div className="bg-gray-100 rounded-xl flex flex-col cursor-pointer">
                        <div className="basis-3/5 relative flex">
                            <img 
                                className="h-full w-full rounded-t-xl rounded-none"
                                src={seller.banner} 
                                alt="" 
                            />
                            <div className="absolute inset-0 bg-white opacity-0 hover:opacity-25 transition-opacity duration-300 rounded-xl">
                            
                            </div>
                        </div>
                        <div className="basis-2/5 flex flex-col p-2">
                            <div className="flex items-center">
                                <img 
                                    className="w-8 h-8 rounded-full"
                                    src={seller.image} 
                                    alt="" 
                                />
                                <p className="ml-1.5 text-base font-bold">
                                    {truncateText(seller.name,18,10)}
                                </p>
                            </div>
                            <span className="p-1 text-sm">
                                {truncateText(seller.about,63,35)}
                            </span>
                            <span className="p1 text-sm ml-1 flex justify-between mr-1">
                                <div className="flex">
                                    <img className="w-5 h-5" 
                                        src="https://img.icons8.com/color/48/filled-star--v1.png" 
                                        alt="filled-star--v1"
                                    />
                                    <span className="mt-[0.05rem] ml-1">
                                        { seller.star}

                                    </span>
                                </div>
                                <span className="">
                                    {seller.sold + " sold"}
                                </span> 
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <Footer/>
        </>
    )
}

export default Home;