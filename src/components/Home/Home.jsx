import axios from "axios";
import Header from "./Header";
import "./home.css";
import { useEffect, useState } from "react";
import Products from "../Product/Products";
import Loading from "../Loading/Loading";
import SimpleSlider from "../Slider/Slider";

function Home() {
  const [product, setProduct] = useState([]);
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [currentpage, setCurrentPage] = useState("");
  const [pageNumber, setPageNumberPage] = useState("");
  const [categories, setCategoryData] = useState([]);
  const [isFading, setIsFading] = useState(true);
  const [loadingScreen, setLoadingScreen] = useState(false);
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
          className={`fixed top-0 left-0 right-0 bottom-0 bg-gray-100 flex justify-center items-center text-pink-600 transition   duration-1000 ${
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
        </>
      )}
      <SimpleSlider />
    </>
  );
}

export default Home;
