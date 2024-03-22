import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import mainBackgroundRegisterLogin from "../../images/main-background2.jpg";
import axios from "axios";
import FormTextInput from "../../components/FormTextInput";
import MainButton from "../../components/mainButton";
import Input from "../../components/Input.jsx";

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
          style={{flexDirection: mobile ? "column" : "row"}}
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
          style={{fontSize: "18px"}}
        >
          <div className="w-full flex flex-col justify-around md:w-1/2 px-3 mb-6 md:mb-0">

            {Input({name:'First name', value:first_name, editable:true, placeholder:"Enter your First name", 
            onChange:(e) => onInputChange(e), formName:"first_name", col:mobile, isMandatory:true, errors:errors})}

            {Input({name:'Surname', value:surname, editable:true, placeholder:"Enter your Surname", 
            onChange:(e) => onInputChange(e), formName:"surname", col:mobile, isMandatory:true, errors:errors})}

            {Input({name:'Username', value:username, editable:true, placeholder:"Enter your Username", 
            onChange:(e) => onInputChange(e), formName:"username", col:mobile, isMandatory:true, errors:errors})}

            {Input({name:'Password', value:password, editable:true, placeholder:"Enter your Password", 
            onChange:(e) => onInputChange(e), formName:"password", col:mobile, isMandatory:true, errors:errors, type:"password"})}

            {Input({name:'Repeat Password', value:password2, editable:true, placeholder:"Enter your Password again", 
            onChange:(e) => onInputChange(e), formName:"password2", col:mobile, isMandatory:true, errors:errors, type:"password"})}

          </div>
          <div className="w-full flex flex-col justify-around md:w-1/2 px-3 mb-6 md:mb-0">

            {Input({name:'Email', value:email, editable:true, placeholder:"Enter your Email", 
            onChange:(e) => onInputChange(e), formName:"email", col:mobile, isMandatory:true, errors:errors, type:"email"})}

            {Input({name:'Phone number', value:phone_number, editable:true, placeholder:"Enter your Phone number", 
            onChange:(e) => onInputChange(e), formName:"phone_number", col:mobile, errors:errors})}

            {Input({name:'Github username', value:githubUsername, editable:true, placeholder:"Enter your Phone number", 
            onChange:(e) => onInputChange(e), formName:"githubUsername", col:mobile, isMandatory:true, errors:errors})}

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
