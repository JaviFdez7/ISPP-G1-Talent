import React, { useState } from "react";
import MainButton from "../../components/mainButton.jsx";
import SecondaryButton from "../../components/secondaryButton.jsx";
import '../../styles/palette.css';
import mainBackgroundRegisterLogin from "../../images/main-backgroundregisterlogin.jpg";

export default function Analyzer() {
    const textColor =  'white'
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
    <div className="h-screen flex flex-col justify-center bg-fixed home-container"
    style={{
      backgroundImage: `url(${mainBackgroundRegisterLogin})`,
      backgroundSize: "cover",
    }}>
      <div className="w-full max-w-6xl h-100 p-1 mx-auto rounded shadow-md flex flex-col justify-between"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          marginLeft: "100",
          marginRight: "100",
          borderColor: borderColor,
          borderWidth: "1px",
        }}>
        <div>
          <h2  className="text-3xl font-bold text-center mb-4 text-white">
            Enter the required data from the candidate you want to analyze and wait to get your results!
          </h2>
          <form onSubmit={(e) => handleSubmit(e)}>
                <div className="mb-4 flex items-center mt-10 ml-10 mr-10">
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

                <div className="mb-4 flex items-center mt-10 ml-10 mr-10">
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
        <div className="flex ml-80 gap-60 mb-8">
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