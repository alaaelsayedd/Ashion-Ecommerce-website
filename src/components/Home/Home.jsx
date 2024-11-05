import axios from "axios";
import Header from "./Header";
import "./home.css";
import { useEffect, useState } from "react";
import Products from "../Product/Products";
import Loading from "../Loading/Loading";
import SimpleSlider from "../Slider/Slider";
import shopImg from "../../assets/woman1.jpg";
import { Link } from "react-router-dom";

function Home() {
  const [product, setProduct] = useState([]);
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [currentpage, setCurrentPage] = useState("");
  const [pageNumber, setPageNumberPage] = useState("");
  const [categories, setCategoryData] = useState([]);
  const [isFading, setIsFading] = useState(true);
  const [loadingScreen, setLoadingScreen] = useState(false);
  const targetDate = new Date("2025-10-20T00:00:00"); // Replace with your target date in milliseconds

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  async function getProduct(lmit = 10, page = 1) {
    setIsFading(true);
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?page=${page}&limit=${lmit}`
    );
    setProduct(data.data);
    setCurrentPage(data.metadata.currentPage);
    setPageNumberPage(data.metadata.numberOfPages);
    setIsFading(false);
    setTimeout(() => setLoadingProduct(false), 300);
  }
  async function getCategories() {
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );

    setCategoryData(data.data);
    console.log(data.data);
   


  }

  async function getCategoryProduct(id) {
    setPageNumberPage(0);
    setIsFading(true);
    setLoadingProduct(true);
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`
    );
    setProduct(data.data);

    setIsFading(false);
    setTimeout(() => setLoadingProduct(false), 300);
  }
  function displayPageNumber() {
    let conatiner = [];
    for (let i = 1; i <= pageNumber; i++) {
      conatiner[conatiner.length] = i;
    }
    return conatiner;
  }
  function changePage(number) {
    setLoadingProduct(true);
    getProduct(10, number);
  }

  useEffect(() => {
    const countdown = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(countdown);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(countdown); // Cleanup on component unmount
  }, [targetDate]);

  useEffect(() => {
    setLoadingScreen(true);
    getProduct()
      .then(() => getCategories())
      .then(() => {
        displayPageNumber();
        setIsFading(false);
        setTimeout(() => setLoadingScreen(false), 1000);
      });
  }, []);
  return (
    <>
      <Header />
      {loadingScreen ? (
        <div
          className={`fixed top-0 left-0 right-0 bottom-0 z-50 bg-gray-100 flex justify-center items-center text-pink-600 transition   duration-1000 ${
            !isFading ? "opacity-0 " : "opacity-100 "
          }`}
        >
          <Loading />
        </div>
      ) : (
        <>
          <Products
            products={product}
            categories={categories}
            getCategoryProduct={getCategoryProduct}
            getProduct={getProduct}
            loadingProduct={loadingProduct}
            isFading={isFading}
          />
          <div className="text-center flex gap-5 justify-center  my-10 number-cont">
            {displayPageNumber()?.map((number, index) => {
              return (
                <span
                  className={
                    number == currentpage
                      ? "border  border-neutral-400 p-3  text-neutral-900 font-medium transform scale-110 transition-all duration-500 cursor-pointer"
                      : " text-neutral-700   border-neutral-400 border p-3 transform scale-95 transition-all duration-500 cursor-pointer shadow-sm hover:scale-105"
                  }
                  onClick={() => changePage(number)}
                  key={index}
                >
                  {number}
                </span>
              );
            })}
          </div>
          <SimpleSlider />
          <div className="services grid md:grid-cols-4 grid-cols-2  w-ful  lg:w-11/12 mx-auto md:p-10  gap-2 px-4  md:gap-5 mt-5  ">
            <div className="flex gap-5 text-neutral-800  items-center">
              <i className="fa fa-car text-red-700 text-3xl "></i>
              <span>
                <h2 className="md:text-base lg:text-lg  text-sm font-medium my-1">
                  Free Shipping
                </h2>
                <p className="text-xs text-neutral-700 ">
                  For all oder over $99
                </p>
              </span>
            </div>
            <div className="flex gap-5 text-neutral-800  items-center">
              <i className="fa fa-money-bill text-red-700 text-3xl "></i>
              <span>
                <h2 className="md:text-base lg:text-lg  text-sm font-medium my-1">
                  Money Back Guarantee
                </h2>
                <p className="text-xs text-neutral-700 ">
                  If good have Problems
                </p>
              </span>
            </div>
            <div className="flex gap-5 text-neutral-800  items-center">
              <i className=" fa-solid fa-phone text-red-700 text-3xl "></i>
              <span>
                <h2 className="md:text-base lg:text-lg  text-sm font-medium my-1">
                  Online Support 24/7
                </h2>
                <p className="text-xs text-neutral-700 ">Dedicated support</p>
              </span>
            </div>
            <div className="flex gap-5 text-neutral-800  items-center">
              <i className="fa fa-headphones text-red-700 text-3xl "></i>
              <span>
                <h2 className="md:text-base lg:text-lg  text-sm font-medium my-1">
                  Payment Secure
                </h2>
                <p className="text-xs text-neutral-700 ">100% secure payment</p>
              </span>
            </div>
          </div>
          <div className="mt-10 container mx-auto  flex flex-col md:flex-row  p-10 my-5">
            <div className="img md:w-1/2 w-full">
              <img
                src={shopImg}
                alt="shopImg"
                className="w-full object-cover h-full "
              />
            </div>
            <div className="bg-neutral-100 md:w-1/2  w-full text-center p-2 ">
              <div className="lg:my-12 my-5 relative flex justify-center text-center  h-48  ">
                <div className=" h-full w-48  rounded-full bg-gray-50 mx-auto    "></div>
                <div className="bg-transparent  absolute z-20 p-5 ">
                  <span className="text-xs font-bold uppercase">Discount</span>
                  <h3 className="text-4xl text-red-700 my-5">Summer 2024</h3>
                  <span className="font-bold uppercase">
                    Sale <span className="text-red-700">50%</span>{" "}
                  </span>
                </div>
              </div>
              <div className="  font-medium my-5 lg:text-xl  text-sm">
                <span className="mx-3 md:mx-2">
                  {timeLeft.days}{" "}
                  <span className="text-xs  lg:text-sm font-bold">Days</span>{" "}
                </span>
                <span className="mx-3  md:mx-2">
                  {timeLeft.hours}{" "}
                  <span className="text-xs lg:text-sm font-bold">Hours</span>
                </span>
                <span className="mx-3  md:mx-2">
                  {timeLeft.minutes}{" "}
                  <span className="text-xs lg:text-sm font-bold">Minutes</span>{" "}
                </span>
                <span className="mx-3  md:mx-2">
                  {timeLeft.seconds}{" "}
                  <span className="text-xs lg:text-sm font-bold">Seconds</span>
                </span>
              </div>
              <Link
                to={"/shop"}
                className="font-bold mb-10  cursor-pointer z-40 relative py-[2px] after:content-['']  after:absolute after:h-[2px] after:bg-red-700 after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 after:w-20  after:rounded-sm   "
              >
                Shop Now
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Home;
