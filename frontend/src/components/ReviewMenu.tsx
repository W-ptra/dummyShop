interface ReviewInputProps {
    setReviewMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

function ReviewInput({setReviewMenu}: ReviewInputProps){

    const closeReviewMenu = () =>{
        setReviewMenu(false);
    }

    return (
        <div className="flex justify-center">
            <div className="fixed z-20 left-0 right-0 top-0 bottom-0 bg-black opacity-15">

            </div>
            <div className="flex flex-col justify-stretch bg-white rounded-lg z-30 fixed left-2 md:left-20 right-2 md:right-20 top-20 bottom-20">
                <div className="flex justify-center basis-3/5 bg-gray-100 rounded-t-lg items-center">
                    <img 
                        src="https://img.freepik.com/free-photo/rendering-bee-anime-character_23-2150963632.jpg" 
                        alt="" 
                        className="max-w-80 max-h-56"
                    />
                </div>
                <div className="flex flex-col basis-2/5 p-4 justify-between">
                    <div className="flex flex-col">
                        <label htmlFor="">Comment</label>                        
                        <textarea name="" id="" className="bg-gray-100 px-5 border-2 focus:border-blue-500 outline-none rounded-lg"></textarea>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="">Star</label>
                        <input type="number" min={1} max={5} className="bg-gray-100 px-5 border-2 focus:border-blue-500 outline-none rounded-md"/>
                    </div>
                    <div className="flex justify-center items-center gap-4 mt-2">
                        <button 
                            className="bg-red-500 hover:bg-red-400 text-white font-bold w-32 py-1.5 rounded-lg"
                            onClick={closeReviewMenu}    
                        >
                            Cancel
                        </button>
                        <button 
                            className="bg-blue-500 hover:bg-blue-400 text-white font-bold w-32 py-1.5 rounded-lg"
                            onClick={closeReviewMenu}    
                        >
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewInput;