import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CommonForm from "../../components/common/Form";
import { LoginFormControls } from "../../config/index";
import { loginUser } from "../../store/auth-slice";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    dispatch(loginUser(formData))
      .then((result) => {
        console.log("Login response:", result.payload); // Debugging line
        if (result.payload?.success) {
          // Success toast (multicolor)
          toast.success("🎉 Login successful! Welcome back!", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          
        } else if (result.payload?.message === "User doesn't exist") {
          // Error toast (red)
          toast.error("❌ User doesn't exist. Please register.", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else if (result.payload?.message === "Invalid email or password") {
          // Error toast (red)
          toast.error("❌ Invalid email or password. Please try again.", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          // Generic error toast (red)
          toast.error("❌ Login failed. Please try again.", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      })
      .catch((err) => {
        console.error("Login error:", err);
        // Network or server error toast (red)
        toast.error("❌ Something went wrong. Please try again later.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        Login to your Account
      </h1>

      <CommonForm
        formControls={LoginFormControls}
        buttonText={"Login"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
      <p>
        Don't have an account?
        <Link
          to="/auth/register"
          className="text-blue-500 ml-2 hover:underline font-medium"
        >
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;