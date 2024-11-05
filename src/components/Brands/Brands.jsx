import axios from "axios";
import { useEffect, useState } from "react";

function Brands() {
const [brands,setAllBrands]=useState([])
    async function getAllBrands()
  {
    let {data}=await axios.get("https://ecommerce.routemisr.com/api/v1/brands")
    setAllBrands(data.data)

  }
  useEffect(()=>{
     getAllBrands();
  },[])

    return ( 
        <div className="container mx-auto my-5 p-5">
              <h1 className="text-2xl uppercase  relative head">Brands </h1>
              <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8  gap-2">
              {brands.map((brand,index)=><div key={index}><img src={brand.image} alt={brand.name} className="w-full object-contain" /></div>)}
              </div>
        </div>
     );
}

export default Brands;