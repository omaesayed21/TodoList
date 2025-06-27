import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import ProtectedRoute from "../assets/Auth/ProtectedRoute";
import RootLayout from "../pages/Layout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/login";
import RegisterPage from "../pages/Register";
import TodosPage from "../pages/Todos";
import ErrorHandler from "../Componets/ui/erorrs/ErorrHandler";
import PageNotFound from "../pages/PageNotFound";

// helper function to get user
const getUser = () => {
  const userDataString = localStorage.getItem("loggedInUser");
  return userDataString ? JSON.parse(userDataString) : null;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />} errorElement={<ErrorHandler />}>
        <Route
          index
          element={
            <ProtectedRoute
              isAllowed={getUser()?.jwt}
              redirectPath="/login"
              data={getUser()}
            >
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute
              isAllowed={getUser()?.jwt}
              redirectPath="/login"
              data={getUser()}
            >
              <h2>Profile page</h2>
            </ProtectedRoute>
          }
        />
        <Route
          path="/todos"
          element={
            <ProtectedRoute
              isAllowed={getUser()?.jwt}
              redirectPath="/login"
              data={getUser()}
            >
              <TodosPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="login"
          element={
            <ProtectedRoute
              isAllowed={!getUser()?.jwt}
              redirectPath="/"
              data={getUser()}
            >
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="register"
          element={
            <ProtectedRoute
              isAllowed={!getUser()?.jwt}
              redirectPath="/login"
              data={getUser()}
            >
              <RegisterPage />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </>
  )
);

export default router;
