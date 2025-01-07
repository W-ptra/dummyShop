import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

function Home(){

    const productList = [
        {
            id: 1,
            name: "product 1",
            description: "description 1",
            image: "https://img.freepik.com/free-vector/cute-astronaut-samurai-with-kitsune-mask-katana-sword-cartoon-vector-icon-illustration-science_138676-9360.jpg",
            seller: "juan",
            price: 20.75,
            star: 2,
            sold: 1
        },
        {
            id: 1,
            name: "product 1",
            description: "description 1",
            image: "https://img.freepik.com/free-vector/cute-astronaut-samurai-with-kitsune-mask-katana-sword-cartoon-vector-icon-illustration-science_138676-9360.jpg",
            seller: "juan",
            price: 20.75,
            star: 2,
            sold: 1
        },
        {
            id: 1,
            name: "product 1",
            description: "description 1",
            image: "https://img.freepik.com/free-vector/cute-astronaut-samurai-with-kitsune-mask-katana-sword-cartoon-vector-icon-illustration-science_138676-9360.jpg",
            seller: "juan",
            price: 20.75,
            star: 2,
            sold: 1
        },
        {
            id: 1,
            name: "product 1",
            description: "description 1",
            image: "https://img.freepik.com/free-vector/cute-astronaut-samurai-with-kitsune-mask-katana-sword-cartoon-vector-icon-illustration-science_138676-9360.jpg",
            seller: "juan",
            price: 20.75,
            star: 2,
            sold: 1
        },
        {
            id: 1,
            name: "product 1",
            description: "description 1",
            image: "https://img.freepik.com/free-vector/cute-astronaut-samurai-with-kitsune-mask-katana-sword-cartoon-vector-icon-illustration-science_138676-9360.jpg",
            seller: "juan",
            price: 20.75,
            star: 2,
            sold: 1
        },
        {
            id: 1,
            name: "product 1",
            description: "description 1",
            image: "https://img.freepik.com/free-vector/cute-astronaut-samurai-with-kitsune-mask-katana-sword-cartoon-vector-icon-illustration-science_138676-9360.jpg",
            seller: "juan",
            price: 20.75,
            star: 2,
            sold: 1
        }
    ]

    return (
        <>
            <Navbar/>
            <Card productList={productList} />            
            <Footer/>
        </>
    )
}

export default Home;