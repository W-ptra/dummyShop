import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useEffect } from "react";

function Transaction() {
    useEffect(() => {
        document.title = "Transaction";
    }, []);
    return (
        <>
            <Navbar />

            <Footer />
        </>
    )
}

export default Transaction