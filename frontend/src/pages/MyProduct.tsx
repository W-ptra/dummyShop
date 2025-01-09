import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";

function MyProduct(){
    const [searchParams] = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;
    const size = 19;

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
        image: "https://img.freepik.com/free-vector/manga-frames-design_603843-1157.jpg",
        seller: "juan",
        price: 15.15,
        star: 4.7,
        sold: 2
    }

    const list = []
    const productList = []

    for(let x=1;x<=130;x++){
        if(x%2===1){
            const cpy = {...obj1}
            cpy.name = `Product ${x}`
            list.push(cpy)
        } else {
            const cpy = {...obj2}
            cpy.name = `Product ${x}`
            list.push(cpy)
        }
    }

    for(let x=(size*(page-1)); x<(size*page);x++){
        if(list[x]){
            productList.push(list[x])
        }
    }

    const currentPage1 = {
        page:page,
        length:list.length
    }

    return (
        <>
            <Navbar/>

            <Card productList={productList} newCard={true} />

            <Pagination currentPage={currentPage1} path="my-product" />

            <Footer/>
        </>
    )
}

export default MyProduct