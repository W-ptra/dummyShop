import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useEffect } from "react";

function Setting() {
    useEffect(() => {
        document.title = "Setting";
    }, []);
    return (
        <>
            <Navbar />

            <Footer />
        </>
    )
}

export default Setting