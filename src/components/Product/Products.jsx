import { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";

import Loading from "../Loading/Loading";

function Products({
  products,
  categories,
  getCategoryProduct,
  getProduct,
  loadingProduct,
  isFading,
}) {
  const [selecttab, setSelectTab] = useState("all");
  const componentRef = useRef(null);
  function displayCtaegoryExist() {
    let categoriesExist = categories.filter(
      (category) =>
        category.name == "Men's Fashion" ||
        category.name == "Women's Fashion" ||
        category.name == "Electronics"
    );

    return categoriesExist;
  }
  useEffect(() => {
    if (componentRef.current && loadingProduct) {
      componentRef.current.scrollIntoView({ behavior: "auto", block: "start" });
    }
  }, [loadingProduct]);

  return (
    <>
      <div className="my-12  w-full  md:w-4/5 mx-auto p-2 " ref={componentRef}>
        <div className=" md:flex justify-between items-baseline  ">
          <h2 className="text-2xl mb-8 font-medium uppercase relative head  ">
            New Products
          </h2>
          <nav>
            <ul className="flex gap-10  font-semibold text-sm nav-tab my-3 md:my-0">
              <li
                className={`cursor-pointer ${
                  selecttab == "all" &&
                  "after:content-['']  relative after:absolute after:h-[2px] after:bg-red-700 after:bottom-0 after:left-0 after:right-0  after:rounded-sm "
                }`}
                onClick={() => {
                  getProduct();
                  setSelectTab("all");
                }}
              >
                All
              </li>
              {displayCtaegoryExist().map((category, key) => (
                <li
                  className={`cursor-pointer ${
                    selecttab == category.name &&
                    "after:content-['']  relative after:absolute after:h-[2px] after:bg-red-700 after:bottom-0 after:left-0 after:right-0  after:rounded-sm  "
                  }`}
                  key={key}
                  onClick={() => {
                    getCategoryProduct(category._id);
                    setSelectTab(category.name);
                  }}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </nav>
        </div>
        {loadingProduct ? (
          <div
            className={`container h-72 flex justify-center items-center transition duration-300  transform ${
              !isFading ? "opacity-0 scale-0 " : "opacity-100  scale-75"
            }`}
          >
            <Loading />
          </div>
        ) : (
          <div className="container grid-cols-2 grid   md:grid-cols-3  lg:grid-cols-4  gap-x-5 gap-y-6 items-baseline">
            {products?.map((product, index) => {
              return <ProductCard product={product} key={index} />;
            })}

            {products == [] && (
              <p className="text-center text-xl py-5 font-bold">
                No Products Found
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Products;
