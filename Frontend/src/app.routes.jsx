import { createBrowserRouter } from "react-router-dom";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";

import Protected from "./features/auth/components/Protected";
import Applications from "./features/application/pages/Applications";
import Dashboard from "./features/application/pages/Dashboard";
import Skills from "./features/application/pages/Skills";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: (
      <Protected>
        <Dashboard />,
      </Protected>
    ),
  },
  {
    path: "/dashboard/get-application",
    element: (
      <Protected>
        <Applications />,
      </Protected>
    ),
  },
  {
    path: "/dashboard/get-skills",
    element: (
      <Protected>
        <Skills />,
      </Protected>
    ),
  },
]);

export default router;
