import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useEffect } from "react";

function UpdateDelete() {
    useEffect(() => {
        document.title = "Update Delete";
    }, []);
    return (
        <>
            <Navbar />

            <Footer />
        </>
    )
}

export default UpdateDelete