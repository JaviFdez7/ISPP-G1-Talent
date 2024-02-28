import React, { useState } from "react";
import { Link } from "react-router-dom";
import MainButton from "../../components/mainButton.jsx";
import SecondaryButton from "../../components/secondaryButton.jsx";
import Input from "../../components/Input"
import InputList from "../../components/InputList"
import '../../styles/palette.css';

export default function Analyzer() {
    const textColor =  'var(--talent-white-text)'
    const backgroundColor = 'var(--talent-secondary)'
    const borderColor = 'var(--talent-highlight)'
    const boxColor ='var(--talent-dark-background)'
    const asteriskColor = 'var(--talent-highlight-background)'


  const [form, setForm] = useState({
    name: "",
    githubUser: "",
    githubToken: "",
  });

  const [errors, setErrors] = useState({});

  const { name, githubUser, githubToken } = form;

  function onInputChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setErrors({});
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.name || !form.githubUser) {
        setErrors({
          name: form.name ? '' : 'Name is required',
          githubUser: form.githubUser ? '' : 'Github User is required',
        });
        return;
    }

    //FUNCION DE BUSQUEDA DE CANDIDATO

  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen" style={{backgroundColor: backgroundColor}}>
      <div className="w-full max-w-5xl h-500 p-8 m-4 rounded shadow-md flex flex-col justify-between " 
            style={{backgroundColor: boxColor, borderColor: borderColor, borderWidth:'1px'}}>
        <div>
          <h2 style={{ color: textColor, textAlign: 'center', fontSize: '2rem' }}>
            Enter the required data from the candidate you want to analyze and wait to get your results!
          </h2>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="mb-4 flex items-center mt-10">
                <label
                    htmlFor="Name"
                    style={{ color: textColor, fontSize: '1.5rem', marginRight: '5rem', whiteSpace: 'nowrap' }} // Ajusta el valor aquí
                    >
                    Name
                    <span style={{ color:asteriskColor }}> *</span>
            </label>
                <input
                    type="text"
                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    placeholder="Enter candidate name"
                    name="name"
                    value={name}
                    onChange={(e) => onInputChange(e)}
                />
                {errors.name && (
                    <p className="text-red-500 text-xs italic">{errors.name}</p>
                )}
                </div>

                <div className="mb-4 flex items-center mt-10">
                <label
                    htmlFor="GithubUser"
                    style={{ color:  textColor, fontSize: '1.5rem', marginRight: '1rem' , whiteSpace: 'nowrap' }}
                >
                    Github User
                    <span style={{ color: asteriskColor }}> *</span>
                </label>
                <input
                    type="text"
                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    placeholder="Enter candidate GitHub username"
                    name="githubUser"
                    value={githubUser}
                    onChange={(e) => onInputChange(e)}
                />
                {errors.githubUser && (
                    <p className="text-red-500 text-xs italic">{errors.githubUser}</p>
                )}
                </div>

                <div className="mb-4 flex items-center mt-10">
                <label
                    htmlFor="GithubToken"
                    style={{ color: textColor, fontSize: '1.5rem', marginRight: '1.1rem' , whiteSpace: 'nowrap' }}
                >
                    Github Token     
                </label>
                <input
                    type="password"
                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    placeholder="Enter candidate GitHub token"
                    name="githubToken"
                    value={githubToken}
                    onChange={(e) => onInputChange(e)}
                />
                {errors.githubToken && (
                    <p className="text-red-500 text-xs italic">{errors.githubToken}</p>
                )}
            </div>
          </form>
          <h2 style={{ color: 'white', textAlign: 'center', fontSize: '1rem' }}>
                 Remember that the analyzed data will remain stored in the website. Be catious who you are analyzing and ensure you obtain their permission beforehand.
          </h2>
        </div>
        <div className="flex ml-60 gap-60 mt-12">
          {MainButton("Analyze", "", "")}
          {SecondaryButton("Cancel", "", "")}
        
        </div>
            {errors.detail && (
            <p className="text-red-500 text-base italic">{errors.detail}</p>
            )}
      </div>
    </div>
  );
}