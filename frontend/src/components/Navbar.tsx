import { useState, useEffect } from "react";

function Navbar() {
  const [isNavbarToggleActive, setIsNavbarToggleActive] = useState(false);
  const [isSearchbarToggleActive, setIsSearchbarToggleActive] = useState(false);

  const navbarDropdown = () => {
    setIsNavbarToggleActive((prev) => !prev);
  };

  const searchbarDropdown = () => {
    setIsSearchbarToggleActive((prev) => !prev);
  };

  useEffect(() => {
    if (isNavbarToggleActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isNavbarToggleActive]);

  return (
    <>
      <nav className="bg-white fixed left-0 right-0 top-0">
        <div className="border border-b-black-100">
          <div className="m-4 flex flex-row ">
            <div className="flex basis-1/2 md:basis-1/3 items-center">
              {/* navbar dropdown */}
              <div
                className="p-2 hover:bg-gray-100 cursor-pointer rounded"
                onClick={navbarDropdown}
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </div>
              <img className="w-9 h-9 ml-2" src="https://img.icons8.com/ios-filled/50/228BE6/shop-local.png" alt="shop-local"/>
              <span className="text-blue-500 font-bold mx-2">
                DummyShop
              </span>
            </div>

            <div className="basis-1/3 items-center hidden md:flex">
              <div className="flex items-center w-full">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400 absolute mx-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>

                <input
                  type="text"
                  className="w-full bg-gray-100 p-1 border-2 border-gray-100 focus:border-blue-500 focus:outline-none rounded pl-11 p-1 h-9 transition duration-200 ease-in-out"
                  placeholder="Search.."
                />
              </div>
            </div>

            <div className="flex basis-1/2 md:basis-1/3 flex-row-reverse items-center">
              <div className="p-2 hover:bg-gray-100 cursor-pointer rounded">
                <img
                  className="w-5 h-5"
                  src="https://img.icons8.com/ios/50/user-male-circle--v1.png"
                  alt="user-male-circle--v1"
                />
              </div>
              <div className="p-2 hover:bg-gray-100 cursor-pointer rounded">
                <img
                  className="w-5 h-5"
                  src="https://img.icons8.com/pulsar-line/48/shopping-cart.png"
                  alt="shopping-cart"
                />
              </div>
              <div
                className="p-2 hover:bg-gray-100 cursor-pointer rounded block md:hidden"
                onClick={searchbarDropdown}
              >
                <svg
                  className="w-4 h-4 text-gray-800 dark:text-gray-800"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        { isSearchbarToggleActive && (
        <div className="flex block md:hidden">
          <div className="flex items-center w-full">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400 absolute mx-7"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>

                <input
                  type="text"
                  className="w-full m-3 bg-gray-100 border-2 border-gray-100 focus:border-blue-500 focus:outline-none rounded pl-11 p-1 h-9 transition duration-200 ease-in-out"
                  placeholder="Search.."
                />
              </div>
        </div>
      )}
      </nav>
      {isNavbarToggleActive && (
        <div className="flex bg-black bg-opacity-20 fixed bottom-0 top-0 left-0 right-0">
          <div className="basis-1/2 md:basis-1/3 bg-white">

            <div className="flex items-center mb-3 border border-t-white border-x-white border-b-black-100 pb-4 mr-4 mb-4 mt-5 ml-4">
              <div
                className="p-2 hover:bg-gray-100 cursor-pointer rounded"
                onClick={navbarDropdown}
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </div>
              <img className="w-9 h-9 ml-2" src="https://img.icons8.com/ios-filled/50/228BE6/shop-local.png" alt="shop-local"/>
              <span className="text-blue-500 font-bold mx-2">
                DummyShop
              </span>
            </div>
            <ul className="items-center ml-4 mr-4 overflow-y-auto h-full">
            
              <li>
                <a
                  href=""
                  className="flex px-2 pt-4 pb-4 hover:rounded cursor-pointer hover:bg-gray-100"
                >
                  <img
                    className="w-6 h-6"
                    src="https://img.icons8.com/ios/50/market-square.png"
                    alt="market-square"
                  />
                  <span className="ml-4 text-gray-700">My Product</span>
                </a>
              </li>
              <li>
                <a
                  href=""
                  className="flex px-2 pt-4 pb-4 hover:rounded cursor-pointer hover:bg-gray-100"
                >
                  <img
                    className="w-6 h-6"
                    src="https://img.icons8.com/pastel-glyph/50/transaction-list--v5.png"
                    alt="transaction-list--v5"
                  />
                  <span className="ml-4 text-gray-700">Transaction</span>
                </a>
              </li>
              <li>
                <a
                  href=""
                  className="flex px-2 pt-4 pb-4 hover:rounded cursor-pointer hover:bg-gray-100"
                >
                  <img
                    className="w-6 h-6"
                    src="https://img.icons8.com/ios/50/time-machine--v1.png"
                    alt="time-machine--v1"
                  />
                  <span className="ml-4 text-gray-700">History</span>
                </a>
              </li>
              <li>
                <a
                  href=""
                  className="flex px-2 pt-4 pb-4 hover:rounded cursor-pointer hover:bg-gray-100"
                >
                  <img
                    className="w-6 h-6"
                    src="https://img.icons8.com/ios/50/help.png"
                    alt="help"
                  />
                  <span className="ml-4 text-gray-700">Help</span>
                </a>
              </li>
              <li>
                <a
                  href=""
                  className="flex px-2 pt-4 pb-4 hover:rounded cursor-pointer hover:bg-gray-100"
                >
                  <img
                    className="w-6 h-6"
                    src="https://img.icons8.com/ios/50/settings--v1.png"
                    alt="settings--v1"
                  />
                  <span className="ml-4 text-gray-700">Setting</span>
                </a>
              </li>
            </ul>
          </div>
          <div
            className="basis-1/2  md:basis-2/3"
            onClick={navbarDropdown}
          ></div>
        </div>
      )}

      
    </>
  );
}

export default Navbar;
