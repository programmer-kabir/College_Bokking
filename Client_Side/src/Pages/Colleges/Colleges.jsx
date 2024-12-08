import React, { useEffect, useState } from "react";
import Content from "../../Components/Content/Content";
import Title from "../../Components/Title/Title";
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
const Colleges = () => {
  const [collegesData, setCollegeData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/collegeData")
      .then((res) => res.json())
      .then((data) => setCollegeData(data));
  }, []);
  return (
    <div className="pt-20">
      <Content>
        <Title
          title={"ALL Colleges List"}
          subtitle={"show more details in these colleges"}
        />
        
        <div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {collegesData.map((college, index) => (
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
                  <h2 className="text-xl font-bold mt-4">
                    {college.collegeName}
                  </h2>
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
                      <span className="font-medium">Events:</span>{" "}
                      {college.events}
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
        </div>
      </Content>
    </div>
  );
};

export default Colleges;
