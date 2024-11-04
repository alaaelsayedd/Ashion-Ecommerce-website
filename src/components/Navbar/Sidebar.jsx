import { useEffect, useRef } from "react";
import logo from "../../assets/logo.png";
import "./navbar.css";
function Sidebar({ setShowSlide }) {
  const containerDiv = useRef(null);
  function closeSidebar() {
    let divWidth = containerDiv.current.offsetWidth;
    containerDiv.current.style.left = `-${divWidth}px`;
    setTimeout(() => {
        setShowSlide(false);
      }, 600);
    
  }
  function animateDiv() {
    let divWidth = containerDiv.current.offsetWidth;
    containerDiv.current.style.left = `-${divWidth}px`;
    setTimeout(() => {
      containerDiv.current.style.left = `0px`;
    }, 2);
  }
  useEffect(()=>{
    animateDiv();
  },[])



  return (
    <>
      <div className="absolute left-0 bottom-0 right-0 top-0 bg-black bg-opacity-10 z-10 lg:hidden ">
        <div
          className=" w-4/6 sm:w-1/2   bg-white fixed top-0 bottom-0 p-5  transition-all duration-500 "
          ref={containerDiv}
        >
          <div className="close-icon   flex justify-end my-2 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-8  cursor-pointer  "
              onClick={closeSidebar}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
          <div className="icons flex gap-5 justify-center my-7">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </div>
          <div className="logo  ">
            <img src={logo} alt="logo" />
          </div>
          <ul
            className={`  list-none  gap-3  items-baseline flex-col flex  my-5 `}
          >
            <li className={` text-neutral-800   font-medium`}>
              <a href="#">HOME</a>
            </li>
            <li className={` text-neutral-800   font-medium`}>
              <a href="#">Women’s</a>
            </li>
            <li className={` text-neutral-800   font-medium`}>
              <a href="#">Men’s</a>
            </li>
            <li className={` text-neutral-800   font-medium`}>
              <a href="#">Shop</a>
            </li>

            <li className={` text-neutral-800   font-medium`}>
              <a href="#">Conatct</a>
            </li>
            <li
              className={` text-neutral-800  relative  font-medium dropdown `}
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
          <div className="auth text-neutral-600   font-medium absolute bottom-4">
            <a href="#">Login</a> / <a href="#"> Signup</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
