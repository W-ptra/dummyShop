import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useEffect } from "react";

function Checkout() {
    useEffect(() => {
        document.title = "Checkout";
    }, []);
    return (
        <>
            <Navbar />

            <Footer />
        </>
    )
}

export default Checkout