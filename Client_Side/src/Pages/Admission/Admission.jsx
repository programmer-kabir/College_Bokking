import React, { useEffect, useState } from "react";
import Title from "../../Components/Title/Title";
import { Link } from "react-router";
import Content from "../../Components/Content/Content";

const Admission = () => {
  const [collegesData, setCollegeData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/collegeData")
      .then((res) => res.json())
      .then((data) => setCollegeData(data));
  }, []);
  return (
    <div className="pt-20">
      <Title
        title={"ALL Colleges"}
        subtitle={"Pick a College to get started your study"}
      />
      <Content>
        <div className="grid grid-cols-3 gap-2">
          {/* Map through the list of colleges and attach the click event */}
          {collegesData.map((college) => (
            <div key={college._id} className="border">
              <Link to={`/admission-form/${college._id}`}>
                <div className="bg-base-100 ">
                  <figure>
                    <img
                      className="h-56 w-full"
                      src={college.collegeImage}
                      alt="Shoes"
                    />
                  </figure>
                  <div className="flex flex-col items-start px-2 py-2">
                    <div className="">
                      <p className="text-xl font-semibold mt-2">
                        {college.collegeName}
                      </p>
                      <p className="text-sm font-bold">{college.location}</p>
                    </div>
                    <button className=" pt-5  font-medium underline text-[#398EFA] ] text-sm">
                      Get Admission
                    </button>
                  </div>
                </div>
              </Link>{" "}
            </div>
          ))}
        </div>
      </Content>
    </div>
  );
};

export default Admission;
