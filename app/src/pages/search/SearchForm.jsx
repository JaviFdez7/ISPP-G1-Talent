import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import mainBackgroundRegisterLogin from "../../images/main-background2.jpg";
import axios from "axios";
import FormTextInput from "../../components/FormTextInput";
import MainButton from "../../components/mainButton";



export default function SearchForm() {
  const talentColor = "var(--talent-highlight)";
  const { login } = useAuthContext();
  const [form, setForm] = useState({
    specialty: "",
    languages:"",
    technologies: [],
    field:"",
    yearsOfExperience:"",
  });
  const relevantTechnologies = [
    // Front-end Frameworks/Libraries
    "react", "vue", "angular", "svelte",
    "next.js", "nuxt.js", "gatsby", "react-native",
    "flutter",
  
    // State Management
    "redux", "vuex", "mobx", "context-api",
    "rxjs", "akita", "ngxs",
  
    // UI Frameworks
    "material-ui", "vuetify", "bootstrap", "tailwindcss",
    "ant-design", "chakra-ui", "semantic-ui",
  
    // Back-end Frameworks
    "express", "nestjs", "koa", "fastify",
    "hapi", "spring-boot", "django", "flask",
    "ruby-on-rails", "laravel", "asp.net", "go-gin",
    "echo", "fiber",
  
    // Testing Frameworks/Libraries
    "jest", "mocha", "chai", "jasmine",
    "cypress", "selenium", "puppeteer", "testing-library",
    "karma", "enzyme",
  
    // Databases
    "mongodb", "mongoose", "mysql", "postgresql",
    "sqlite", "redis", "firebase", "oracle",
    "microsoft-sql-server", "dynamodb", "couchbase",
    "cassandra", "elasticsearch",
  
    // CI/CD Tools
    "jenkins", "travis-ci", "circleci", "github-actions",
    "gitlab-ci", "bitbucket-pipelines", "azure-pipelines",
  
    // DevOps & Virtualization
    "docker", "kubernetes", "vagrant", "ansible",
    "terraform", "puppet", "chef",
  
    // Cloud Providers/Services
    "aws", "google-cloud", "azure", "digitalocean",
    "heroku", "netlify", "vercel",
  
    // JavaScript Preprocessors
    "typescript", "babel", "coffeescript",
  
    // CSS Preprocessors
    "sass", "less", "stylus",
  
    // Build Tools & Bundlers
    "webpack", "rollup", "parcel", "gulp",
    "grunt", "broccoli",
  
    // Package Managers
    "npm", "yarn", "pnpm", "bower",
  
    // GraphQL Tools
    "apollo", "graphql", "relay",
  
    // WebAssembly
    "wasm",
  
    // Serverless Frameworks
    "serverless", "cloud-functions", "aws-lambda",
    "azure-functions",
  
    // Static Site Generators
    "jekyll", "hugo", "eleventy",
  
    // Message Brokers
    "kafka", "rabbitmq", "activemq", "zeromq",
  
    // Monitoring & Logging
    "prometheus", "grafana", "logstash", "kibana",
    "elk-stack", "datadog", "new-relic",
  
    // Other Libraries & Frameworks
    "lodash", "underscore", "moment", "date-fns",
    "rxjs", "axios", "fetch-api", "socket.io",
  ];

  const LANGUAGE_OPTIONS =[
  'Python',
  'Java',
  'C++'];
  const FIELD_OPTIONS = [
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
    field,
    yearsOfExperience,
    
  } = form;
  let navigate = useNavigate();

  function onInputChange(e) {
    const value = e.target.multiple
      ? Array.from(e.target.selectedOptions, option => option.value)
      : e.target.value;
  
    setForm({
      ...form,
      [e.target.name]: value
    });
  }
  

  async function handleSubmit(e) {
   

    try { 
      navigate(`/searches/:searchId`);
      
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
          className="flex flex-col items-center flex-wrap -mx-3"
        >
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <h3 style={{ fontSize: '0.9rem', color: 'white', fontWeight: 'bold' }}>Languages</h3>
          <select
            id="languages"
            name="languages"
            value={languages}
            onChange={(e) => onInputChange(e)}
            multiple
          >
            <option value="">Select languages</option>
            {LANGUAGE_OPTIONS.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
            <h3 style={{ fontSize: '0.9rem', color: 'white', fontWeight: 'bold' }}>Technologies</h3>
            <select
              id="technologies"
              name="technologies"
              value={technologies}
              onChange={(e) => onInputChange(e)}
              multiple
            >
              <option value="">Select field</option>
              {FIELD_OPTIONS.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
            
            <h3 style={{ fontSize: '0.9rem', color: 'white', fontWeight: 'bold' }}>Field</h3>
            <select
              id="field"
              name="field"
              value={field}
              onChange={(e) => onInputChange(e)}
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
              value={yearsOfExperience}
              onChange={(e) => onInputChange(e)}
              errors={errors}
              
            />
            <div className="flex justify-between mt-4">
              {MainButton("Search", "/searches/:searchId")}
              {MainButton("Cancel", "/searches/team")}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
