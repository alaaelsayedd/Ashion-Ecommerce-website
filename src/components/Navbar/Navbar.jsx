import { useContext, useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import "./navbar.css";
import Sidebar from "./Sidebar";
import { Link, NavLink } from "react-router-dom";
import { authContext } from "../../Context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { getUserCartProduct, setCartCount } from "../../Redux/cartSlice";
import { getUserWishListProduct } from "../../Redux/wishlistSlice";
const navigation = [
  { name: "Home", href: "/" },
  { name: "Women’s", href: "womarn" },
  { name: "Men’s", href: "men" },
  { name: "Shop", href: "shop" },
  { name: "Conatct", href: "conatct" },
];

function Navbar() {
  const { isLogggedin, setLoginState } = useContext(authContext);
  let {cartCount}=useSelector(store=>store.cart)
  let {wishlistCount}=useSelector(store=>store.wishlist)
  let dispatch = useDispatch()
  const [showSlide, setShowSlide] = useState(false);
  const userDate = JSON.parse(localStorage.getItem("userData"));
  // console.log(userDate);

  function openSidebar() {
    setShowSlide(true);
  }
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setLoginState(false); 
  }
  useEffect(()=>{
    dispatch(getUserCartProduct())
    dispatch(getUserWishListProduct())
  },[])

  return (
    <>
      <nav className=" px-10 py-7 flex  gap-10 justify-between  border-b shadow-md ">
        <div className="logo ">
          <Link to={"/"}>
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <button className="md:hidden" onClick={openSidebar}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
        </button>
        <ul className={`  list-none  gap-6 items-baseline fl hidden md:flex `}>
          {navigation.map((navItem ,index) => {
            return (
              <li className={`link text-neutral-800   font-medium`} key={index}>
                <NavLink to={navItem.href}>{navItem.name}</NavLink>
              </li>
            );
          })}

          <li
            className={`link text-neutral-800  relative  font-medium  dropdown`}
          >
            <a href="#">Pages</a>
            <ul className="absolute flex flex-col gap-2  left-0  bg-neutral-900 bg-opacity-80 text-sm  rounded-sm  text-white">
              <li className="border-b border-neutral-800 px-5 pt-2 pb-1 ">
                <a href="#">ProductCart</a>
              </li>
              <li className="border-b border-neutral-800  px-5 py-1">
                <a href="#">ProductDetails</a>
              </li>
              <li className=" px-5 py-1 pb-2">
                <a href="#">Orders</a>
              </li>
            </ul>
          </li>
        </ul>
        <div className=" hidden md:flex gap-3 items-center">
          <div className="auth text-neutral-600 text-sm ">
            {!isLogggedin ? (
              <>
                {" "}
                <NavLink
                  to={"login"}
                  className={({ isActive, isPending }) =>
                    isPending ? "  " : isActive ? " font-bold " : ""
                  }
                >
                  Login
                </NavLink>
                /
                <NavLink
                  to={"signup"}
                  className={({ isActive, isPending }) =>
                    isPending ? "" : isActive ? " font-bold " : ""
                  }
                >
                  Signup
                </NavLink>
              </>
            ) : (
              <>
                {" "}
                <div onClick={logout} className="cursor-pointer">
                  Logout
                </div>
              </>
            )}
          </div>
          <div className="icons flex gap-3 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            <Link to={'/wishlist'} className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 cart "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            
            </svg>
            <div className="bg-neutral-900 text-white h-5 w-5 text-center rounded-full absolute -right-2 -top-1/2 text-sm  ">{wishlistCount}</div>
            </Link>
          
            <Link to={'/cart'} className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6  "
            
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
            <div className="bg-neutral-900 text-white h-5 w-5 text-center rounded-full absolute -right-2 -top-1/2 text-sm ">{cartCount}</div>
            </Link>
          </div>
        </div>
      </nav>
      {showSlide && <Sidebar setShowSlide={setShowSlide} />}
    </>
  );
}

export default Navbar;
