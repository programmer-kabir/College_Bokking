import React from "react";
import Content from "../../Content/Content";

const CollegeGallery = () => {
  return (
    <Content>
     <div className="text-center">
        <p className="text-sm font-medium uppercase text-gray-500">Gallery</p>
        <p className="text-[#F50963] text-xl font-bold">
        Graduates photo gallery of some colleges
        </p>
        <div className="flex items-center justify-center">
          <hr className="half-red-half-white h-1 w-96 " />
        </div>
      </div>
     <section className="md:flex flex-row-reverse  gap-5 items-center justify-center pt-10">
 {/* Right Side: Full Height Image */}
 <div className="md:w-1/2 h-[400px] ">
    <img
      alt=""
      className="w-full h-full object-cover rounded shadow-sm"
      src="https://i.ibb.co/djVGcKs/group-transformed.jpg"
    />
  </div>
  <div className="md:w-1/2 h-[400px] grid grid-cols-2 grid-rows-2 gap-5  pt-7 md:pt-0">
    <img
      alt=""
      className="w-full h-full object-cover rounded shadow-sm"
      src="https://i.ibb.co/6sKd19G/images.jpg"
    />
    <img
      alt=""
      className="w-full h-full object-cover rounded shadow-sm"
      src="https://i.ibb.co/bgKst37/download.jpg"
    />
    <img
      alt=""
      className="w-full h-full object-cover rounded shadow-sm"
      src="https://i.ibb.co/v41L3tP/download-1.jpg"
    />
    <img
      alt=""
      className="w-full h-full object-cover rounded shadow-sm"
      src="https://i.ibb.co/qNm2kg7/images-1.jpg"
    />
  </div>

 
</section>

     <section className="md:flex flex-row-reverse  gap-5 items-center justify-center md:pt-7 pt-0">
	 <div className="md:w-1/2 h-[400px] grid grid-cols-2 grid-rows-2 gap-5  pt-7 md:pt-0">
    <img
      alt=""
      className="w-full h-full object-cover rounded shadow-sm"
      src="https://i.ibb.co/ZXDyyRj/download-2.jpg"
    />
    <img
      alt=""
      className="w-full h-full object-cover rounded shadow-sm"
      src="https://i.ibb.co/Yt2jkWc/download-3.jpg"
    />
    <img
      alt=""
      className="w-full h-full object-cover rounded shadow-sm"
      src="https://i.ibb.co/sJ56vN1/download-4.jpg"
    />
    <img
      alt=""
      className="w-full h-full object-cover rounded shadow-sm"
      src="https://i.ibb.co/VJQs5GV/download-5.jpg"
    />
  </div>
 <div className="md:w-1/2 h-[400px] pt-7 md:pt-0">
    <img
      alt=""
      className="w-full h-full object-cover rounded shadow-sm"
      src="https://i.ibb.co.com/6FDwGsd/group2-transformed.jpg"
    />
  </div>
  

 
</section>

    </Content>
  );
};

export default CollegeGallery;
