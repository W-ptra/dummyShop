function ReviewInput(){
    return (
        <div className="flex justify-center">
            <div className="fixed z-20 left-0 right-0 top-0 bottom-0 bg-black opacity-15">

            </div>
            <div className="flex justify-stretch bg-white rounded-lg p-52 z-30 fixed left-20 right-20 top-20 bottom-20">
                <div className="basis-1/5">
                    <img src="" alt="" />
                </div>
                <div className="flex basis-4/5">
                    <div className="flex flex-col">
                        <label htmlFor="">Comment</label>
                        <input type="text" className="bg-gray-100"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewInput;