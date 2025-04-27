import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import CommonForm from "../../components/common/Form";
import { RegisterFormControls } from "../../config/index";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../store/auth-slice";

const initialState = {
  name: "",
  email: "",
  password: "",
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData))
      .then((data) => {
        if (data.payload?.success) {
          // Success toast (multicolor)
          toast.success("🎉 Registration successful! Welcome!", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigate("/auth/login"); // Redirect after showing the toast
        } else {
          // Error toast (red)
          toast.error("❌ User already exists. Please login.", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigate("/auth/login");
        }
      })
      .catch((error) => {
        console.error("Registration error:", error);
        // Generic error toast (red)
        toast.error("❌ An error occurred during registration. Please try again.", {
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
        Create New Account
      </h1>

      <CommonForm
        formControls={RegisterFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />

      <p>
        Already have an account?
        <Link
          to="/auth/login"
          className="text-blue-500 ml-2 hover:underline font-medium"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;