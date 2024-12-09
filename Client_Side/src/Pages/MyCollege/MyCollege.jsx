import React, { useEffect, useState } from "react";
import useAuth from "../../Components/Hooks/useAuth";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link } from "react-router";
import Content from "../../Components/Content/Content";
import axios from "axios";

const MyCollege = () => {
  const {user,loading} = useAuth()
  console.log(user.email);
  const [selectCollege, setSelectCollege] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3000/Candidate?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setSelectCollege(data));
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const handleData = (booking) => (event) => {
    event.preventDefault();

    const comment = event.target.elements.comment.value;
const rating = event.target.rating.value
    const data = {
      comment,
      rating,
      collegeName: booking.collegeName,
      email: booking.email,
      name: booking.name,
      photo: user?.photoURL,
    };
axios.post('http://localhost:3000/review',data)
   
      .then((data) => {
        console.log(data);
        if (data.data.insertedId) {
          // reset()
          setReviewSubmitted(true);
          toast.success("review successfully");
        }
      });
  };
  return (
    <div className="pt-20">
    <Content>
  {selectCollege.length===0 ? <p>NO College Added</p>:selectCollege.map((booking, index) => (
          <div key={booking._id} className="pt-5">
            <div className="border-pink-600 border-2 rounded-md">
              <div className="px-2 py-3 ">
                <img
                  className="md:h-60 w-full rounded-md"
                  src={booking?.collegeImage}
                  alt=""
                />
                <h2 className="pt-2">
                  <span className="font-semibold pr-2"> College Name:</span>
                  {booking?.collegeName}
                </h2>
                <h2 className="pt-2 ">
                  <span className="font-semibold pr-2"> College Website:</span>
                  <Link to={booking?.collegeWebsite}>{booking?.collegeWebsite}</Link>
                </h2>
                <h2 className="pt-2">
                  <span className="font-semibold pr-2"> Email:</span>
                  {booking?.email}
                </h2>
                <form onSubmit={handleData(booking)}>
                <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="review"
          >
            Review
          </label>
          <textarea
                    rows="4"
                    className="border-gray-300 border-2 rounded-md px-2 py-1 outline-none"
                    placeholder="Your Review"
                    cols="40"
                    name="comment"
                    disabled={reviewSubmitted}
                  ></textarea>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="rating"
          >
            Rating
          </label>
         <input type="number" name="rating" id=""                    className="border-gray-300 border-2 rounded-md px-2 py-1 outline-none"
 />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit Review
          </button>
        </div>
                  
                  {/* <button disabled={reviewSubmitted} className="bg-pink-600 rounded-md px-2 py-1 ml-5">
                    Submit
                  </button> */}
                </form>
              </div>
            </div>
          </div>
        ))}
    </Content>
      </div>
  );
};

export default MyCollege;
