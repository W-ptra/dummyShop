import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import ProfileMenu from "./ProfileMenu";
import CartMenu from "./CartMenu";

interface SearchParams {
  searchParams?: string;
}

type ProductCart = {
  id: number,
  name: string,
  price: number,
  image: string,
  quantity: number
}

function Navbar({ searchParams }: SearchParams) {
  const [isNavbarToggleActive, setIsNavbarToggleActive] = useState(false);
  const [isSearchbarToggleActive, setIsSearchbarToggleActive] = useState(false);
  const [isCartToggleActive, setIsCartToggleActive] = useState(false);
  const [isProfileToggleActive, setIsProfileToggleActive] = useState(false);
  const [searchName, setSearchName] = useState(searchParams);
  const [cart, setCart] = useState<ProductCart[]>([]);
  const [cartLength,setCartLength] = useState(0);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const navbarDropdown = () => {
    setIsNavbarToggleActive((prev) => !prev);
  };

  const searchbarDropdown = () => {
    setIsSearchbarToggleActive((prev) => !prev);
  };

  const profileMenuDropdown = () => {
    if (isCartToggleActive) {
      setIsCartToggleActive(false);
    }
    setIsProfileToggleActive((prev) => !prev);
  };

  const cartMenuDropdown = async () => {
    if (isSearchbarToggleActive) {
      setIsSearchbarToggleActive(false);
    }
    const fetchData = async () => {
      try {
        const data = {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }

        const request = await fetch(`/api/cart/first4`, data);
        const respond = await request.json();
        setCart(respond.carts);
        console.log(respond);
      } catch (err: any) {
        console.log(err);
      }
    };
    fetchData();
    setIsCartToggleActive((prev) => !prev);
  }

  const setSearchNameValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(event.target.value)
  }

  const searching = (event: React.KeyboardEvent<HTMLInputElement>) => {

    if (event.key == "Enter" && searchName) {
      navigate(`/search?query=${searchName}`);
      window.location.reload();
    }
  }

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

  useEffect(()=>{
    const fetchData = async () => {
      if(localStorage.getItem("token")){
        try {
          const data = {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          }
  
          const request = await fetch(`/api/cart/length`, data);
          const respond = await request.json();
          setCartLength(respond.length);
          console.log(respond);
        } catch (err: any) {
          console.log(err);
        }
      }
    };
    fetchData();
  },[])

  return (
    <>
      <nav className="bg-white fixed left-0 right-0 top-0 z-10">
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

              <a href="/" className="flex items-center justify-center">
                <img className="w-9 h-9 ml-2" src="https://img.icons8.com/ios-filled/50/228BE6/shop-local.png" alt="shop-local" />
                <span className="text-blue-500 font-bold mx-2">
                  DummyShop
                </span>
              </a>
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
                  className="w-full bg-gray-100 border-2 border-gray-100 focus:border-blue-500 focus:outline-none rounded pl-11 p-1 h-9 transition duration-200 ease-in-out"
                  value={searchName}
                  onChange={setSearchNameValue}
                  onKeyDown={searching}

                  placeholder="Search.."
                />
              </div>
            </div>

            <div className="flex basis-1/2 md:basis-1/3 flex-row-reverse items-center">
              <div className="p-2 hover:bg-gray-100 cursor-pointer rounded"
                onClick={profileMenuDropdown}
              >
                <img
                  className="w-5 h-5"
                  src="https://img.icons8.com/ios/50/user-male-circle--v1.png"
                  alt="user-male-circle--v1"
                />
              </div>
              {role === "buyer" && (
                <div className="p-2 hover:bg-gray-100 cursor-pointer rounded relative"
                  onClick={cartMenuDropdown}
                >
                  <img
                    className="w-5 h-5"
                    src="https://img.icons8.com/pulsar-line/48/shopping-cart.png"
                    alt="shopping-cart"
                  />
                  {cartLength !== 0 && (
                    <div className=" flex absolute top-0 right-0 w-5 h-4 rounded-full bg-black text-white items-center justify-center">
                      
                      <span className="font-semibold text-xs">
                          {cartLength}
                        </span>
                    </div>                      
                  )}
                </div>
              )}

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
        {isSearchbarToggleActive && (
          <div className="flex md:hidden">
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
                value={searchName}
                onChange={setSearchNameValue}
                onKeyDown={searching}
                placeholder="Search.."
              />
            </div>
          </div>
        )}
      </nav>
      {isNavbarToggleActive && (
        <div className="flex bg-black bg-opacity-20 fixed bottom-0 top-0 left-0 right-0 z-20">
          <div className="basis-2/3 md:basis-1/3 lg:basis-1/4 bg-white">
            <div className="flex items-center border border-t-white border-x-white border-b-black-100 pb-4 mr-4 mb-4 mt-5 ml-4">
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
              <a className="flex items-center justify-center" href="/">
                <img className="w-9 h-9 ml-2" src="https://img.icons8.com/ios-filled/50/228BE6/shop-local.png" alt="shop-local" />
                <span className="text-blue-500 font-bold mx-2 text-base">
                  DummyShop
                </span>
              </a>
            </div>

            <ul className="items-center ml-4 mr-4 overflow-y-auto h-full">
              {role === "seller" && (
                <li>
                  <a
                    href="/my-product"
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
              )}

              <li>
                <a
                  href="/transaction"
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
                  href="/help"
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
                  href="/setting"
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
            className="basis-1/3  md:basis-2/3 lg:basis-3/4"
            onClick={navbarDropdown}
          ></div>
        </div>
      )}

      {isProfileToggleActive && (
        <ProfileMenu />
      )}

      {isCartToggleActive && (
        <CartMenu cartProducts={cart}/>
      )}
    </>
  );
}

export default Navbar;
