function CartMenu(){

    const obj1 = {
        id: 1,
        name: "Product 1",
        image: "https://img.freepik.com/free-vector/cute-astronaut-samurai-with-kitsune-mask-katana-sword-cartoon-vector-icon-illustration-science_138676-9360.jpg",
        price: 20.75,
    }

    const list= []
    list.push(obj1)
    list.push(obj1)
    list.push(obj1)
    list.push(obj1)

    return (
        <div 
            className="flex flex-col justify-between fixed right-3 top-16 h-[20rem] w-1/2 md:w-1/4 z-10 
            bg-white border-2 rounded-xl border-black-100"
        >
            <ul className="flex flex-col m-5 mb-0 gap-0">

                {list.map( (obj) => (
                    <li className="p-1 md:p-2 flex justify-between rounded hover:bg-gray-100 cursor-pointer items-center" key={obj.id}>
                        <div className="flex items-center">
                            <img className="w-10 h-10 mr-2 rounded" src={obj.image} alt="" />
                            <span className="text-[0.7rem] md:text-base font-extrabold">
                                {obj.name}
                            </span>
                        </div>
                        <span className=" text-[0.7rem] md:text-sm font-bold">
                            {"$"+obj.price}
                        </span>
                    </li>
                ) )}
            </ul>
            <div className="flex cursor-pointer m-5 mt-0 p-2 border border-black rounded hover:bg-gray-100 justify-center">
                <span>
                    Go to Cart
                </span>
            </div>
        </div>
    )
}

export default CartMenu