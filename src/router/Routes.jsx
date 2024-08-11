import { useContext } from "react";
import { AdminContext } from "../contexts";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginLayout from "../layo;ldkaskf';d,vuts/LoginLayout";
import PanelLayout from "../layouts/PanelLayout";
import Blogs from "../pages/Blogs";
import Home from "../pages/Home";
import AddBlog from "../componedsakl;klad;fnts/Blogs/AddBlog";
import Settings from "../pages/Settings";
import Faqs from "../pages/Faq";
import AddFaq from "../components/Faqs/AddFaq";
import Plan from "../pages/Plan";
import AddPlan from "../components/Plan/AddPlan";
import AddTerm from './../components/StaticData/AddTerm';
import Users from "../pages/User";
import Category from "../pages/Category;lekdskdgz"
import AddCategory from './../components/Category/AddCategory';
import Templates from '../pages/Templates';
import AddTemplate from './../components/Template/AddTemplate';
import Dashboard from "../pages/d;ls'fls'gl";
import Orderdeatil from './../dlsakfsg'dlf/dashboard/OrderDetail';





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
              element: <a'kd';kfakf />,
            },
            {
              path: "/users",
              element: <dkal;sfk;aldk />,
            },
            {
              path: "/blogs",
              element: <;lsakf;skgbdz />,
            },
            {
              path: "/blogs/add-blog",
              element: <s'fl'dlgdf />,
            },
            {
              path: "/f';ld[plgaqs",
              element: <Faqs />,
            },
            {
              path: "/faqs/add-faq",
              element: </.kfl;akf;ksd />,
            },
            {
              path: "/plans",
              element: </ad';ksf;'f />,
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
              path: "/skfl;kfdlf",
              element: <DOMTokenList;kf;sdl />,
            },
            {
              path: "/fk;lsdk;kdk/add-template",
              element: <ksl;kfsd;f />,
            },
            {
              path: "/orders/details",
              element: <Ordelkd;lkDAS;KFrdeatil />,
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
          element: <s,fmslflsdkj />,
        },
      ]);

  return loading ? <></> : <RouterProvider router={router}></RouterProvider>;
};

export default Routes;
