import { Truncet } from "../utils/Truncet";

interface Seller {
    id: number;
    image: string;
    name: string;
}

interface Product {
    id: number;
    name: string;
    description: string;
    image: string;
    seller: Seller;
    price: number;
    star: number;
    sold: number;
}
interface CardProperty {
    productList: Product[];
    newCard? : boolean;
}

function Card({ productList, newCard }: CardProperty) {
    return (
        <div className="flex w-full items-center justify-center">
            <div className="grid mx-2 md:mx-20 grid-cols-2 md:grid-cols-5 gap-1 md:gap-7 gap-y-5 m-5" >
                
                {newCard && (
                    <a href="/create-product">
                        <div className="bg-gray-100 hover:bg-gray-50 rounded-xl py-[5.5rem] flex flex-col justify-center items-center cursor-pointer">
                            <img 
                                className="w-16 h-16" 
                                src="https://img.icons8.com/external-glyph-silhouettes-icons-papa-vector/78/9ca3af/external-Plus-interface-glyph-silhouettes-icons-papa-vector.png" 
                                alt="external-Plus-interface-glyph-silhouettes-icons-papa-vector"
                            />
                            <h4 className="text-gray-500 font-extrabold">Add Product</h4>
                        </div>
                    </a>                    
                )}
                
                {productList.map((product) => (
                    <a href={`/product/${product.id}`} key={product.id}>
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
                                    {Truncet(product.name,20)}
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
                                
                                <p className="flex items-center" key={product.seller.id}>
                                    <img
                                        className="w-8 h-8 cursor-pointer rounded-full"
                                        src={product.seller.image}
                                        alt="user-male-circle--v1"
                                    />
                                    <span className="ml-1 text-base cursor-pointer font-bold">
                                        {Truncet(product.seller.name,15)}
                                    </span>
                                </p>
                            </div>

                        </div>
                    </a>
                ))}
            </div>
        </div>
    )
}

export default Card