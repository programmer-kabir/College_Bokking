import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Components/Hooks/useAuth";
import toast from "react-hot-toast";
import axios from "axios";
import { useLoaderData, useNavigate } from "react-router";
const AdmissionForm = () => {
  const data = useLoaderData();
const navigate = useNavigate()
  const clgData = {
    collegeId: data._id,
    collegeName: data.collegeName,
    collegeImage: data.collegeImage,
    collegeWebsite: data.admissionWebsite,
  };
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("Select a Subject");

  const subjects = ["Mathematics", "Science", "History"];

  const handleSelect = (subject) => {
    setSelectedSubject(subject);
    setIsOpen(false);
  };
  const url =
    "https://api.imgbb.com/1/upload?key=f1e08dc7c44c396aa409d50dfcc797da";
  const onSubmit = (data) => {
    if (selectedSubject === "Select a Subject") {
      toast.error("Subject not selected");
      return;
    }

    const image = data.image[0];
    console.log(image);
    if (image) {
      const formData = new FormData();
      formData.append("image", image);
      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((image) => {
          const photo = image?.data?.display_url;
          const finalData = {
            ...clgData,
            ...data,
            photo,
          };
          delete finalData.image;
          console.log(finalData);

          axios
            .post("http://localhost:3000/Candidate",  finalData )
            .then((res) => {
              console.log(res.data);
              
              if (res.data.insertedId) {
                toast.success("Your College is Added");
                navigate("/myCollege")
              } 
              else if(res.data.message === "College already exist"){
                toast.error("College already exist")
              }
              toast.error(res.data.message)
            });
        });
    }
    // axios.post("/Candidate", {...clgData, data }).the((response) => {
    //   console.log(response.data);
    // });
  };
  return (
    <div className="w-1/2 pt-20  mx-auto ">
      <h2 className="text-center text-2xl font-bold pb-5">
        {" "}
        Application Form{" "}
      </h2>
      {/* form ar kaj baj  */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 border px-2 py-3 rounded-md"
      >
        {/* Name */}
        <div className="">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-1"
          >
            Candidate Name
          </label>
          <input
            type="name"
            defaultValue={user?.displayName}
            id="name"
            {...register("name", {
              required: "name is required",
            })}
            className={`w-full px-3 py-2 rounded border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-blue-500`}
          />
          {errors.name && (
            <span role="alert" className="text-red-500 text-xs">
              {errors.name.message}
            </span>
          )}
        </div>
        {/* Email */}
        <div className="">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-1"
          >
            Candidate Email
          </label>
          <input
            type="email"
            defaultValue={user?.email}
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            className={`w-full px-3 py-2 rounded border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-blue-500`}
          />
          {errors.email && (
            <span role="alert" className="text-red-500 text-xs">
              {errors.email.message}
            </span>
          )}
        </div>

        {/* Subject */}
        <div className="text-left">
          <div className="">
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex justify-between w-full px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none"
            >
              {selectedSubject}
              <svg
                className="w-5 h-5 ml-2 -mr-1 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 111.08 1.04l-4.5 5a.75.75 0 01-1.08 0l-4.5-5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          {isOpen && (
            <div className="absolute z-10  mt-2  origin-top-right bg-white border border-gray-300 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {subjects.map((subject) => (
                  <div
                    key={subject}
                    onClick={() => handleSelect(subject)}
                    className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100"
                  >
                    {subject}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Number */}
        <div className="">
          <label
            htmlFor="number"
            className="block text-gray-700 text-sm font-bold mb-1"
          >
            Candidate Number
          </label>
          <input
            type="number"
            id="number"
            {...register("number", {
              required: "Number is required",
            })}
            className={`w-full px-3 py-2 rounded border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-blue-500`}
          />
          {errors.number && (
            <span role="alert" className="text-red-500 text-xs">
              {errors.number.message}
            </span>
          )}
        </div>

        {/* Address */}
        <div className="">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-1"
          >
            Candidate Address
          </label>
          <input
            type="text"
            id="address"
            {...register("address", {
              required: "Address is required",
            })}
            className={`w-full px-3 py-2 rounded border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-blue-500`}
          />
          {errors.address && (
            <span role="alert" className="text-red-500 text-xs">
              {errors.address.message}
            </span>
          )}
        </div>

        {/* Images */}
        <div className="mb-2">
          <label
            htmlFor="photoUrl"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Images
          </label>
          <input
            type="file"
            id="image"
            {...register("image", {
              required: "Image is required",
            })}
            className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-blue-500"
          />
          {errors.image && (
            <span role="alert" className="text-red-500 text-xs">
              {errors.image.message}
            </span>
          )}
        </div>

        <div className="flex justify-center">
          <button className="w-full bg-[#F50963] py-2 rounded-md">
            {" "}
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdmissionForm;
