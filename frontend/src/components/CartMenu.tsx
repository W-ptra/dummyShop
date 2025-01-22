interface Product {
    id: number;
    name: string;
    image: string;
    price: number;
}

interface CartProducts {
    cartProducts: Product[]|null;
}

function CartMenu({ cartProducts }: CartProducts) {

    return (
        <div
            className="flex flex-col justify-between fixed right-3 top-16 h-[20rem] w-1/2 md:w-1/4 z-10 
            bg-white border-2 rounded-xl border-black-100"
        >
            <ul className="flex flex-col m-5 mb-0 gap-0">

                {cartProducts == null ? (
                    <div className="flex justify-center items-center mt-24">
                        <img src="https://img.icons8.com/windows/32/where-what-quest.png" alt="" className="w-14 h-14"/>
                        <h4 className="font-semibold">
                            Cart is empty
                        </h4>
                    </div>
                    
                ):(
                    <>
                        {cartProducts.map((obj) => (
                            <a href={`/product/${obj.id}`}>
                                <li className="p-1 md:p-2 flex justify-between rounded hover:bg-gray-100 cursor-pointer items-center" key={obj.id}>
                                    <div className="flex items-center">
                                        <img className="w-10 h-10 mr-2 rounded" src={obj.image} alt="" />
                                        <span className="text-[0.7rem] md:text-base font-extrabold">
                                            {obj.name}
                                        </span>
                                    </div>
                                    <span className=" text-[0.7rem] md:text-sm font-bold">
                                        {"$" + obj.price}
                                    </span>
                                </li>
                            </a>
                        ))}

                    </>
                )}

            </ul>
            <a href="/cart" className="flex justify-center">
                <button className="flex cursor-pointer m-5 mt-0 p-2 px-6 rounded bg-blue-500 hover:bg-blue-400 justify-center">
                    <span className="text-white font-bold">
                        Go to Cart
                    </span>
                </button>
            </a>
        </div>
    )
}

export default CartMenu