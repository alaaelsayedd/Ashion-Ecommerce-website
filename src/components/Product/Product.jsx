import { useState } from "react";
import ProductCard from "./ProductCard";

function Product({ products, categories, getCategoryProduct, getProduct }) {
  const [selecttab, setSelectTab] = useState("all");
  function displayCtaegoryExist() {
    let categoriesExist = categories.filter(
      (category) =>
        category.name == "Men's Fashion" ||
        category.name == "Women's Fashion" ||
        category.name == "Electronics" 
       

       
    );
    
    return categoriesExist;
  }
  return (
    <>
      <div className="my-12  w-full  md:w-4/5 mx-auto p-2 ">
        <div className="flex justify-between items-baseline">
          <h2 className="text-2xl mb-8 font-medium uppercase relative py-2 after:content-['']  after:absolute after:h-1 after:bg-red-700 after:bottom-0 after:left-0 after:w-28 after:rounded-sm  ">
            New Products
          </h2>
          <nav>
            <ul className="flex gap-5  font-semibold  nav-tab">
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
              {displayCtaegoryExist().map((category) => (
                <li
                  className={`cursor-pointer ${
                    selecttab == category.name &&
                    "after:content-['']  relative after:absolute after:h-[2px] after:bg-red-700 after:bottom-0 after:left-0 after:right-0  after:rounded-sm  "
                  }`}
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

        <div className="container grid-cols-2 grid   md:grid-cols-3  lg:grid-cols-4  gap-x-5 gap-y-6 items-baseline">
          {products?.map((product, index) => {
            return (
              <ProductCard
                image={product.imageCover}
                title={product.title.split(' ').slice(0,8).join(" ")}
                price={product.price}
                rate={product.ratingsAverage}
                key={index}
                id={product.id}
              />
            );
          })}

          {products == [] && (
            <p className="text-center text-xl py-5 font-bold">
              No Products Found
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Product;
