import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import mainBackgroundRegisterLogin from "../../images/main-background2.jpg";
import axios from "axios";

import FormTextInput from "../../components/FormTextInput";
import MainButton from "../../components/mainButton";

export default function RegisterRepresentative() {
  const [form, setForm] = useState({
    username: "",
    corporative_email: "",
    company_name: "",
    companySubscription: "Basic plan",
    password: "",
    password2: "",
  });
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  let navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const {
    username,
    corporative_email,
    company_name,
    companySubscription,
    password,
    password2,
  } = form;

  function onInputChange(e) {
    if (e.target.name === "termsCheckbox") {
      setIsCheckboxChecked(e.target.checked);
      setErrors({ ...errors, termsCheckbox: undefined });
    } else {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
      setErrors({ ...errors, [e.target.name]: undefined });
    }
  }
  const handleCheckboxChange = (e) => {
    setIsCheckboxChecked(e.target.checked);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!isCheckboxChecked) {
      setErrors({ termsCheckbox: "You must accept the terms and conditions" });
      return;
    }
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/user/representative",
        {
          ...form,
          email: form.corporative_email,
          companyName: form.company_name,
        }
      );

      setIsCheckboxChecked(false);
      navigate("/representative/detail");
    } catch (error) {
      if (error.response.status === 409) {
        setErrors(error.response.data);
        return;
      }
    }
  }
  function validateForm() {
    let errors = {};

    if (!form.username) {
      errors.username = "The username field is required";
    } else if (form.username.length <= 3) {
      errors.username = "The username field must be more than 3 characters";
    }

    if (!form.company_name) {
      errors.company_name = "The company_name field is required";
    } else if (form.company_name.length <= 1) {
      errors.company_name =
        "The company name field must have more than 1 character";
    }

    if (!form.corporative_email) {
      errors.corporative_email = "The corporative email field is required";
    } else if (
      !/^\w+([.-]?\w+)*@(gmail|hotmail|outlook)\.com$/.test(
        form.corporative_email
      )
    ) {
      errors.corporative_email =
        "The corporative email field must be from Gmail, Outlook, or Hotmail";
    }

    if (!form.password) {
      errors.password = "The password field is required";
    } else if (form.password !== form.password2) {
      errors.password2 = "Passwords do not match";
    }

    if (!form.password2) {
      errors.password2 = "The repeat password field is required";
    }

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
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
          backdropFilter: "blur(8px)",
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
        <hr className="border-1 w-70 mb-4" style={{ borderColor: "#d4983d" }} />
        <div className="flex justify-center space-x-4 mb-4">
          <Link to="/register/candidate">
            <h2
              className="text-2xl text-white hover:text-gray-600 px-6 py-3"
              style={{ marginTop: "-40px" }}
            >
              Candidate
            </h2>
          </Link>
          <h2
            className="text-2xl"
            style={{ marginTop: "-40px", color: "var(--talent-highlight)" }}
          >
            Representative
          </h2>
        </div>
        {errors.existingUsername && (
          <p className="text-red-500">{errors.existingUsername}</p>
        )}
        {errors.existingEmail && (
          <p className="text-red-500">{errors.existingEmail}</p>
        )}

        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-wrap -mx-3"
        >
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
              <div
                className="text-md text-gray-500 mb-1 mr-2 text-right"
                style={{ marginTop: "20px", marginBottom: "0px" }}
              >
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox text-blue-500"
                    onChange={handleCheckboxChange}
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
                        className="h-6 w-6 text-yellow-500 inline-block"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </span>
                </label>
                {errors.termsCheckbox && (
                  <p className="text-red-500">{errors.termsCheckbox}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex-row space-x-24 m-auto">
            <div
              className="flex items-center justify-center h-full"
              style={{ marginTop: "2rem" }}
            >
              <p className="text-md text-white mb-1 mr-2 text-center">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-500 hover:text-blue-700"
                  style={{ marginRight: "2rem" }}
                >
                  Log in now
                </Link>
              </p>
            </div>
            <div className="mt-4">
              {MainButton("Register", "/", handleSubmit)}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
