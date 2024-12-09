import React, { createContext, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { AuthContext } from "../../Provider/AuthProvider";
import { saveUser } from "../../Components/Utils/SaveUser";
import toast from "react-hot-toast";
import useAuth from "../../Components/Hooks/useAuth";

const Signup = () => {
  const { createUser, updateUserProfile, signInWithGoogle } = useAuth();
  // console.log(creat.eUser);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const handleGoogleSignIn = () => {
    setLoading(true);
    signInWithGoogle()
      .then((result) => {
        // console.log(result.user);
        // saveUser(result?.user);
        saveUser(result.user)
        Swal.fire({
          position: "top-middle",
          icon: "success",
          title: "User Logged in Successfully",

          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
      })
      .catch((err) => {
        // setLoading(false)
        // console.log(err.message);
        toast.error(err.message);
      });
  };
  const url =
    "https://api.imgbb.com/1/upload?key=f1e08dc7c44c396aa409d50dfcc797da";
  const onSubmit = (data) => {
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
          createUser(data.email, data.password).then((result) => {
            const loggedUser = result.user;

            updateUserProfile(data.name, photo)
              .then((result) => {
                saveUser(loggedUser);
              toast.success("User Create Successfully")
                navigate("/")
              })
              .catch((error) => toast.error(error.message));
          })
          .catch((error) => toast.error(error.message));
        });
    }
    // createUser(data.email, data.password).then((result) => {
    //   const loggedUser = result.user;
    //   // console.log(loggedUser);
    //   // console.log(data);

    //   updateUserProfile(data.name, data.photoURL)
    //     .then()
    //     .catch((error) => console.log(error));
    // });
  };

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  return (
    <div className=" pt-20 bg-slate-100 shadow-md  grid grid-cols-2 py-10 gap-x-10">
      <div className="items-center py-36 px-36 ">
        <iframe
          className="h-96 w-96"
          src="https://embed.lottiefiles.com/animation/107385"
        ></iframe>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md bg-white rounded px-8 pt-6 pb-8 shadow-lg"
      >
        <h2 className="text-2xl text-center text-gray-700 font-bold mb-2">
          Register
        </h2>

        <div className="mb-2">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name", { required: "Name is required" })}
            className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-blue-500"
          />
          {errors.name && (
            <span role="alert" className="text-red-500 text-xs">
              {errors.name.message}
            </span>
          )}
        </div>

        <div className="mb-2">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
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

        <div className="mb-2">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <div
            className={`w-full px-3 py-2 rounded border flex items-center justify-between ${
              errors.password ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-blue-500`}
          >
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="outline-none"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },

                pattern: {
                  value: /^(?=.*[A-Z])(?=.*\W).+$/,
                  message:
                    "Password must contain at least one capital letter and one special character",
                },
              })}
            />
            <span
              className="top-3 end-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {/* Add your eye icon here */}
              {showPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
            </span>
          </div>
          {errors.password && (
            <span role="alert" className="text-red-500 text-xs">
              {errors.password.message}
            </span>
          )}
        </div>

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

        <button
          type="submit"
          className="bg-rose-500 w-full rounded-md py-3 text-white"
        >
          {loading ? (
            <FaSpinner className="m-auto animate-spin" size={24} />
          ) : (
            "Register"
          )}
        </button>

        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          <p className="px-3 text-sm dark:text-gray-400">
            Signup with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
        </div>
        <div
          onClick={handleGoogleSignIn}
          className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer"
        >
          <FcGoogle size={32} />

          <p>Continue with Google</p>
        </div>
        <p className="px-6 text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link
            to="/signIn"
            className="hover:underline hover:text-rose-500 text-gray-600"
          >
            Login
          </Link>
          .
        </p>
      </form>
    </div>
  );
};

export default Signup;
