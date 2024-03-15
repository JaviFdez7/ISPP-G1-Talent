import { useState, useEffect } from 'react';
import MainButton from "../../components/mainButton.jsx";
import SecondaryButton from "../../components/secondaryButton.jsx";
import '../../styles/palette.css';
import mainBackgroundRegisterLogin from "../../images/main-backgroundregisterlogin.jpg";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function Analyzer() {
  const textColor = 'white'
  const borderColor = 'var(--talent-highlight)'
  const asteriskColor = 'var(--talent-highlight-background)'
  const navigate = useNavigate();
  const ruta = import.meta.env.VITE_BACKEND_URL;
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  useEffect(() => {
    if (loading) {
      setLoadingMessage('Loading...');
    } else {
      setLoadingMessage('');
    }
  }, [loading]);



  const [form, setForm] = useState({
    githubUser: "",
    githubToken: "",
  });

  const [errors, setErrors] = useState({});

  const { githubUser, githubToken } = form;

  function onInputChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setErrors({});
  }

  async function saveAnalysisHistory(currentAnalysisId) {
    const currentUserId = localStorage.getItem("userId");
    const uri = `/user/${currentUserId}/history`;
    try {
      const response = await axios.post(ruta + uri, { analysisId: currentAnalysisId });
      return response.data.data;
    } catch (error) {
      setErrorMessage('Unable to connect to the server. Please try again later.');
      console.error("Error while creating history of current analysis: ", error);
      throw error;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.githubUser) {
      setErrors({
        githubUser: form.githubUser ? '' :
          <span style={{ color: 'orange', fontSize: '15px' }}>{"--->"}Github User is required</span>,
      });
      return;
    }

    setLoading(true);

    try {
      try {
        const userResponse = await fetch(`${ruta}/analysis/github/${form.githubUser}`);
        if (userResponse.ok) {
          const userData = await userResponse.json();
          saveAnalysisHistory(userData.data._id);
          setLoadingMessage('');
          navigate('/analysis/' + form.githubUser);
          return;
        }
      } catch (error) {
        console.log("User analysis not found: ", error);
      }

      const response = await fetch(`${ruta}/analysis`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: form.githubUser,
          apikey: form.githubToken
        })
      });

      const responseData = await response.json();
      saveAnalysisHistory(responseData.data._id);

      setLoading(false);
      if (response.status == 500) {
        setErrors({
          githubUser: <span style={{ color: 'orange', fontSize: '15px' }}>{"--->"}This user does not exist in Github</span>,
        });
      }
      if (!response.ok) {
        console.error('An error occurred:', await response.text());
        return;
      }

      navigate('/analysis/' + form.githubUser);

    } catch (error) {
      setLoadingMessage('Unable to connect to the server. Please try again later.');
      console.error("An error ocurred while performing analysis: ", error);
    }
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
          <h2 className="text-3xl font-bold text-center mb-4 text-white">
            Enter the required data from the candidate you want to analyze and wait to get your results!
          </h2>
          {loadingMessage && (
            <div className="text-center text-white">
              {loadingMessage}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4 flex items-center mt-10 ml-10 mr-10">
              <label
                htmlFor="GithubUser"
                style={{ color: textColor, fontSize: '1.5rem', marginRight: '1rem', whiteSpace: 'nowrap' }}
              >
                Github User
                <span style={{ color: asteriskColor }}> *</span>
              </label>
              <input
                type="text"
                className="w-3/5 px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                placeholder="Enter candidate GitHub username"
                name="githubUser"
                value={githubUser}
                onChange={(e) => onInputChange(e)}
              />
              {errors.githubUser && (
                <p className="text-red-500 text-xs italic">{errors.githubUser}</p>

              )}
              {errors.errors && errors.errors[0] && errors.errors[0].detail && (
                <p className="text-red-500">{errors.errors[0].detail}</p>
              )}

            </div>

            <div className="mb-4 flex items-center mt-10 ml-10 mr-10">
              <label
                htmlFor="GithubToken"
                style={{ color: textColor, fontSize: '1.5rem', marginRight: '1.1rem', whiteSpace: 'nowrap' }}
              >
                Github Token
              </label>
              <input
                type="text"
                className="w-3/5  px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                placeholder="Enter candidate GitHub token"
                name="githubToken"
                value={githubToken}
                onChange={(e) => onInputChange(e)}
              />
              {errors.githubToken && (
                <p className="text-red-500 text-xs italic">{errors.githubToken}</p>
              )}

            </div>

            <h2 style={{ color: 'white', textAlign: 'center', fontSize: '1rem' }}>
              Remember that the analyzed data will remain stored in the website. Be catious who you are analyzing and ensure you obtain their permission beforehand.
            </h2>

            <div className="flex ml-40 gap-60 mb-8">
              {MainButton("Analyze", "", handleSubmit)}
              {SecondaryButton("Cancel", "/representative/detail", "")}
              {SecondaryButton("Analyses list", "/analysis/list", "")}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}