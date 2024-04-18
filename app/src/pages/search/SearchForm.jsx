import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import mainBackgroundRegisterLogin from '../../images/main-background2.jpg'
import FormTextInput from '../../components/FormTextInput'
import MainButton from '../../components/mainButton'
import SecondaryButton from '../../components/secondaryButton'
import GroupedSelect from '../../components/GroupedSelect'
const apiURL = import.meta.env.VITE_BACKEND_URL
import axios from 'axios'
import Select from 'react-select'
import { useAuthContext } from './../../context/authContext';

export default function SearchForm() {
	const talentColor = 'var(--talent-highlight)'
	const [numForms, setNumForms] = useState(1)
	const [numError, setNumError] = useState('')
	const userId = localStorage.getItem('userId')
	const { subscription } = useAuthContext();

	const [errorMessage, setErrorMessage] = useState('')
	const [form, setForm] = useState(
		Array(numForms).fill({
			languages: [],
			technologies: [],
			yearsOfExperience: 0,
			field: '',
		})
	)
	const [numOptions, setNumOptions] = useState([])

	const relevantTechnologies = {
		'Front-end Frameworks/Libraries': [
			'react',
			'vue',
			'angular',
			'svelte',
			'next.js',
			'nuxt.js',
			'gatsby',
			'react-native',
			'flutter',
		],
		'State Management': ['redux', 'vuex', 'mobx', 'context-api', 'rxjs', 'akita', 'ngxs'],
		'UI Frameworks': [
			'material-ui',
			'vuetify',
			'bootstrap',
			'tailwindcss',
			'ant-design',
			'chakra-ui',
			'semantic-ui',
		],
		'Back-end Frameworks': [
			'express',
			'nestjs',
			'koa',
			'fastify',
			'hapi',
			'spring-boot',
			'django',
			'flask',
			'ruby-on-rails',
			'laravel',
			'asp.net',
			'go-gin',
			'echo',
			'fiber',
		],
		'Testing Frameworks/Libraries': [
			'jest',
			'mocha',
			'chai',
			'jasmine',
			'cypress',
			'selenium',
			'puppeteer',
			'testing-library',
			'karma',
			'enzyme',
		],
		Databases: [
			'mongodb',
			'mongoose',
			'mysql',
			'postgresql',
			'sqlite',
			'redis',
			'firebase',
			'oracle',
			'microsoft-sql-server',
			'dynamodb',
			'couchbase',
			'cassandra',
			'elasticsearch',
		],
		'CI/CD Tools': [
			'jenkins',
			'travis-ci',
			'circleci',
			'github-actions',
			'gitlab-ci',
			'bitbucket-pipelines',
			'azure-pipelines',
		],
		'DevOps & Virtualization': [
			'docker',
			'kubernetes',
			'vagrant',
			'ansible',
			'terraform',
			'puppet',
			'chef',
		],
		'Cloud Providers/Services': [
			'aws',
			'google-cloud',
			'azure',
			'digitalocean',
			'heroku',
			'netlify',
			'vercel',
		],
		'JavaScript Preprocessors': ['typescript', 'babel', 'coffeescript'],
		'CSS Preprocessors': ['sass', 'less', 'stylus'],
		'Build Tools & Bundlers': ['webpack', 'rollup', 'parcel', 'gulp', 'grunt', 'broccoli'],
		'Package Managers': ['npm', 'yarn', 'pnpm', 'bower'],
		'GraphQL Tools': ['apollo', 'graphql', 'relay'],
		WebAssembly: ['wasm'],
		'Serverless Frameworks': ['serverless', 'cloud-functions', 'aws-lambda', 'azure-functions'],
		'Static Site Generators': ['jekyll', 'hugo', 'eleventy'],
		'Message Brokers': ['kafka', 'rabbitmq', 'activemq', 'zeromq'],
		'Monitoring & Logging': [
			'prometheus',
			'grafana',
			'logstash',
			'kibana',
			'elk-stack',
			'datadog',
			'new-relic',
		],
		'Other Libraries & Frameworks': [
			'lodash',
			'underscore',
			'moment',
			'date-fns',
			'rxjs',
			'axios',
			'fetch-api',
			'socket.io',
		],
	}
	const options = Object.entries(relevantTechnologies).map(([label, options]) => ({
		label,
		options: options.map((value) => ({ value, label: value })),
	}))
	const LANGUAGE_OPTIONS = {
		js: 'JavaScript',
		py: 'Python',
		ts: 'TypeScript',
		java: 'Java',
		kt: 'Kotlin',
		cpp: 'C++',
		c: 'C',
		cs: 'C#',
		rb: 'Ruby',
		go: 'Go',
		rs: 'Rust',
		php: 'PHP',
		ex: 'Elixir',
		exs: 'Elixir',
		scala: 'Scala',
		hs: 'Haskell',
		jl: 'Julia',
		r: 'R',
		swift: 'Swift',
		m: 'Objective-C',
		mm: 'Objective-C++',
		pl: 'Perl',
		sh: 'Shell',
		bat: 'Batch',
		ps1: 'PowerShell',
		lua: 'Lua',
		groovy: 'Groovy',
		clj: 'Clojure',
		cljc: 'Clojure',
		cljs: 'ClojureScript',
		elm: 'Elm',
		erl: 'Erlang',
		hrl: 'Erlang',
		fs: 'F#',
		fsi: 'F#',
		ml: 'OCaml',
		mli: 'OCaml',
		dart: 'Dart',
		pas: 'Pascal',
		dfm: 'Delphi Forms',
		vb: 'Visual Basic',
		vbs: 'VBScript',
		asm: 'Assembly',
		s: 'Assembly',
		rkt: 'Racket',
		scm: 'Scheme',
		lisp: 'Common Lisp',
		lsp: 'Common Lisp',
		coffee: 'CoffeeScript',
		tsx: 'TypeScript JSX',
		jsx: 'JavaScript JSX',
	}
	const languageOptions = Object.values(LANGUAGE_OPTIONS).map((option) => ({
		value: option,
		label: option,
	}))

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
		'Other',
	]
	const fieldOptions = FIELD_OPTIONS.map((option) => ({ value: option, label: option }))

	const [errors, setErrors] = useState({})
	{
		;[...Array(numForms)].map((_, index) => {
			if (form[index]) {
				const { languages, technologies, field, yearsOfExperience } = form[index]
			}
		})
	}
	let navigate = useNavigate()

	function onInputChange(e, index) {
		let value
		if (e.target) {
			value = Array.isArray(e.target.value)
				? e.target.value.map((option) => option.value)
				: e.target.value
		} else {
			value = Array.isArray(e) ? e.map((option) => option.value) : e.value
		}
		if (e.target?.name === 'yearsOfExperience' && value < 0) {
			value = 0
		}

		setForm((form) => {
			const newForm = [...form]
			newForm[index] = {
				...newForm[index],
				[e.target ? e.target.name : 'technologies']: value,
			}
			return newForm
		})
	}

	async function handleSubmit(e) {
		e.preventDefault()
		try {
			const representativeId = localStorage.getItem('userId')
			const token = localStorage.getItem('access_token')
			const config = {
				headers: { Authorization: `${token}` },
			}
			const subscription = localStorage.getItem('subscriptionType')
			
			const formArray = Object.values(form)
			const response = await axios.post(apiURL + '/team-creator', formArray, config)
			const todosSearches = await axios.get(
				apiURL + '/team-creator/representative-user/' + representativeId,
				config
			)
			const lastSearch = todosSearches.data.data[todosSearches.data.data.length - 1]
			navigate('/searches/' + lastSearch._id)
		} catch (error) {
			if (error.message && error.message.includes('Network Error')) {
				setErrors({
					message:
						'Unable to connect to the server. Please make sure the server is running and accepting connections.',
				})
			} else if (error.response) {
				switch (error.response.status) {
					case 400:
						setErrors({ message: 'Bad request, invalid input data.' })
						break
					case 500:
						setErrors({ message: 'Internal server error. Please try again later' })
						break
					default:
						setErrors({ message: 'An unknown error occurred.' })
				}
			} else {
				setErrors({ message: 'An unknown error occurred.' })
			}
		}
	}

	useEffect(() => {
		if (subscription) {
		  if (subscription.toLowerCase() == 'basic plan') {
			setNumOptions([
			  { value: 1, label: '1' },
			  { value: 2, label: '2' },
			  { value: 3, label: '3' },
			])
		  } else {
			setNumOptions([
			  { value: 1, label: '1' },
			  { value: 2, label: '2' },
			  { value: 3, label: '3' },
			  { value: 4, label: '4' },
			  { value: 5, label: '5' },
			])
		  }
		}
	  }, [subscription]);

	useEffect(() => {
		const newForms = Array.from(
			{ length: numForms },
			(_, i) =>
				form[i] || {
					languages: [],
					technologies: [],
					yearsOfExperience: 0,
					field: '',
				}
		)

		setForm(newForms)
	}, [numForms, numOptions])

	
	return (
		<div
			className='min-h-screen flex flex-col bg-fixed home-container'
			style={{
				backgroundImage: `url(${mainBackgroundRegisterLogin})`,
				backgroundSize: 'cover',
				overflowY: 'scroll',
				overflowX: 'hidden',
			}}>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					marginTop: '50px',
				}}>
				<label htmlFor='numForms' style={{ color: 'white', marginRight: '5px' }}>
					Select between 1 and 5 candidates to search for:
				</label>
				<Select
					id='numForms'
					name='numForms'
					value={options.find((option) => option.value === numForms)}
					onChange={(selectedOption) => {
						let value = selectedOption ? Number(selectedOption.value) : 0
						setNumForms((prevNumForms) => {
							if (value > numOptions.length) {
								return numOptions.length
							} else {
								return value
							}
						})
					}}
					options={numOptions}
				/>
			</div>

			<form
				onSubmit={(e) => handleSubmit(e)}
				className='flex flex-col items-center flex-wrap -mx-3'>
				{[...Array(numForms)].map((_, index) => (
					<div key={index} style={{ marginTop: '40px' }}>
						<div
							className='w-full h-100 p-8 m-4 rounded shadow-md flex flex-col justify-between items-center'
							style={{
								backgroundColor: 'rgba(0, 0, 0, 0.5)',
								marginLeft: '0px',
								marginRight: '200px',
								marginTop: '00px',
								marginBottom: '20px',
								borderColor: talentColor,
								boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
								backdropFilter: 'blur(8px)',
								borderWidth: '1px',
							}}>
							<h2
								className='text-2xl font-bold text-center mb-4 text-white'
								style={{ marginTop: '-40px', marginBottom: '-10px' }}>
								Enter the search filters for candidate {index + 1}
							</h2>
							{errors.message && <p style={{ color: 'white' }}>{errors.message}</p>}
							<hr
								className='border-1 w-70 mb-4'
								style={{ borderColor: talentColor }}
							/>

							{errors.errors && errors.errors[0] && errors.errors[0].detail && (
								<p className='text-red-500'>{errors.errors[0].detail}</p>
							)}

							<div
								className='w-full px-3 mb-6 md:mb-0'
								style={{ marginBottom: '20px' }}>
								<h3
									style={{
										fontSize: '0.9rem',
										color: 'white',
										fontWeight: 'bold',
									}}>
									Languages
								</h3>
								<Select
									id='languages'
									name='languages'
									value={languageOptions.filter((option) =>
										form[index]?.languages.includes(option.value)
									)}
									onChange={(selectedOptions) =>
										onInputChange(
											{
												target: {
													name: 'languages',
													value: selectedOptions,
												},
											},
											index
										)
									}
									options={languageOptions}
									isMulti
									className='basic-multi-select'
									classNamePrefix='select'
								/>
							</div>

							<div
								className='w-full px-3 mb-6 md:mb-0'
								style={{ marginBottom: '20px' }}>
								<h3
									style={{
										fontSize: '0.9rem',
										color: 'white',
										fontWeight: 'bold',
									}}>
									Technologies
								</h3>
								<GroupedSelect
									id='technologies'
									name='technologies'
									value={form[index]?.technologies.map((tech) => ({
										value: tech,
										label: tech,
									}))}
									onChange={(selectedOptions) =>
										onInputChange(selectedOptions, index)
									}
									options={options}
									isMulti
								/>
							</div>

							<div
								className='w-full px-3 mb-6 md:mb-0'
								style={{ marginBottom: '20px' }}>
								<h3
									style={{
										fontSize: '0.9rem',
										color: 'white',
										fontWeight: 'bold',
									}}>
									Field
								</h3>
								<Select
									id='field'
									name='field'
									value={fieldOptions.find(
										(option) => option.value === form[index]?.field
									)}
									onChange={(selectedOption) =>
										onInputChange(
											{
												target: {
													name: 'field',
													value: selectedOption.value,
												},
											},
											index
										)
									}
									options={fieldOptions}
									className='basic-single-select'
									classNamePrefix='select'
									menuPortalTarget={document.body}
									menuPosition={'fixed'}
								/>
							</div>

							<div
								className='w-full px-3 mb-2 md:mb-0'
								style={{ marginBottom: '20px' }}>
								<FormTextInput
									labelFor='yearsOfExperience'
									labelText='Years of Experience'
									placeholder='Enter years of Experience'
									name='yearsOfExperience'
									type='number'
									min='0'
									value={form[index]?.yearsOfExperience}
									onChange={(e) => onInputChange(e, index)}
									errors={errors}
								/>
							</div>
						</div>
					</div>
				))}
				<div className='flex justify-center mt-2 mb-4 space-x-20'>
					{MainButton('Search', '', handleSubmit)}
					{SecondaryButton('Search list', '/searches/list', '')}
				</div>
			</form>
		</div>
	)
}
