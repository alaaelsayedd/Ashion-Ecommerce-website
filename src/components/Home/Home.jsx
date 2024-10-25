import axios, { all } from "axios";
import Header from "./Header";
import "./home.css";
import { useEffect, useState } from "react";
import Product from "../Product/Product";
function Home() {
  const [product, setProduct] = useState([]);
  const [currentpage, setCurrentPage] = useState("");
  const [pageNumber, setPageNumberPage] = useState("");
  const [categories, setCategoryData] = useState([]);
  const [allProduct, setAllProduct] = useState([]);
  async function getProduct(lmit = 10, page = 1) {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?page=${page}&limit=${lmit}`
    );
    setProduct(data.data);
    setCurrentPage(data.metadata.currentPage);
    setPageNumberPage(data.metadata.numberOfPages);
  }
  async function getCategories() {
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );

    setCategoryData(data.data);
  }

  async function getCategoryProduct(id) {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`
    );
    setProduct(data.data);
    setPageNumberPage(0);
  }
  function displayPageNumber() {
    let conatiner = [];
    for (let i = 1; i <= pageNumber; i++) {
      conatiner[conatiner.length] = i;
    }
    return conatiner;
  }
  function changePage(number) {
    getProduct(10, number);
  }

  useEffect(() => {
    getProduct();
    displayPageNumber();
    getCategories();
  }, []);
  return (
    <>
      <Header categories={categories} />
      <Product
        products={product}
        categories={categories}
        getCategoryProduct={getCategoryProduct}
        getProduct={getProduct}
      />
      <div className="text-center flex gap-5 justify-center  my-10 number-cont">
        {displayPageNumber()?.map((number,index) => {
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
  );
}

export default Home;
