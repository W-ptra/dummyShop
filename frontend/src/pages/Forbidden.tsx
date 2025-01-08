import { useEffect } from "react";

function Forbidden(){
    useEffect(() => {
        document.title = "404 Not Found";
    },[]);
    return(
        <div>
            <h1>404 Not Found</h1>
        </div>
    )
}

export default Forbidden;