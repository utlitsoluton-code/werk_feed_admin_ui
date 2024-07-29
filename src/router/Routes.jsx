import { useContext } from "react";
import { AdminContext } from "../contexts";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginLayout from "../layouts/LoginLayout";
import PanelLayout from "../layouts/PanelLayout";
import Blogs from "../pages/Blogs";
import Home from "../pages/Home";
import AddBlog from "../components/Blogs/AddBlog";
import Settings from "../pages/Settings";
import Faqs from "../pages/Faq";
import AddFaq from "../components/Faqs/AddFaq";
import Plan from "../pages/Plan";
import AddPlan from "../components/Plan/AddPlan";
import AddTerm from './../components/StaticData/AddTerm';
import Users from "../pages/User";



const Routes = () => {
  // context
  const { admin, loading } = useContext(AdminContext);

  const router = admin
    ? createBrowserRouter([
        {
          path: "/",
          element: <PanelLayout />,
          children: [
            {
              path: "/",
              element: <Home />,
            },
            {
              path: "/users",
              element: <Users />,
            },
            {
              path: "/blogs",
              element: <Blogs />,
            },
            {
              path: "/blogs/add-blog",
              element: <AddBlog />,
            },
            {
              path: "/faqs",
              element: <Faqs />,
            },
            {
              path: "/faqs/add-faq",
              element: <AddFaq />,
            },
            {
              path: "/plans",
              element: <Plan />,
            },
            {
              path: "/plans/add-plan",
              element: <AddPlan />,
            },
            {
              path: "/term-and-condition/add",
              element: <AddTerm />,
            },
            
            {
              path: "/settings",
              element: <Settings />,
            },
            
          ],
        },
        {
          path: "*",
          element: <h2>Not Found</h2>,
        },
      ])
    : createBrowserRouter([
        {
          path: "*",
          element: <LoginLayout />,
        },
      ]);

  return loading ? <></> : <RouterProvider router={router}></RouterProvider>;
};

export default Routes;
