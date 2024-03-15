import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import mainBackgroundRegisterLogin from "../../images/main-background2.jpg";
import axios from "axios";
import FormTextInput from "../../components/FormTextInput";
import MainButton from "../../components/mainButton";

export default function RegisterRepresentative() {
  const talentColor = "var(--talent-highlight)";
  const { login } = useAuthContext();
  const [form, setForm] = useState({
    specialty: "",
    languages:"",
    technologies:"",
    experience:"",
    lifestyle:"",
  });

  const EXPERIENCE_OPTIONS = [
    'Web application',
    'Mobile application',
    'Frontend',
    'DevOps',
    'Backend',
    'Operating systems',
    'Data science',
    'Artificial intelligence',
    'Security',
    'Other'
  ];
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [errors, setErrors] = useState({});
  const {
    specialty,
    languages,
    technologies,
    experience,
    lifestyle,
    
  } = form;
  let navigate = useNavigate();

  function onInputChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
   
  }
  

  async function handleSubmit(e) {
   

    try {
      
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrors(error.response.data);
      }
    }
  }
  function getRequiredFieldMessage(fieldName) {
    return `The ${fieldName} field is required`;
  }
  
  function validateForm() {
   
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
          marginTop: "80px",
          marginBottom: "20px",
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
          Enter the search filters
        </h2>
        <hr className="border-1 w-70 mb-4" style={{ borderColor: talentColor }} />
        
        {errors.errors && errors.errors[0] && errors.errors[0].detail && (
          <p className="text-red-500">{errors.errors[0].detail}</p>
        )}
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-wrap -mx-3"
        >
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <FormTextInput
              labelFor="Specialty"
              labelText="Specialty"
              placeholder="Enter Specialty"
              name="specialty"
              value={specialty}
              onChange={(e) => onInputChange(e)}
              errors={errors}
              
            />
            <FormTextInput
              labelFor="Languages"
              labelText="Languages"
              placeholder="Enter Languages"
              name="languages"
              value={languages}
              onChange={(e) => onInputChange(e)}
              errors={errors}
              
            />
            <FormTextInput
              labelFor="Technologies"
              labelText="Technologies"
              placeholder="Enter Technologies"
              name="technologies"
              value={technologies}
              onChange={(e) => onInputChange(e)}
              errors={errors}
              
            />
            <h3 style={{ fontSize: '0.9rem', color: 'white', fontWeight: 'bold' }}>Experience</h3>
            <select
              id="experience"
              name="experience"
              value={experience}
              onChange={(e) => onInputChange(e)}
            >
              <option value="">Select experience</option>
              {EXPERIENCE_OPTIONS.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
            <h3 style={{ fontSize: '0.9rem', color: 'white', fontWeight: 'bold' }}>Lifestyle</h3>
            <select
                id="lifestyle"
                name="lifestyle"
                value={lifestyle}
                onChange={(e) => onInputChange(e)}
            >
                <option value="">Select lifestyle</option>
                <option value="on-site">On-site</option>
                <option value="telematic">Telematic</option>
            </select>
            <div className="mt-4">
              {MainButton("Register", "/", handleSubmit)}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
