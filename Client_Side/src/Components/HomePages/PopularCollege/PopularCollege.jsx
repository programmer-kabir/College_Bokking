import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaCalendar,
  FaBook,
  FaFlag,
  FaFutbol,
  FaUniversity,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Content from "../../Content/Content";
const PopularCollege = () => {
  const [collegesData, setCollegeData] = useState([]);
  useEffect(() => {
    fetch("/collegeData.json")
      .then((res) => res.json())
      .then((data) => setCollegeData(data));
  }, []);
  console.log(collegesData);
  return (
    <Content>
      <div className="text-center">
        <p className="text-sm font-medium uppercase text-gray-500">
          Most popular Colleges
        </p>
        <p className="text-[#F50963] text-xl font-bold">
          Most popular colleges in Bangladesh
        </p>
        <div className="flex items-center justify-center">
          <hr className="half-red-half-white h-1 w-96 " />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {collegesData.slice(0, 3).map((college, index) => (
          <motion.div
            key={index}
            initial="initial"
            animate="animate"
            className="rounded-lg p-4 border border-gray-300 my-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <img
                src={college.collegeImage}
                alt="College"
                className="w-full h-40 object-cover rounded-md hover:scale-x-105"
              />
              <h2 className="text-xl font-bold mt-4">{college.collegeName}</h2>
              <div className="flex items-center mt-2">
                <FaCalendar className="mr-2" />
                <p className="text-sm">
                  <span className="font-medium">Admission Dates:</span>{" "}
                  {college.admissionDates}
                </p>
              </div>
              <div className="flex items-center mt-2">
                <FaBook className="mr-2" />
                <p className="text-sm">
                  <span className="font-medium">Events:</span> {college.events}
                </p>
              </div>
              <div className="flex items-center mt-2">
                <FaFlag className="mr-2" size={37} />
                <p className="text-sm">
                  <span className="font-medium">Research History: </span>
                  {college.researchHistory}
                </p>
              </div>
              <div className="flex items-center mt-2">
                <FaFutbol className="mr-2" />
                <p className="text-sm">
                  <span className="font-medium">Sports: </span>
                  {college.sports.join(", ")}
                </p>
              </div>
            </div>
            <div className="mt-auto pt-5">
              <Link to={`/college-details/${college._id}`}>
                <button className="w-full bg-[#F50963] text-white font-semibold py-2 px-4 rounded-md flex items-center justify-center">
                  <FaArrowRight className="mr-2" /> Details
                </button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </Content>
  );
};

export default PopularCollege;
