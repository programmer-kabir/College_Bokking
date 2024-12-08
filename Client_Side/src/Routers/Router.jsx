import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Error from "../Pages/ErrorPage/Error";
import Colleges from "../Pages/Colleges/Colleges";
import Admission from "../Pages/Admission/Admission";
import Signup from "../Pages/Signup/Signup";
import SignIn from "../Pages/SignIn/SignIn";
import MyCollege from "../Pages/MyCollege/MyCollege";
import CollegeDetails from "../Pages/Colleges/CollegeDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/colleges",
        element: <Colleges />,
      },
      {
        path: "/admission",
        element: <Admission />,
      },
      {
        path: "/myCollege",
        element: <MyCollege />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/college-details/:id",
        element: <CollegeDetails />,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/admission/${params.id}`),
      },
    ],
  },
]);
export default router;
