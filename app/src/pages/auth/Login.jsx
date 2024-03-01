import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainButton from "../../components/mainButton.jsx";
import mainBackgroundRegisterLogin from "../../images/main-background2.jpg";

import { useAuthContext } from "../../context/authContext";

export default function Login() {
  const { login } = useAuthContext();

  let navigate = useNavigate();

  //2) creamos el estado para el formulario
  const [form, setForm] = useState({
    username: "",
    password: "",
    
  });
  const [errors, setErrors] = useState({});

  const { username, password } = form;

  function onInputChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setErrors({});
  }

  //6)crear la funcion que se encargara de llamar al endpoint de login
  async function handleSubmit(e) {
    e.preventDefault();    
    const response = await fetch("http://localhost:3000/api/v1/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await response.json();
    switch (response.status) {
      case 200:
        login(data.access, data.refresh);
        if (data.userType === "candidate") {
          navigate("/candidate/detail");
        } else if (data.userType === "representative") {
          navigate("/representative/detail");
        }
        break;
      case 401:
        setErrors(data);
        break;
      case 400:
        setErrors(data);
        break;
      default:
        break;
    }
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
          borderColor: "#d4983d",
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
                  name="username" // nombre del atributo de la entidad del backend
                  value={username} // valor del atributo de la entidad del backend
                  onChange={(e) => onInputChange(e)} // llamada a la funcion que se encargara de actualizar el estado de la entidad
                />
                {/* validacion del campo del formulario */}
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
                {/* validacion del campo del formulario */}
                {errors.password && (
                  <p className="text-red-500 text-xs italic">
                    {errors.password}
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>
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
          <button>{MainButton("Log in", "", "")}</button>
        </div>{" "}
        {/* MOSTRAMOS LOS ERRORES DEL ERROR 401 DE CREDENCIALES INCORRECTAS */}
        {errors.detail && (
          <p className="text-red-500 text-base italic">{errors.detail}</p>
        )}
      </div>
    </div>
  );
}
