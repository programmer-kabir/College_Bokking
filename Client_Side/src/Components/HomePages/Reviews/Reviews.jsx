import React, { useState, useEffect } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import "@smastrom/react-rating/style.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import ReviewsCard from "./ReviewsCard";
import Content from "../../Content/Content";

const Reviews = () => {
  const [testimonials, setTestimonials] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/review")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTestimonials(data);
      })
      .catch((error) =>
        console.error("Error fetching testimonial data:", error)
      );
  }, []);
  console.log(testimonials);
  const chunkArray = (arr, size) => {
    return arr.reduce(
      (acc, _, i) => (i % size ? acc : [...acc, arr.slice(i, i + size)]),
      []
    );
  };

  // Divide testimonials into chunks of 2
  const testimonialChunks = chunkArray(testimonials, 2);
  return (
    <Content>
      <div className="text-center">
        <p className="text-sm font-medium uppercase text-gray-500">Feedback</p>
        <p className="text-[#F50963] text-xl font-bold">
          What students and guardians say about colleges{" "}
        </p>
        <div className="flex items-center justify-center">
          <hr className="half-red-half-white h-1 w-96 " />
        </div>
      </div>
      <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
        {testimonialChunks.map((chunk, index) => (
          <SwiperSlide key={index}>
            <div className="py-10 px-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {chunk.map((data) => (
                  <ReviewsCard key={data.id} data={data} />
                ))}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Content>
  );
};

export default Reviews;
