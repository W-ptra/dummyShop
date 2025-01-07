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
            <div className="mt-20 grid grid-cols-2 md:grid-cols-5 gap-5 gap-y-5 m-5  " >
                {productList.map((product) => (
                    <div className="h-full flex flex-col gap-1 rounded-xl"
                    >
                        <div className="w-full h-full">
                            <img
                                className="object-contain w-[184px] h-[184px] rounded-xl"
                                src={product.image}
                                alt={product.name}
                            />
                        </div>

                        <div className="space-y-0">
                            <p className="text-base font-bold">
                                {product.name}
                            </p>
                            <p className="text-sm font-normal flex items-center gap-3">
                                <span>{product.star + " star"}</span>
                                <span>{product.sold + " sold"}</span>

                            </p>
                            <p className="text-sm font-bold">
                                {"$" + product.price}
                            </p>
                            <p className="flex items-center">
                                <img
                                    className="w-6 h-6"
                                    src="https://img.icons8.com/ios/50/user-male-circle--v1.png"
                                    alt="user-male-circle--v1"
                                />
                                <span className="ml-1 text-sm">
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