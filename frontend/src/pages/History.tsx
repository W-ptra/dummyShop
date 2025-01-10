import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useEffect } from "react";

function History() {
    useEffect(() => {
        document.title = "History";
    }, []);
    return (
        <>
            <Navbar />

            <Footer />
        </>
    )
}

export default History