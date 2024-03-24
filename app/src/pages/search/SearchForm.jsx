import React, { useState, useEffect  } from "react";
import {useNavigate } from "react-router-dom";
import mainBackgroundRegisterLogin from "../../images/main-background2.jpg";
import FormTextInput from "../../components/FormTextInput";
import MainButton from "../../components/mainButton";
const apiURL = import.meta.env.VITE_BACKEND_URL;
import axios from 'axios';


export default function SearchForm() {
  const talentColor = "var(--talent-highlight)";
  const [numForms, setNumForms] = useState(1);
  const [numError, setNumError] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [form, setForm] = useState(Array(numForms).fill({
    languages: [],
    technologies: [],
    yearsOfExperience: 0,
    field: "",
    techCategory: "",
  }));
  let searchId="";

  const [selectedTechCategory, setSelectedTechCategory] = useState("");
  const relevantTechnologies = {
    "Front-end Frameworks/Libraries": ["react", "vue", "angular", "svelte", "next.js", "nuxt.js", "gatsby", "react-native", "flutter"],
    "State Management": ["redux", "vuex", "mobx", "context-api", "rxjs", "akita", "ngxs"],
    "UI Frameworks": ["material-ui", "vuetify", "bootstrap", "tailwindcss", "ant-design", "chakra-ui", "semantic-ui"],
    "Back-end Frameworks": ["express", "nestjs", "koa", "fastify", "hapi", "spring-boot", "django", "flask", "ruby-on-rails", "laravel", "asp.net", "go-gin", "echo", "fiber"],
    "Testing Frameworks/Libraries": ["jest", "mocha", "chai", "jasmine", "cypress", "selenium", "puppeteer", "testing-library", "karma", "enzyme"],
    "Databases": ["mongodb", "mongoose", "mysql", "postgresql", "sqlite", "redis", "firebase", "oracle", "microsoft-sql-server", "dynamodb", "couchbase", "cassandra", "elasticsearch"],
    "CI/CD Tools": ["jenkins", "travis-ci", "circleci", "github-actions", "gitlab-ci", "bitbucket-pipelines", "azure-pipelines"],
    "DevOps & Virtualization": ["docker", "kubernetes", "vagrant", "ansible", "terraform", "puppet", "chef"],
    "Cloud Providers/Services": ["aws", "google-cloud", "azure", "digitalocean", "heroku", "netlify", "vercel"],
    "JavaScript Preprocessors": ["typescript", "babel", "coffeescript"],
    "CSS Preprocessors": ["sass", "less", "stylus"],
    "Build Tools & Bundlers": ["webpack", "rollup", "parcel", "gulp", "grunt", "broccoli"],
    "Package Managers": ["npm", "yarn", "pnpm", "bower"],
    "GraphQL Tools": ["apollo", "graphql", "relay"],
    "WebAssembly": ["wasm"],
    "Serverless Frameworks": ["serverless", "cloud-functions", "aws-lambda", "azure-functions"],
    "Static Site Generators": ["jekyll", "hugo", "eleventy"],
    "Message Brokers": ["kafka", "rabbitmq", "activemq", "zeromq"],
    "Monitoring & Logging": ["prometheus", "grafana", "logstash", "kibana", "elk-stack", "datadog", "new-relic"],
    "Other Libraries & Frameworks": ["lodash", "underscore", "moment", "date-fns", "rxjs", "axios", "fetch-api", "socket.io"],
  };
  const LANGUAGE_OPTIONS= {
    js: 'JavaScript', py: 'Python', ts: 'TypeScript', java: 'Java', kt: 'Kotlin', cpp: 'C++',
    c: 'C', cs: 'C#', rb: 'Ruby', go: 'Go', rs: 'Rust', php: 'PHP', ex: 'Elixir', exs: 'Elixir', scala: 'Scala',
    hs: 'Haskell', jl: 'Julia', r: 'R', swift: 'Swift', m: 'Objective-C', mm: 'Objective-C++',
    pl: 'Perl', sh: 'Shell', bat: 'Batch', ps1: 'PowerShell', lua: 'Lua', groovy: 'Groovy', clj: 'Clojure',
    cljc: 'Clojure', cljs: 'ClojureScript', elm: 'Elm', erl: 'Erlang', hrl: 'Erlang', fs: 'F#', fsi: 'F#',
    ml: 'OCaml', mli: 'OCaml', dart: 'Dart', pas: 'Pascal', dfm: 'Delphi Forms', vb: 'Visual Basic',
    vbs: 'VBScript', asm: 'Assembly', s: 'Assembly', rkt: 'Racket', scm: 'Scheme', lisp: 'Common Lisp',
    lsp: 'Common Lisp', coffee: 'CoffeeScript', tsx: 'TypeScript JSX',  jsx: 'JavaScript JSX'
    };

  const FIELD_OPTIONS = [
    'Web application','Mobile application', 'Frontend', 'DevOps', 'Backend',
    'Operating systems', 'Data science', 'Artificial intelligence', 'Security', 'Other'
  ];

  const [errors, setErrors] = useState({});
  {[...Array(numForms)].map((_, index) => {
    if (form[index]) {
      const {
        languages,
        technologies,
        field,
        yearsOfExperience,
      } = form[index];
    
    }
  })}
  let navigate = useNavigate();

  function onInputChange(e, index) {
    let value = e.target.multiple
      ? Array.from(e.target.selectedOptions, option => option.value)
      : e.target.value;
 
    if (e.target.name === 'yearsOfExperience' && value < 0) {
      value = 0; 
    }
    setForm(form => {
      const newForm = [...form];
      newForm[index] = {
        ...newForm[index],
        [e.target.name]: value
      };
      return newForm;
    });
  }

  
  
  async function handleSubmit(e) {
    e.preventDefault(); 
    console.log(form);
    try { 
      const representativeId = localStorage.getItem("userId");
      const token = localStorage.getItem("access_token");
      const config = {
          headers: { Authorization: `${token}` }
      };
  
      // Convert form object to array
      const formArray = Object.values(form);
      const formArrayWithoutTechCategory = formArray.map(obj => {
        const { techCategory, ...rest } = obj;
        return rest;
      });
  
      const response = await axios.post(
        apiURL + "/team-creator", formArrayWithoutTechCategory, config
      )
      const todosSearches = await axios.get(apiURL + "/team-creator/representative-user/" + representativeId, config);
      const lastSearch = todosSearches.data[todosSearches.data.length - 1];
      navigate("/searches/" + lastSearch._id);
    } catch (error) {
      console.log('Error in handleSubmit:', error);
      if (error.message && error.message.includes('Network Error')) {
        setErrors({ message: 'Unable to connect to the server. Please make sure the server is running and accepting connections.' });
      } else if (error.response) {
        switch (error.response.status) {
          case 400:
            setErrors({ message: 'Bad request, invalid input data.' });
            break;
          case 500:
            setErrors({ message: 'Internal server error. Please try again later' });
            break;
          default:
            setErrors({ message: 'An unknown error occurred.' });
        }
      } else {
        setErrors({ message: 'An unknown error occurred.' });
      }
      console.log(errors); // Log the errors state
    }
  }

  function onTechCategoryChange(e, index) {
    const value = e.target.value;
  
    setForm(form => {
      const newForm = [...form];
      newForm[index] = {
        ...newForm[index],
        techCategory: value
      };
      return newForm;
    });
  }
  
  useEffect(() => {
    const newForms = Array.from({length: numForms}, (_, i) => form[i] || {
      languages: [],
      technologies: [],
      yearsOfExperience: 0,
      field: "",
    });

    setForm(newForms);
  }, [numForms]);



  return (
    <div
      className="h-screen flex flex-col bg-fixed home-container"
      style={{
        backgroundImage: `url(${mainBackgroundRegisterLogin})`,
        backgroundSize: "cover",
        overflowY: "scroll",
        overflowX: "hidden",
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:'50px' }}>
        <label htmlFor="numForms" style={{ color: 'white',
                 marginRight: '10px'  }}>Select number of Candidates: </label>
        <input
            type="number"
            id="numForms"
            name="numForms"
            min="1"
            max="5"
            value={numForms}
            onChange={(e) => {
              setNumForms(Number(e.target.value));
            }}
            onBlur={(e) => {
              let value = Number(e.target.value);
              if (value < 1) {
                setNumForms(1);
                setNumError('The number must be between 1 and 5');
              } else if (value > 5) {
                setNumForms(5);
                setNumError('The number must be between 1 and 5');
              } else {
                setNumError('');  
              }
            }}
          />
         {numError && <p style={{ color: 'orange', marginLeft: '20px' }}>{numError}</p>}
      </div>
      
      <form
              onSubmit={(e) => handleSubmit(e)}
              className="flex flex-col items-center flex-wrap -mx-3"
            >
      {[...Array(numForms)].map((_, index) => (
        <div key={index} style={{ marginTop: "40px" }}>
          
            <div
              className="w-full max-w-4xl h-100 p-8 m-4 rounded shadow-md flex flex-col justify-between items-center"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "00px",
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
                Enter the search filters for candidate {index +1}
              </h2>
              {errors.message && <p style={{ color: 'white' }}>{errors.message}</p>}
              <hr className="border-1 w-70 mb-4" style={{ borderColor: talentColor }} />
              
              {errors.errors && errors.errors[0] && errors.errors[0].detail && (
                <p className="text-red-500">{errors.errors[0].detail}</p>
              )}
              
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <h3 style={{ fontSize: '0.9rem', color: 'white', fontWeight: 'bold' }}>Languages</h3>
                <select
                  id="languages"
                  name="languages"
                  value={form[index]?.languages}
                  onChange={(e) => onInputChange(e, index)}
                  multiple
                >
                  <option value="">Select languages</option>
                  { Object.values(LANGUAGE_OPTIONS).map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
                <h3 style={{ fontSize: '0.9rem', color: 'white', fontWeight: 'bold' }}>Technology Category</h3>
                <select
                    id="techCategory"
                    name="techCategory"
                    value={form[index]?.techCategory}
                    onChange={(e) => onTechCategoryChange(e, index)}
                  >
                  <option value="">Select technology category</option>
                  {Object.keys(relevantTechnologies).map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </select>
                <h3 style={{ fontSize: '0.9rem', color: 'white', fontWeight: 'bold' }}>Technologies</h3>
                <select
                  id="technologies"
                  name="technologies"
                  value={form[index]?.technologies}
                  onChange={(e) => onInputChange(e, index)}
                  multiple
                >
                  <option value="">Select technologies</option>
                  {form[index]?.techCategory && relevantTechnologies[form[index]?.techCategory].map((tech, index) => (
                    <option key={index} value={tech}>{tech}</option>
                  ))}
                </select>
                  
                <h3 style={{ fontSize: '0.9rem', color: 'white', fontWeight: 'bold' }}>Field</h3>
                  <select
                    id="field"
                    name="field"
                    value={form[index]?.field}
                    onChange={(e) => onInputChange(e, index)}
                  >
                    <option value="">Select field</option>
                    {FIELD_OPTIONS.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </select>
                  <FormTextInput
                    labelFor="yearsOfExperience"
                    labelText="Years of Experience"
                    placeholder="Enter years of Experience"
                    name="yearsOfExperience"
                    type="number"
                    min="0"
                    value={form[index]?.yearsOfExperience}
                    onChange={(e) => onInputChange(e, index)}
                    errors={errors}
                  />
                                    
                </div>
            </div>
            
          
        </div>
      ))}
      <div className="flex justify-center mt-4">
                    {MainButton("Search",  "", handleSubmit)}
                    {MainButton("Cancel", "/searches/team")}
            </div>
      </form>
      
    </div>
  );
}
