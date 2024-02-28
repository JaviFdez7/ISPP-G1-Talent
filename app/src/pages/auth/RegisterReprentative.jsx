import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import mainBackgroundRegisterLogin from "../../images/main-backgroundregisterlogin.jpg";

import FormTextInput from "../../components/FormTextInput";
import MainButton from "../../components/mainButton";
import SecondaryButton from "../../components/secondaryButton";

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
      className="h-screen flex flex-col justify-center bg-fixed home-container"
      style={{
        backgroundImage: `url(${mainBackgroundRegisterLogin})`,
        backgroundSize: "cover",
      }}
    >
      <div
        className="w-full max-w-4xl h-100 p-8 m-4 rounded shadow-md flex flex-col justify-between"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          marginLeft: "auto",
          marginRight: "auto",
          borderColor: "#d4983d",
          borderWidth: "1px",
        }}
      >
        {/* eleccion de formulario de registro*/}
        <h2
          className="text-2xl font-bold text-center mb-4 text-white"
          style={{ marginTop: "-40px", marginBottom: "-10px" }}
        >
          Register as
        </h2>
        <hr className="border-1 w-70 mb-4"
          style={{ borderColor: '#d4983d' }} />
        <div className="flex justify-center space-x-4 mb-4">
          <Link to="/register/candidate" >
            <h2
              className="text-2xl text-white hover:text-gray-600 px-6 py-3"
              style={{ marginTop: "-40px" }}
            >
              Candidate
            </h2>
          </Link>
          <h2
            className="text-2xl"
            style={{ marginTop: "-40px", color: 'var(--talent-highlight)' }}
          >
            Representative
          </h2>

        </div>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-wrap -mx-3"
        >
          {/* llamada a la funcion que se encargara de hacer el login a la API*/}
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <FormTextInput
              labelFor="Username"
              labelText="Username"
              placeholder="Enter your Username"
              name="username"
              value={username}
              onChange={(e) => onInputChange(e)}
              errors={errors}
              isMandatory
            />
            <FormTextInput
              labelFor="Corporativeemail"
              labelText="Corporative Email"
              placeholder="Enter your Corporative Email"
              name="corporative_email"
              value={corporative_email}
              onChange={(e) => onInputChange(e)}
              type="email"
              errors={errors}
              isMandatory
            />
            <FormTextInput
              labelFor="companyname"
              labelText="Company Name"
              placeholder="Enter your Company Name"
              name="company_name"
              value={company_name}
              onChange={(e) => onInputChange(e)}
              errors={errors}
              isMandatory
            />



          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <FormTextInput
              labelFor="Password"
              labelText="Password"
              placeholder="Enter your Password"
              name="password"
              value={password}
              onChange={(e) => onInputChange(e)}
              type="password"
              errors={errors}
              isMandatory
            />
            <FormTextInput
              labelFor="Password2"
              labelText="Repeat Password"
              placeholder="Enter your Password again"
              name="password2"
              value={password2}
              onChange={(e) => onInputChange(e)}
              type="password"
              errors={errors}
              isMandatory
            />
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
          </div>



          <div
            className="flex space-x-24 mt-10 m-auto"
          >
            {MainButton("Register", "", "")}
            {SecondaryButton("Log in", "/login", "")}
          </div>

        </form>
      </div>
    </div>
  );
}
