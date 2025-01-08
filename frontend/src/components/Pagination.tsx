import { useSearchParams } from "react-router-dom"

interface CurrentPage {
    currentPage: {
        page: number,
        length: number
    }
}

function Pagination({ currentPage }: CurrentPage) {
    const [searchParams] = useSearchParams();
    const search = searchParams.get("name");

    const itemsPerPage = 20;
    const pageTotal = Math.ceil(currentPage.length / itemsPerPage);

    const currentPageIndex = currentPage.page;

    const windowSize = 5;
    const start = Math.max(1, currentPageIndex - Math.floor(windowSize / 2));
    const end = Math.min(pageTotal, start + windowSize - 1);
    const adjustedStart = Math.max(1, end - windowSize + 1);
    
    const counter = [];
    for (let x = adjustedStart; x <= end; x++) {
        counter.push(x);
    }

    return (
        <div className="h-14 flex justify-center mb-10 mt-5">
            <ul className="flex items-center text-lg md:text-sm font-bold">
                {counter.map((number) => (

                    number === currentPage.page ? (                        
                        <div
                            key={number}
                            
                            className="w-8 h-8 md:w-9 md:h-9 bg-black text-white flex rounded-lg justify-center text-center items-center cursor-pointer"
                        >
                            {number}
                        </div>
                    ) : (
                        <a href={`/search?name=${search}&page=${number}`}>
                            <div
                                key={number}
                                className="w-8 h-8 md:w-9 md:h-9  hover:bg-gray-100 flex rounded-lg justify-center text-center items-center cursor-pointer"
                            >
                                {number}
                            </div>                            
                        </a>
                    )
                ))}
            </ul>
        </div>
    )
}

export default Pagination