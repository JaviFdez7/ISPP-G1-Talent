import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainButton from "../../components/mainButton.jsx";
import mainBackgroundRegisterLogin from "../../images/main-background2.jpg";
import axios from "axios";
import { useAuthContext } from "../../context/authContext";

export default function Login() {
  const { login } = useAuthContext();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const { username, password } = form;
  let navigate = useNavigate();

  function onInputChange(e) {
    const { name, value } = e.target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
    setErrors(prevErrors => ({ ...prevErrors, [name]: undefined }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/user/login",
        form
        
      );
      const data = response.data;
      login(data.access, data.refresh, data.user.role, data.user._id);
      if (data.user.role === "Candidate") {
        navigate("/candidate/detail");
      } else if (data.user.role === "Representative") {
        navigate("/representative/detail");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrors(error.response.data);
        return;
      } else if (error.response && error.response.status === 404) {
        setErrors(error.response.data);
        return;
      }
      console.error(error);
    }
  }

  function validateForm() {
    let errors = {};

    if (!form.username) {
      errors.username =  <span style={{color: 'orange'}}>The username is required</span>
    }
    if (!form.password) {
      errors.password = <span style={{color: 'orange'}}>The password is required</span>
    }
    return errors;
  }

  return (
    <div
      className="flex flex-col justify-center"
      style={{
        height: "100vh",
        backgroundAttachment: "fixed",
        backgroundImage: `url(${mainBackgroundRegisterLogin})`,
        backgroundSize: "cover",
      }}
    >
      <div
        className="h-100 rounded shadow-md flex flex-col justify-between"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          width: "100%",
          maxWidth: "48rem",
          padding: "2rem",
          margin: "1rem",
          marginLeft: "auto",
          marginRight: "auto",
          borderColor: "var(--talent-highlight)",
          borderWidth: "1px",
        }}
      >
        <div>
          <h2
            className="font-bold text-center text-white"
            style={{
              fontSize: "4rem",
              marginTop: "2rem",
              marginBottom: "4rem",
            }}
          >
            Log in
          </h2>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div
              className="flex"
              style={{
                marginBottom: "1rem",
              }}
            >
              <label
                htmlFor="Username"
                className="block text-lg font-bold text-white self-center"
                style={{
                  marginBottom: "1rem",
                  marginRight: "2rem",
                  marginLeft: "4rem",
                }}
              >
                Username
              </label>
              <div
                className="flex-grow"
                style={{
                  marginRight: "8rem",
                }}
              >
                <input
                  type="text"
                  className=" leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  style={{
                    width: "100%",
                    padding: "0.5rem 0.75rem",
                  }}
                  placeholder="Write your username"
                  name="username" 
                  value={username} 
                  onChange={(e) => onInputChange(e)}
                />
                {errors.username && (
                  <p className="text-red-500 text-xs italic">
                    {errors.username}
                  </p>
                )}
              </div>
            </div>
            <div
              className=" flex"
              style={{
                marginBottom: "1rem",
              }}
            >
              <label
                htmlFor="Password"
                className="block text-lg font-bold text-white self-center"
                style={{ marginRight: "2rem", marginLeft: "4rem" }}
              >
                Password
              </label>
              <div
                className="flex-grow"
                style={{ marginRight: "8rem", marginLeft: "0.25rem" }}
              >
                <input
                  type="password"
                  className="leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  style={{
                    width: "100%",
                    padding: "0.5rem 0.75rem",
                  }}
                  placeholder="Enter your password"
                  name="password"
                  value={password}
                  onChange={(e) => onInputChange(e)}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs italic">
                    {errors.password}
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>
        {errors.checkPassword && (
          <p className="text-red-500">{errors.checkPassword}</p>
        )}
        {errors.userLog && <p className="text-red-500">{errors.userLog}</p>}
        {errors.user && <p className="text-red-500">{errors.user}</p>}

        <div
          className="flex items-center justify-center h-full"
          style={{ marginTop: "2rem" }}
        >
          <p className="text-md text-white mb-1 mr-2 text-center">
            Don't have an account?{" "}
            <Link
              to="/register/candidate"
              className="text-blue-500 hover:text-blue-700"
              style={{ marginRight: "2rem" }}
            >
              Register now
            </Link>
          </p>
        </div>
        <div
          className="flex justify-center items-center"
          style={{ marginTop: "1rem" }}
        >
          {MainButton("Log in", "/", handleSubmit)}
        </div>
      </div>
    </div>
  );
}
