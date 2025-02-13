import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ReadingList from "./pages/ReadingList";
import AIAssistant from "./pages/AIAssistant";
import DailyRoutine from "./pages/Calendar";
import Calendar from "./pages/Calendar";
import RequireAuth from "./components/RequireAuth";
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
    path: "tasks",
    element: <Dashboard />,
  },
  {
    path: "projects",
    element: <Projects />,
  },
  {
    path: "read",
    element: <ReadingList />,
  },
  {
    path: "assistant",
    element: <RequireAuth><AIAssistant/></RequireAuth>,
  },
  {
    path: "calendar",
    element: <Calendar />,
  }
      
  ]);

export default router;