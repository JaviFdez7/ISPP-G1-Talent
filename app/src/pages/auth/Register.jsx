import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  //1) creamos el estado del formulario de registro
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    password2: "", //confirmacion de contraseña(atributo adicional que no viene en el backend)
  });

  //para redireccionar al usuario
  let navegate = useNavigate();

  //2) declaramos estado de los errores para validar los campos del formulario
  const [errors, setErrors] = useState({});

  //3) creamos las instancias de los atributos de los campos del formulario
  const {
    first_name,
    last_name,
    email,
    username,
    password,
    password2,
    phone_number,
    github_username,
  } = form;

  //4)creamos la funcion que se encargara de actualizar el estado del formulario
  function onInputChange(e) {
    //onInputChange == handleChange
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setErrors({});
  }

  //5) creamos la funcion que se encargara de enviar los datos del formulario
  async function handleSubmit(e) {
    //onFormSubmit == handleSubmit
    e.preventDefault();
  }

  //7) crear la funcion auxiliar que se encargara de validar las validaciones extra que no se valida en el backend
  function validateForm() {
    let errors = {};
    //RN-1: first_name campo obligatorio
    if (!form.first_name) {
      errors.first_name = "The name field is required";
      //RN-2: first_name mas de 3 caracteres
    } else if (form.first_name.length <= 3) {
      errors.first_name = "The name field must be more than 3 characters";
    }
    //RN-3: msima RN q la RN 1 pero pal last_name
    if (!form.last_name) {
      errors.last_name = "The last name field is required";
      //RN-4: misma RN q la RN 2 pero pal last_name
    } else if (form.last_name.length <= 3) {
      errors.last_name = "The last name field must have more than 3 characters";
    }
    //RN-5: email validando q sea de gmail, outlook y hotmail sabiedno q esta es la fun en python:
    //r'^\w+([.-]?\w+)*@(gmail|hotmail|outlook)\.com$
    if (!form.email) {
      errors.email = "The email field is required";
    } else if (
      !/^\w+([.-]?\w+)*@(gmail|hotmail|outlook)\.com$/.test(form.email)
    ) {
      errors.email = "The email field must be from Gmail, Outlook or Hotmail";
    }
    //RN-6) password = password2//validar q las contraseñas sean iguales
    if (form.password !== form.password2) {
      errors.password2 = "Passwords do not match";
    }
    //Faltarían validar mas campos
    return errors;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 m-4 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">
          Fill the form to register as a new candidate
        </h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          {/* llamada a la funcion que se encargara de hacer el login a la API*/}
          <div className="mb-4">
            <label
              htmlFor="Firstname"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              First name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Write your First name"
              name="first_name" // nombre del atributo de la entidad del backend
              value={first_name} // valor del atributo de la entidad del backend
              onChange={(e) => onInputChange(e)} // llamada a la funcion que se encargara de actualizar el estado de la entidad
            />
            {/* validacion del campo del formulario */}
            {errors.first_name && (
              <p className="text-red-500 text-xs italic">{errors.first_name}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="Surname"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Surname
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Enter your last name"
              name="last_name" // nombre del atributo de la entidad del backend
              value={last_name} // valor del atributo de la entidad del backend
              onChange={(e) => onInputChange(e)} // llamada a la funcion que se encargara de actualizar el estado de la entidad
            />
            {errors.last_name && (
              <p className="text-red-500 text-xs italic">{errors.last_name}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="Username"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Enter your username"
              name="username" // nombre del atributo de la entidad del backend
              value={username} // valor del atributo de la entidad del backend
              onChange={(e) => onInputChange(e)} // llamada a la funcion que se encargara de actualizar el estado de la entidad
            />
            {errors.username && (
              <p className="text-red-500 text-xs italic">{errors.username}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="Password"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
              name="password" // nombre del atributo de la entidad del backend
              value={password} // valor del atributo de la entidad del backend
              onChange={(e) => onInputChange(e)} // llamada a la funcion que se encargara de actualizar el estado de la entidad
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic">{errors.password}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="Password2"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Repeat password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Repeat your password"
              name="password2" // nombre del atributo de la entidad del backend
              value={password2} // valor del atributo de la entidad del backend
              onChange={(e) => onInputChange(e)} // llamada a la funcion que se encargara de actualizar el estado de la entidad
            />
            {errors.password2 && (
              <p className="text-red-500 text-xs italic">{errors.password2}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="Email"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Write your email"
              name="email" // nombre del atributo de la entidad del backend
              value={email} // valor del atributo de la entidad del backend
              onChange={(e) => onInputChange(e)} // llamada a la funcion que se encargara de actualizar el estado de la entidad
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">{errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="Phonenumber"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Phone number
            </label>
            <input
              type="tel" //tipo de dato para validar que sea un numero de telefono
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Write your phone number"
              name="phone_number" // nombre del atributo de la entidad del backend
              value={phone_number} // valor del atributo de la entidad del backend
              onChange={(e) => onInputChange(e)} // llamada a la funcion que se encargara de actualizar el estado de la entidad
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="Githubusername"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Github username
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Write your Github username"
              name="github_username" // nombre del atributo de la entidad del backend
              value={github_username} // valor del atributo de la entidad del backend
              onChange={(e) => onInputChange(e)} // llamada a la funcion que se encargara de actualizar el estado de la entidad
            />
          </div>
          <div className="flex items-center justify-end h-full">
            <p
              className="text-md text-gray-500 mb-1 mr-2 text-right "
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
          <div className="flex space-x-4">
            <button
              type="submit"
              className="w-auto px-2 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            >
              Register as a new
              <br
                className="hidden lg:inline-block"
                style={{ marginRight: "-10px" }}
              />
              candidate
            </button>
            <Link
              className="w-auto px-6 py-3 font-bold text-white bg-green-500 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline text-center text-3xl"
              to="/login"
              style={{ marginRight: "00px" }}
            >
              Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
