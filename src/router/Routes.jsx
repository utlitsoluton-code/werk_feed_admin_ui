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
import Category from "../pages/Category"
import AddCategory from './../components/Category/AddCategory';
import Templates from '../pages/Templates';
import AddTemplate from './../components/Template/AddTemplate';
import Dashboard from "../pages/Dashboard";




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
              element: <Dashboard />,
            },
            {
              path: "/static-pages",
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
              path: "/categories",
              element: <Category />,
            },
            {
              path: "/categories/add-category",
              element: <AddCategory />,
            },
            {
              path: "/templates",
              element: <Templates />,
            },
            {
              path: "/templates/add-template",
              element: <AddTemplate />,
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
