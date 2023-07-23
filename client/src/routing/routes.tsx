import { createBrowserRouter } from "react-router-dom";
import FinishedList from "../components/Member/FinishedList";
import Member from "../components/Member/Member";
import Profile from "../components/Member/Profile";
import TaskList from "../components/Member/TaskList";
import Auth from "../components/auth/Auth";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import LandingPage from "../components/front-page/LandingPage";
import AuthRoute from "./AuthRoute";
import PrivateRoutes from "./PrivateRoutes";

const routes = createBrowserRouter([
  { path: "", element: <LandingPage /> },
  {
    element: <AuthRoute />,
    children: [
      {
        path: "auth",
        element: <Auth />,
        children: [
          { path: "login", element: <Login /> },
          { path: "signup", element: <Signup /> },
        ],
      },
    ],
  },
  {
    element: <PrivateRoutes />,
    children: [
      {
        path: "member",
        element: <Member />,
        children: [
          { path: "", element: <TaskList /> },
          { path: "finished", element: <FinishedList /> },
          { path: "profile", element: <Profile /> },
        ],
      },
    ],
  },
]);

export default routes;
