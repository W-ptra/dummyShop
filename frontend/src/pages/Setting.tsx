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
            <div className="mt-[20vh] mx-5 mb-[30vh]">
                <h1 className="font-bold text-lg">
                    Setting Page
                </h1>
                <p className="mt-5">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus optio asperiores provident eveniet sunt! Blanditiis nulla aut dignissimos suscipit harum, eum in esse earum fugit. Qui nostrum delectus velit magni!
                    Inventore, maiores obcaecati aliquid similique tempore repudiandae nam nihil, commodi cum laudantium doloribus perspiciatis, repellat corporis minima? Sunt veniam perferendis dolor obcaecati dolores, assumenda ad dignissimos delectus, aut ullam pariatur!
                </p>
                <br />
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore qui sapiente magnam earum? Recusandae ullam omnis aliquid, aliquam eum id eaque doloremque corrupti ipsam quod ipsa libero optio! Vero, voluptatem.
                    Quis non incidunt labore vitae magnam, inventore beatae? Ullam accusantium quo et quasi sequi eaque aliquam eos saepe explicabo consequatur consectetur quisquam doloremque quae adipisci reprehenderit repellendus facere, nam dignissimos.
                    Odio sapiente incidunt voluptatum corporis, ducimus consectetur accusamus! Delectus nesciunt aut aspernatur fugiat, molestiae culpa minima placeat quia porro. Vitae qui nam temporibus? Et animi corrupti harum pariatur modi iste.
                </p>
            </div>
            <Footer />
        </>
    )
}

export default Setting