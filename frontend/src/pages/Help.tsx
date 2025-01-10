import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useEffect } from "react";

function Help() {
    useEffect(() => {
        document.title = "Help";
    }, []);
    return (
        <>
            <Navbar />

            <Footer />
        </>
    )
}

export default Help