import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainButton from "../../components/mainButton.jsx";
import SecondaryButton from "../../components/secondaryButton.jsx";
import mainBackgroundRegisterLogin from "../../images/main-backgroundregisterlogin.jpg";

export default function Login() {
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
    const response = await fetch(
      "https://mario.pythonanywhere.com/auth/jwt/create/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }
    );

    const data = await response.json();
  }

  return (
    <div
      className="h-screen flex flex-col justify-center bg-fixed home-container"
      style={{
        backgroundImage: `url(${mainBackgroundRegisterLogin})`,
        backgroundSize: "cover",
      }}
    >
      <div
        className="w-full max-w-3xl h-100 p-8 m-4 rounded shadow-md flex flex-col justify-between"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          marginLeft: "auto",
          marginRight: "auto",
          borderColor: "#d4983d",
          borderWidth: "1px",
        }}
      >
        <div>
          <h2 className="text-6xl font-bold text-center mb-4 text-white">
            Log in
          </h2>
          <form onSubmit={(e) => handleSubmit(e)}>
            {/* llamada a la funcion que se encargara de hacer el login a la API*/}
            <div className="mb-4">
              <label
                htmlFor="Username"
                className="block mb-2 text-lg font-bold text-white"
              >
                Username
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                placeholder="Write your username"
                name="username" // nombre del atributo de la entidad del backend
                value={username} // valor del atributo de la entidad del backend
                onChange={(e) => onInputChange(e)} // llamada a la funcion que se encargara de actualizar el estado de la entidad
              />
              {/* validacion del campo del formulario */}
              {errors.username && (
                <p className="text-red-500 text-xs italic">{errors.username}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="Password"
                className="block mb-2 text-lg font-bold text-white"
              >
                Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                placeholder="Enter your password"
                name="password"
                value={password}
                onChange={(e) => onInputChange(e)}
              />
              {errors.password && (
                <p className="text-red-500 text-xs italic">{errors.password}</p>
              )}
            </div>
          </form>
        </div>
        <div className="flex items-center justify-center h-full">
          <p className="text-md text-white mb-1 mr-2 text-center">
            Don't have an account?{" "}
            <Link
              to="/register/candidate"
              className="text-blue-500 hover:text-blue-700 mr-2"
            >
              Register now
            </Link>
          </p>
        </div>
        <div className="flex justify-center items-center mt-4">
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
