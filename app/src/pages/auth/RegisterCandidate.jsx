import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import mainBackgroundRegisterLogin from "../../images/main-background2.jpg";
import axios from "axios";
import FormTextInput from "../../components/FormTextInput";
import MainButton from "../../components/mainButton";
import SecondaryButton from "../../components/secondaryButton";
// Componente de términos y condiciones
const TermsAndConditions = ({ handleClose, handleAccept }) => {
  return (
    <div className="modal" style={{
      display: "block",
      position: "fixed",
      zIndex: 1,
      left: 0,
      top: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.5)",
    }}>
      <div className="modal-content" style={{
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        margin: "15% auto",
        padding: "20px",
        border: "1px solid var(--talent-highlight)",
        width: "80%",
        maxWidth: "600px",
      }}>
        <div className="terms-container" style={{ overflowY: "scroll", scrollbarWidth: "5%", scrollbarColor: "red", maxHeight: "50vh" }}>
        <pre style={{ color: "white", whiteSpace: "pre-wrap", fontFamily: "monospace" }}>
            {`
1. Terms of Service
1.1 Acceptable Use
    Use of the services provided by IT Talent is subject to the following terms of acceptable use:
        ●	Users must provide truthful and up-to-date information in their profiles.
        ●	Use of the platform for illegal or unethical purposes is not permitted.
        ●	Manipulation of search results or interference with the proper functioning of the platform is prohibited.
        ●	Users must comply with all applicable laws and regulations in their use of the Services.
1.2 Term and Termination
    This agreement will be effective from the date the user accesses IT Talent services and will continue until terminated by either party:
        A.	Termination by User
            User may terminate this Agreement at any time by simply ceasing to use the Service. Additionally, if you wish, you can proceed to delete your account.
        B.	Termination by IT Talent
            IT Talent reserves the right to terminate this Agreement or suspend the user's access to the Service in cases of actual unauthorized use of the Service, or in case of breach of this Agreement by the user. In such situations, IT Talent will provide the user with reasonable notice and the opportunity to correct the situation before proceeding with the termination of the agreement. However, in cases where the user's actions give rise to potential legal liability, IT Talent reserves the right to take action.
        C.	Effects of Termination
            Upon termination of this Agreement, User's right to use the Service will immediately cease. In the event of termination of the user's account, IT Talent may, in its sole discretion, delete the user's account and any related data.
        D.	Survival
            Any provisions of this Agreement which by their nature should survive termination hereof shall remain in full force and effect after such termination. This includes ownership provisions, warranty disclaimers, and limitations of liability.
1.3 Privacy Policy and GDPR
    IT Talent is committed to protecting the privacy of its users. Our privacy policy describes how we collect, use and protect personal information provided by users in accordance with the General Data Protection Regulation (GDPR).
        Data Collection and Use
            I.	Personal Data Collected : IT Talent collects personal data from users, including names, email addresses, contact information, and data relevant to job searches such as skills and work experience.
            II.	User Consent : Before a user can create an account on IT Talent, they are presented with a form where they must give their express consent for the processing of their personal data in accordance with the terms established in our privacy policy.
        User Rights
            I.	Data Access and Rectification : Users have the right to access and correct their personal data stored on the platform.
            II.	Data Deletion : Users may request the deletion of their personal data when it is no longer necessary for the purposes for which it was collected.
            III.	Data Portability : Users have the right to request the transfer of their data to another service.
        Data Security
            IT Talent implements security measures to protect user information against unauthorized access, disclosure, alteration or loss of data. These measures include data encryption, access control, and continuous platform monitoring.
1.4 Intellectual Property
    All intellectual property rights related to IT Talent's services, including but not limited to software, design, and content, are the exclusive property of IT Talent. Users have no right to use, copy or distribute such materials without the express consent of IT Talent.
2. Prices and Services
2.1 Plans for Companies
    Basic Plan: €30/month
        ●	Up to 25 candidate searches per month.
        ●	Individual and team search of up to 3 people.
        ●	No scrolling between candidate options.
        ●	Basic filters available.
        ●	30-day free trial.
    Advanced Plan: €80/month
        ●	Up to 150 candidate searches per month.
        ●	Search for teams of up to 5 people.
        ●	Scroll up to 10 different options for each of the results in team searches.
        ●	All filters available.
        ●	Candidate profile statistics.
        ●	Shorter response times.
        ●	Priority support.
    Custom Plan: Customized pricing and features on demand.
2.2 Plans for Users in Job Search
    Basic Plan: Free
        ●	All the basic functionalities of the application.
        ●	Possibility of updating data every 30 days.
    Advanced Plan: €10/month
        ●	All the features of the previous plan.
        ●	Ability to update data three times every 30 days.
        ●	Ability to see which companies have viewed your profile.
        ●	Advanced application statistics.
3. SLAS (Service Level Agreements)
3.1 Service Level Indicators (SLI)
    The following service level indicators apply to IT Talent services:
    Service Availability: IT Talent will endeavor to maintain 80% service availability.
    Response Time: IT Talent is committed to providing an average response time of less than 5 ms for user requests.
3.2 Service Level Objectives (SLO)
    The following service level objectives apply to IT Talent services:
        ●	Problem Resolution : IT Talent is committed to resolving any problem reported by users within a maximum period of 48 hours if it is a company with a basic plan and 24 hours if it has a priority plan.
        ●	Data Update : IT Talent will endeavor to update user data within a maximum period of 24 hours.
3.3 Compensations
  In the event of non-compliance with the service level indicators or objectives mentioned above, IT Talent will offer compensation to affected users, which may include free subscription extensions or partial refunds, as determined by IT Talent.

We reserve the right to modify this agreement at any time and the user will be notified accordingly. The user must therefore accept the new terms in order to continue using the service.
If you have any questions about these terms, please contact us at: ittalentofficial@outlook.com
            `}
          </pre>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px'
          }}>
            {SecondaryButton('Cancel', '', handleClose)}
            {MainButton('Accept', '', handleAccept)}
          </div>
        </div>
      </div>
    </div>
  );
};
export default function RegisterCandidate() {
  const talentColor = "var(--talent-highlight)";
  const { login } = useAuthContext();
  const [form, setForm] = useState({
    first_name: "",
    surname: "",
    email: "",
    username: "",
    password: "",
    password2: "",
    phone_number: "",
    github_username: "",
    candidateSubscription: "Basic plan",
  });
  const [showModal, setShowModal] = useState(false);

  const showModalHandler = () => {
    setShowModal(true);
  };

  const hideModalHandler = () => {
    setIsCheckboxChecked(false);
    setShowModal(false);
  };
  const acceptTermsHandler = () => {
    setIsCheckboxChecked(true);
    setShowModal(false);
  };
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [errors, setErrors] = useState({});
  const {
    first_name,
    surname,
    email,
    username,
    password,
    password2,
    phone_number,
    github_username,
    candidateSubscription,
  } = form;
  let navigate = useNavigate();

  function onInputChange(e) {
    const { name, value, checked } = e.target;
  
    if (name === "termsCheckbox") {
      setIsCheckboxChecked(checked);
    } else {
      setForm(prevForm => ({ ...prevForm, [name]: value }));
    }
  
    setErrors(prevErrors => ({ ...prevErrors, [name]: undefined }));
  }
  const handleCheckboxChange = (e) => {
    setIsCheckboxChecked(e.target.checked);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!isCheckboxChecked) {
      setErrors({ termsCheckbox: "You must read and accept the terms and conditions" });
      return;
    }
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/user/candidate",
        {
          ...form,
          fullName: form.first_name + " " + form.surname,
          phone: form.phone_number,
          githubUser: form.github_username,
        }
      );
      if (response.status === 400) {
        const data = response.data;
        setErrors(data);
        return;
      }
      const userDataFetch = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/user/login", form
      );
      setIsCheckboxChecked(false);
      const data = userDataFetch.data.data;  
      login(data.token, data.user.role, data.user._id);
      navigate("/candidate/detail");

    } catch (error) {
      if (error.response.status === 409)  {
        console.log(error);
        setErrors(error.response.data);
        return;
      }
    }
  }
  function getRequiredFieldMessage(fieldName) {
    return `The ${fieldName} field is required`;
  }

  function validateForm() {
    let errors = {};
    if (!form.first_name) {
      errors.first_name = getRequiredFieldMessage('name');
    } else if (form.first_name.length <= 3) {
      errors.first_name = "The name field must be more than 3 characters";
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
    if (!form.github_username) {
      errors.github_username = getRequiredFieldMessage('github username');
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
        className="w-full max-w-4xl h-100 p-8 m-4 rounded shadow-md flex flex-col justify-between"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "150px",
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
        <div className="flex justify-center space-x-4 mb-4">
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
       {console.log(errors)}
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
              name="github_username"
              value={github_username}
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
                  onChange={(e) => e.preventDefault()}
                  onClick={showModalHandler}
                  checked={isCheckboxChecked}
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
        {showModal && <TermsAndConditions handleClose={hideModalHandler} handleAccept={acceptTermsHandler} />}
      </div>
    </div>
  );
}
