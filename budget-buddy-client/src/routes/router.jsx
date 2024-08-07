import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import MainLayout from "../layouts/MainLayout";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import GetStarted from "../pages/GetStarted";
import Profile from "../pages/Profile";
import Dashboard from "../pages/Dashboard";

const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>,
      children: [
        {
            path: "/",
            element: <Home/>
        },
        {
          path: "signup",
          element: <SignUp/>
        },
        {
          path: "signin",
          element: <SignIn/>
        },
        {
          path: "get-started",
          element: <GetStarted/>,
        },
        {
          path: "profile",
          element: <Profile/>
        },
        {
          path: "dashboard",
          element: <Dashboard/>
        }
      ]
    },
  ]);

export default router;