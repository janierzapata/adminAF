import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./private/PrivateRoute.jsx";
import { PublicRoute } from "./public/PublicRoute";

import { Login } from "../modules/auth/";
import { Dashboard } from "./Dashboard.jsx";

// import { PrivateRouter } from "./private/PrivateRoutes.jsx";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/negro/*"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
