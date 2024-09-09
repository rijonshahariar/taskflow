import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home"
const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
      children: [
        {
            path: "/",
            element: <Home/>
        },
        // {
        //   path: "signup",
        //   element: <SignUp/>
        // },
        // {
        //   path: "signin",
        //   element: <SignIn/>
        // },
        // {
        //   path: "get-started",
        //   element: <GetStarted/>,
        // },
        // {
        //   path: "profile",
        //   element: <Profile/>
        // },
        // {
        //   path: "transactions",
        //   element: <Transactions/>
        // }
      ]
    },
  ]);

export default router;