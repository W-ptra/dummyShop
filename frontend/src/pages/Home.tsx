import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import { useEffect } from "react";

function Home(){

    useEffect(() => {
        document.title = "home";
    },[]);

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
    
    for(let x=1;x<=20;x++){
        if(x%2===1){
            productList.push(obj1)
        } else {
            productList.push(obj2)
        }
    }

    return (
        <>
            <Navbar/>
            <Card productList={productList} />            
            <Footer/>
        </>
    )
}

export default Home;