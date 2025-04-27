import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import AuthLayout from "./components/auth/Layout";
import { checkAuth } from "./store/auth-slice";
import CheckAuth from "./components/common/Check-Auth";

import "./App.css";
import PageNotFound from "./pages/PageNotFound";
import TaskBoard from "./pages/Task/TaskBoard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  if (isLoading) {
    return <h1>Loading</h1>;
  }
  console.log("App State:", { user, isAuthenticated, isLoading });

  return (
    <>
      <div className="flex flex-col overflow-hidden">
        {/* common component */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/auth"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <AuthLayout />
              </CheckAuth>
            }
          >
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route
            path="tasks"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <TaskBoard />
              </CheckAuth>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
