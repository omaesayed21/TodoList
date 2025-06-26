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


  const storageKey = "loggedInUser";
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString) : null;
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Root Layout */}
        <Route path="/" element={<RootLayout />} errorElement={<ErrorHandler />}>
          <Route
            index
            element={
              <ProtectedRoute
                isAllowed={userData?.jwt}
                redirectPath="/login"
                data={userData}
              >
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                isAllowed={userData?.jwt}
                redirectPath="/login"
                data={userData}
              >
                <h2>Profile page</h2>
              </ProtectedRoute>
            }
          />
          <Route
            path="/todos"
            element={
              <ProtectedRoute
                isAllowed={userData?.jwt}
                redirectPath="/login"
                data={userData}
              >
                <TodosPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="login"
            element={
              <ProtectedRoute
                isAllowed={!userData?.jwt}
                redirectPath="/"
                data={userData}
              >
                <LoginPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="register"
            element={
              <ProtectedRoute
                isAllowed={!userData?.jwt}
                redirectPath="/login"
                data={userData}
              >
                <RegisterPage />
              </ProtectedRoute>
            }
          />
        </Route>
  
        {/* Page Not Found */}
        <Route path="*" element={<PageNotFound />} />
      </>
    )
  );
  
  export default router;
  