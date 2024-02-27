import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
      className="flex flex-col items-center justify-center min-h-screen"
      style={{ backgroundColor: "#454545" }}
    >
      <div
        className="w-full max-w-2xl h-100 p-8 m-4 rounded shadow-md flex flex-col justify-between"
        style={{ backgroundColor: "#282828" }}
      >
        <div>
          <h2 className="text-3xl font-bold text-center mb-4 text-white">
            Log in as a registered candidate
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
        <div className="flex items-center justify-end h-full">
          <p
            className="text-md text-white mb-1 mr-2 text-right "
            style={{ marginRight: "0px" }}
          >
            Are you not registered as a
            <br
              className="hidden lg:inline-block"
              style={{ marginRight: "-10px" }}
            />
            candidate yet? Do it now
          </p>
        </div>
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="w-auto px-6 py-3  text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline text-3xl"
            style={{ backgroundColor: "#D4983D" }}
          >
            Log in
          </button>
          <div className="flex flex-col items-center">
            <Link
              className="w-auto px-6 py-3 text-white bg-green-500 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline text-center text-3xl"
              to="/register"
              style={{ marginRight: "00px", backgroundColor: "#393939" }}
            >
              Register
            </Link>
          </div>
        </div>
        {/* MOSTRAMOS LOS ERRORES DEL ERROR 401 DE CREDENCIALES INCORRECTAS */}
        {errors.detail && (
          <p className="text-red-500 text-base italic">{errors.detail}</p>
        )}
      </div>
    </div>
  );
}
