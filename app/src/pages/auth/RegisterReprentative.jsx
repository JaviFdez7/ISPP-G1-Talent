import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterRepresentative() {
  //1) creamos el estado del formulario de registro
  const [form, setForm] = useState({
    username: "",
    corporative_email: "",
    company_name: "",
    password: "",
    password2: "", //confirmacion de contraseña(atributo adicional que no viene en el backend)
  });

  //para redireccionar al usuario
  let navegate = useNavigate();

  //2) declaramos estado de los errores para validar los campos del formulario
  const [errors, setErrors] = useState({});

  //3) creamos las instancias de los atributos de los campos del formulario
  const { username, corporative_email, company_name, password, password2 } =
    form;

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
    //RN-1: username campo obligatorio
    if (!form.username) {
      errors.first_name = "The username field is required";
      //RN-2: username mas de 3 caracteres
    } else if (form.username.length <= 3) {
      errors.username = "The username field must be more than 3 characters";
    }
    //RN-3: msima RN q la RN 1 pero pal last_name
    if (!form.company_name) {
      errors.company_name = "The last name field is required";
      //RN-4: misma RN q la RN 2 pero pal last_name
    } else if (form.company_name.length <= 1) {
      errors.company_name =
        "The company_name field must have more than 1 characters";
    }
    //RN-5: email validando q sea de gmail, outlook y hotmail sabiedno q esta es la fun en python:
    //r'^\w+([.-]?\w+)*@(gmail|hotmail|outlook)\.com$
    if (!form.corporative_email) {
      errors.corporative_email = "The corporative_email field is required";
    } else if (
      !/^\w+([.-]?\w+)*@(gmail|hotmail|outlook)\.com$/.test(
        form.corporative_email
      )
    ) {
      errors.email =
        "The corporative_email field must be from Gmail, Outlook or Hotmail";
    }
    //RN-6) password = password2//validar q las contraseñas sean iguales
    if (form.password !== form.password2) {
      errors.password2 = "Passwords do not match";
    }
    //Faltarían validar mas campos
    return errors;
  }

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen"
      style={{ backgroundColor: "#454545" }}
    >
      <div
        className="w-full max-w-3xl py-24 p-8 m-4  rounded shadow-md"
        style={{ backgroundColor: "#282828" }}
      >
        <h2
          className="text-2xl font-bold text-center mb-4 text-white"
          style={{ marginTop: "-70px" }}
        >
          Fill the form to register as a new representative
        </h2>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-wrap -mx-3"
        >
          {/* llamada a la funcion que se encargara de hacer el login a la API*/}
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <div className="mb-4 flex">
              <label
                htmlFor="Username"
                className="block mb-2 text-sm font-bold text-white ml-8 mr-6 self-center"
              >
                Username
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                placeholder="Enter your username"
                name="username" 
                value={username}
                onChange={(e) => onInputChange(e)}
              />
              {errors.username && (
                <p className="text-red-500 text-xs italic">{errors.username}</p>
              )}
            </div>
            <div className="mb-4 flex">
              <label
                htmlFor="Corporativeemail"
                className="block mb-2 text-sm font-bold text-white ml-8 mr-6 self-center"
              >
                Corporative Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                placeholder="Write your corporative email"
                name="corporative_email"
                value={corporative_email}
                onChange={(e) => onInputChange(e)}
              />
              {errors.corporative_email && (
                <p className="text-red-500 text-xs italic">{errors.corporative_email}</p>
              )}
            </div>
            <div className="mb-4 flex">
              <label
                htmlFor="companyname"
                className="block mb-2 text-sm font-bold text-white ml-8 mr-6 self-center"
              >
                Company Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                placeholder="Enter your company name"
                name="company_name" 
                value={company_name} 
                onChange={(e) => onInputChange(e)}
              />
              {errors.company_name && (
                <p className="text-red-500 text-xs italic">{errors.company_name}</p>
              )}
            </div>
            <div className="mb-4 flex">
              <label
                htmlFor="Password"
                className="block mb-2 text-sm font-bold text-white ml-8 mr-7 self-center"
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
            <div className="mb-4 flex">
              <label
                htmlFor="Password2"
                className="block mb-2 text-sm font-bold text-white ml-8 self-center"
              >
                Repeat Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline self-center"
                placeholder="Repeat your password"
                name="password2" 
                value={password2} 
                onChange={(e) => onInputChange(e)} 
              />
              {errors.password2 && (
                <p className="text-red-500 text-xs italic">
                  {errors.password2}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center justify-end h-full">
            <p
              className="text-md text-white mb-1 mr-2 text-right"
              style={{ marginTop: "250px"}}
            >
              Are you not registered as a
              <br
                className="hidden lg:inline-block"
                style={{ marginRight: "-100px" }}
              />
              representative already? Log it now
              <br
                className="hidden lg:inline-block"
                style={{ marginRight: "-120px" }}
              />
            </p>
          </div>

          <div
            className="flex space-x-24 mt-auto"
            style={{ marginBottom: "-85px", marginTop: "-20px" }}
          >
            <div className="flex items-center justify-end">
              <p
                className="text-md text-gray-500 mb-1 mr-2 text-right"
                style={{ marginTop: "20px", marginBottom: "0px" }}
              >
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox text-blue-500"
                  />
                  <span className="ml-2">
                    Do you accept the terms and
                    <br
                      className="hidden lg:inline-block"
                      style={{ marginRight: "-10px" }}
                    />
                    conditions of use of the
                    <br
                      className="hidden lg:inline-block"
                      style={{ marginRight: "-10px" }}
                    />
                    processing of your data?
                    <br
                      className="hidden lg:inline-block"
                      style={{ marginRight: "-10px" }}
                    />
                    <a
                      href="https://tu-enlace-externo.com"
                      className="text-yellow-500 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read the conditions in here
                      <svg
                        class="h-6 w-6 text-yellow-500 inline-block"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </span>
                </label>
              </p>
            </div>
            <button
              type="submit"
              className="w-auto px-2 py-2 text-white bg-yellow-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              style={{ marginTop: "20px" }}
            >
              Register as a new
              <br
                className="hidden lg:inline-block"
                style={{
                  marginRight: "-10px",
                  marginTop: "20px",
                }}
              />
              representative
            </button>
            <Link
              className="w-auto px-4 py-4 text-white bg-green-500 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline text-center text-3xl"
              to="/login"
              style={{
                marginRight: "-100px",
                marginTop: "20px",
                marginBottom: "20px",
                backgroundColor: "#393939",
              }}
            >
              Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
