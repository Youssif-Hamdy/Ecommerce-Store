import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import PageNotFound from "../pages/PageNotFound";
import RootLayout from "../pages/Layout";
import ErrorHandler from "../components/errors/ErrorHandler";
import HomePage from "../pages";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import { auth } from "../components/firebaseConfig"; 
import { onAuthStateChanged } from "firebase/auth"; 

let userData: any = null;

onAuthStateChanged(auth, (user) => {
  if (user) {
    userData = {
      uid: user.uid,
      email: user.email,
    };
  } else {
    userData = null;
  }
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />} errorElement={<ErrorHandler />}>
        <Route
          index
          element={
            <ProtectedRoute
              isAllowed={!userData} 
              redirectPath="/login"
              data={userData}
            >
              <HomePage />
            </ProtectedRoute>
          }
        />
       
        <Route
          path="login"
          element={
            <ProtectedRoute
              isAllowed={!userData} 
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
              isAllowed={!userData} 
              redirectPath="/"
              data={userData}
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
