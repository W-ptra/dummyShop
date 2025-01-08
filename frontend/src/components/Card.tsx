interface Product {
    id: number;
    name: string;
    description: string;
    image: string;
    seller: string;
    price: number;
    star: number;
    sold: number;
}
interface CardProperty {
    productList: Product[];
}

function Card({ productList }: CardProperty) {
    return (
        <div className="flex w-full items-center justify-center">
            <div className="mt-20 grid grid-cols-2 md:grid-cols-5 gap-7 gap-y-5 m-5  " >
                {productList.map((product) => (
                    <div className="h-full flex flex-col gap-1 p-1"
                    >
                        <div className="relative  flex w-full h-full cursor-pointer">
                            <img
                                className="object-contain w-[184px] h-[184px] rounded-xl z-0" 
                                src={product.image}
                                alt={product.name}
                            />
                            <div className="absolute inset-0 bg-white opacity-0 hover:opacity-25 transition-opacity duration-300 rounded-xl">
                            
                            </div>
                        </div>

                        <div className="space-y-0">
                            <p className="text-base font-extrabold">
                                {product.name}
                            </p>
                            <p className="text-sm font-normal flex items-center gap-2 justify-between">
                                <span className="font-bold" >{"$" + product.price}</span>
                                <span className="flex items-center justify-center">  
                                    <img className="w-5 h-5" 
                                        src="https://img.icons8.com/color/48/filled-star--v1.png" 
                                        alt="filled-star--v1"
                                    />
                                    <span className="mt-[0.05rem] ml-1">
                                        {product.star}

                                    </span>
                                </span>
                                <span>{product.sold + " sold"}</span>                                
                            </p>
                            
                            <p className="flex items-center">
                                <img
                                    className="w-6 h-6 cursor-pointer"
                                    src="https://img.icons8.com/ios/50/user-male-circle--v1.png"
                                    alt="user-male-circle--v1"
                                />
                                <span className="ml-1 text-base cursor-pointer">
                                    {product.seller}
                                </span>
                            </p>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default Card