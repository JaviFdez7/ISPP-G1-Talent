import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import mainBackgroundRegisterLogin from "../../images/main-background2.jpg";
import axios from "axios";
import FormTextInput from "../../components/FormTextInput";
import MainButton from "../../components/mainButton";

export default function RegisterCandidate() {
  const talentColor = 'var(--talent-highlight)'
  const { login } = useAuthContext()
  const [form, setForm] = useState({
    first_name: '',
    surname: '',
    email: '',
    username: '',
    password: '',
    password2: '',
    phone_number: '',
    githubUsername: '',
    candidateSubscription: 'Basic plan',
  })
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false)
  const [errors, setErrors] = useState({})
  const {
    first_name,
    surname,
    email,
    username,
    password,
    password2,
    phone_number,
    githubUsername,
    candidateSubscription,
  } = form
  const [emailValid, setEmailValid] = useState(true);
  const [loading, setLoading] = useState(false);

  const enableValidation = import.meta.env.VITE_MAIL_VALIDATION_ENABLED==='true' || false;

  let navigate = useNavigate()

  function onInputChange(e) {
    const { name, value, checked } = e.target

    if (name === 'termsCheckbox') {
      setIsCheckboxChecked(checked)
    } else {
      setForm((prevForm) => ({ ...prevForm, [name]: value }))
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }))
  }
  const handleCheckboxChange = (e) => {
    setIsCheckboxChecked(e.target.checked)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!isCheckboxChecked) {
      setErrors({ termsCheckbox: 'You must accept the terms and conditions' })
      return
    }
    const validationErrors = validateForm()

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    if (enableValidation) {
      setLoading(true);
      const isValidEmail = await validateEmail(form.email);
      setLoading(false);
      if (!isValidEmail) {
        setEmailValid(false);
        return;
      }
    }

    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + '/user/candidate',
        {
          ...form,
          fullName: form.first_name + ' ' + form.surname,
          phone: form.phone_number,
          githubUser: form.githubUsername,
        }
      )
      if (response.status === 400) {
        const data = response.data
        setErrors(data)
        return
      }
      const userDataFetch = await axios.post(
        import.meta.env.VITE_BACKEND_URL + '/user/login',
        form
      )
      setIsCheckboxChecked(false)
      const data = userDataFetch.data.data
      login(data.token, data.user.role, data.user._id)
      navigate('/candidate/detail')
    } catch (error) {
      if (error.response.status === 409 || error.response.status === 400) {
        // set the status code properly
        setErrors(error.response.data)
        return
      }
    }
  }
  function getRequiredFieldMessage(fieldName) {
    return `The ${fieldName} field is required`
  }

  async function validateEmail(email) {
    const verifaliaUserId = 'ittalentID1111111111111111';
    const verifaliaUserPwd = 'rI8e.gOjdUWfv0';

    try {
      // Enviar solicitud de validación de correo electrónico
      const response = await axios.post(
        'https://api.verifalia.com/v2.5/email-validations',
        {
          entries: [{ inputData: email }],
        },
        {
          auth: {
            username: verifaliaUserId,
            password: verifaliaUserPwd,
          },
        }
      );
      console.log("response**********", response)
      const taskId = response.data.overview.id;
      console.log("TaskID**********", taskId)
      let taskStatus = 'InProgress';
      let result = false;
      while (taskStatus === 'InProgress') {
        const taskResponse = await axios.get(`https://api.verifalia.com/v2.5/email-validations/${taskId}`, {
          auth: {
            username: verifaliaUserId,
            password: verifaliaUserPwd,
          },
        });
        console.log("taskResponse****", taskResponse)
        taskStatus = taskResponse.status;
        result = taskResponse.data.entries.data[0].classification === 'Deliverable';
        console.log('Estado de la tarea:', taskStatus + " -- " + result);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      return result;
    } catch (error) {
      console.error('Error validating email:', error);
      return false;
    }
  }

  function validateForm() {
    let errors = {};
    if (!form.first_name) {
      errors.first_name = getRequiredFieldMessage('first name');
    } else if (form.first_name.length <= 3) {
      errors.first_name = "The first name field must be more than 3 characters";
    }
    if (!form.surname) {
      errors.surname = getRequiredFieldMessage('surname');
    } else if (form.surname.length <= 3) {
      errors.surname = "The surname field must have more than 3 characters";
    }
    if (!form.email) {
      errors.email = getRequiredFieldMessage('email');
    } else if (
      !/^\w+([.-]?\w+)*@(gmail|hotmail|outlook)\.com$/.test(form.email)
    ) {
      errors.email = "The email field must be from Gmail, Outlook or Hotmail";
    }
    if (!form.password) {
      errors.password = getRequiredFieldMessage('password');
    } else if (form.password !== form.password2) {
      errors.password2 = "Passwords do not match";
    }
    if (!form.password2) {
      errors.password2 = getRequiredFieldMessage('repeat password');
    }
    if (!form.githubUsername) {
      errors.githubUsername = getRequiredFieldMessage('github username');
    }
    if (!form.username) {
      errors.username = getRequiredFieldMessage('username');
    }
    if (form.phone_number && !/^\d{9}$/.test(form.phone_number)) {
      errors.phone_number =
        "A phone number must consist of 9 digits exclusively";
    }
    return errors;
  }

  let mobile = false;
  if (window.screen.width < 500) {
    mobile = true;
  }
  return (
    <div
      className="h-screen flex flex-col justify-center bg-fixed home-container"
      style={{
        backgroundImage: `url(${mainBackgroundRegisterLogin})`,
        backgroundSize: "cover",
        overflowY: "scroll",
      }}
    >
      <div
        className="w-10/12 p-6 self-center rounded shadow-md flex flex-col justify-between"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "50px",
          borderColor: talentColor,
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
          backdropFilter: "blur(8px)",
          borderWidth: "1px",
        }}
      >
        <h2
          className="text-2xl font-bold text-center mb-4 text-white"
          style={{ marginTop: "-40px", marginBottom: "-10px" }}
        >
          Register as
        </h2>
        <hr className="border-1 w-70 mb-4" style={{ borderColor: talentColor }} />
        <div className="flex justify-center items-center space-x-4 mb-4"
          style={{ flexDirection: mobile ? "column" : "row" }}
        >
          <h2
            className="text-2xl"
            style={{ marginTop: "-40px", color: talentColor }}
          >
            Candidate
          </h2>
          <Link to="/register/representative">
            <h2
              className="text-2xl text-white hover:text-gray-600 px-6 py-3"
              style={{ marginTop: "-40px" }}
            >
              Representantive
            </h2>
          </Link>
        </div>
        {errors && errors.errors && errors.errors[0] && errors.errors[0].detail && (
          <p className="text-red-500">{errors.errors[0].detail}</p>
        )}
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-wrap -mx-3"
        >
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <FormTextInput
              labelFor="Firstname"
              labelText="First name"
              placeholder="Enter your First name"
              name="first_name"
              value={first_name}
              onChange={(e) => onInputChange(e)}
              errors={errors}
              isMandatory
            />

            <FormTextInput
              labelFor="Surname"
              labelText="Surname"
              placeholder="Enter your Surname"
              name="surname"
              value={surname}
              onChange={(e) => onInputChange(e)}
              errors={errors}
              isMandatory
            />
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
          </div>
          <div className="w-full md:w-1/2 px-3">
            <FormTextInput
              labelFor="Email"
              labelText="Email"
              placeholder="Enter your Email"
              name="email"
              value={email}
              onChange={(e) => onInputChange(e)}
              type="email"
              errors={errors}
              isMandatory
            />
            {loading && <p className="text-white">Validating email...</p>}
            {!emailValid && <p className="text-red-500">Please use a real email.</p>}
            <FormTextInput
              labelFor="Phonenumber"
              labelText="Phone number"
              placeholder="Enter your Phone number"
              name="phone_number"
              value={phone_number}
              onChange={(e) => onInputChange(e)}
              errors={errors}
            />
            <FormTextInput
              labelFor="Githubusername"
              labelText="Github username"
              placeholder="Enter your Github username"
              name="githubUsername"
              value={githubUsername}
              onChange={(e) => onInputChange(e)}
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
                      className="text-white hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read the conditions in here
                      <svg
                        className="h-6 w-6  inline-block"
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

          <div className="flex-row space-x-24 m-auto mt-4">
            <div
              className="flex items-center justify-center h-full"
              style={{ marginTop: "3rem" }}
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
            <div className="mt-4 mb-4">
              {MainButton("Register", "/", handleSubmit)}
            </div>
          </div>
        </form>
      </div>
      <br></br>
    </div>
  );
}