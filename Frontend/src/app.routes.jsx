import { createBrowserRouter } from "react-router-dom";

import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Protected from "./features/auth/components/Protected";

import Applications from "./features/application/pages/Applications";
import Dashboard from "./features/application/pages/Dashboard";
import Skills from "./features/application/pages/Skills";
import Goals from "./features/application/pages/Goals";

import Profile from "./features/Profile/pages/Profile";
import Landing from "./features/landing/Landing";

const router = createBrowserRouter([
  // Public Routes

  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  // Protected Routes
  {
    path: "/dashboard",
    element: (
      <Protected>
        <Dashboard />
      </Protected>
    ),
  },
  {
    path: "/dashboard/Application",
    element: (
      <Protected>
        <Applications />
      </Protected>
    ),
  },
  {
    path: "/dashboard/Skills",
    element: (
      <Protected>
        <Skills />
      </Protected>
    ),
  },
  {
    path: "/dashboard/Goals",
    element: (
      <Protected>
        <Goals />
      </Protected>
    ),
  },
  {
    path: "/dashboard/Profile",
    element: (
      <Protected>
        <Profile />
      </Protected>
    ),
  },
]);

export default router;
