import bgImge from "../../assets/banner-slide-1.jpg";
import React from "react";
import Slider from "react-slick";


function SimpleSlider() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 4000,
    cssEase: "linear",
    arrows:false,
    dotsClass: "slick-dots slick-thumb",
    customPaging: i => (
      <div
        style={{
          height:"10px",
          width:"10px",
          color: "gray",
          border: "1px gray solid",
          borderRadius: "50%",
          backgroundColor:"gray"
          
        }}

      >
        {}
      </div>
    )
    
  };
  return (
    <div className="w-full h-80 flex items-center" style={{backgroundImage:`url(${bgImge})` ,backgroundPosition:"center",backgroundSize:"cover"}}>
    <div className="slider-container  md:w-1/2 w-full    mx-auto  ">
      <Slider {...settings}>
        <div>
         <div className="content text-neutral-800 text-center flex flex-col gap-3">
          <span className="text-sm font-semibold">The Chloe Collection</span>
          <h1 className="uppercase text-4xl my-4 ">The Project Jacket</h1>
          <a href="#" className="font-bold mb-10  relative py-[2px] after:content-['']  after:absolute after:h-[2px] after:bg-red-700 after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 after:w-20  after:rounded-sm   ">Shop Now</a>
         </div>
        </div>
        <div>
         <div className="content text-neutral-800 text-center flex flex-col gap-3">
          <span className="text-sm font-semibold">The Chloe Collection</span>
          <h1 className="uppercase text-4xl my-4 ">The Project Jacket</h1>
          <a href="#" className="font-bold mb-10  relative py-[2px] after:content-['']  after:absolute after:h-[2px] after:bg-red-700 after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 after:w-20  after:rounded-sm   ">Shop Now</a>
         </div>
        </div>
        <div>
         <div className="content text-neutral-800 text-center flex flex-col gap-3">
          <span className="text-sm font-semibold">The Chloe Collection</span>
          <h1 className="uppercase text-4xl my-4 ">The Project Jacket</h1>
          <a href="#" className="font-bold mb-10  relative py-[2px] after:content-['']  after:absolute after:h-[2px] after:bg-red-700 after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 after:w-20  after:rounded-sm   ">Shop Now</a>
         </div>
        </div>
       
        
      </Slider>
    </div>
    </div>
  );
}

export default SimpleSlider;