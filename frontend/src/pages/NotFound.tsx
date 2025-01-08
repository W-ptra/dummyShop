import { useEffect } from "react";

function NotFound(){
    useEffect(() => {
        document.title = "404 Not Found";
    },[]);
    return(
        <div>
            <h1>404 Not Found</h1>
        </div>
    )
}

export default NotFound;