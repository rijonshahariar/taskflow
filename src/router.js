import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ReadingList from "./pages/ReadingList";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "home",
    element: <Dashboard />,
  },
  {
    path: "projects",
    element: <Projects />,
  },
  {
    path: "read",
    element: <ReadingList />,
  }
      
  ]);

export default router;