import React, { useState } from 'react'
import mainBackground from '../images/main-background2.jpg'
import '../styles/support.css'

export default function Support() {
	const [openQuestions, setOpenQuestions] = useState([])

	const toggleQuestion = (index) => {
		if (openQuestions.includes(index)) {
			setOpenQuestions(openQuestions.filter((item) => item !== index))
		} else {
			setOpenQuestions([...openQuestions, index])
		}
	}

	return (
		<div
			className='flex flex-col items-center justify-center min-h-screen text-white'
			style={{
				backgroundImage: `url(${mainBackground})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}>
			<h1 className='text-4xl mb-4' style={{ marginTop: '3%' }}>
				Support
			</h1>
			<p>Welcome to IT Talent! If you have any issue regarding the application or you need</p>
			<p>
				attendance, contact us through{' '}
				<a href='mailto:ittalentofficial@outlook.com' className='font-bold orange-text'>
					ittalentofficial@outlook.com
				</a>
				.
			</p>
			<br />
			<h1 className='text-3xl mt-4 mb-2'>Frequently Asked Questions</h1>
			<br />
			<div className='faq-container'>
				<div
					className={`faq-question ${openQuestions.includes(1) ? 'active' : ''}`}
					onClick={() => toggleQuestion(1)}>
					<p className='font-bold orange-text'>1. What is Talent?</p>
					<div className={`faq-answer ${openQuestions.includes(1) ? 'open' : ''}`}>
						<p>
							IT Talent is a web application that people from around the world show
							their skills at software development and that way representatives from
							any enterprise can easily find the fits for their teams.
						</p>
					</div>
				</div>

				<div
					className={`faq-question ${openQuestions.includes(2) ? 'active' : ''}`}
					onClick={() => toggleQuestion(2)}>
					<p className='font-bold orange-text'>2. How can I create an account?</p>
					<div className={`faq-answer ${openQuestions.includes(2) ? 'open' : ''}`}>
						<p>
							You can create your account through{' '}
							<a href='/register/candidate' className='link'>
								this link
							</a>
							.
						</p>
					</div>
				</div>

				<div
					className={`faq-question ${openQuestions.includes(3) ? 'active' : ''}`}
					onClick={() => toggleQuestion(3)}>
					<p className='font-bold orange-text'>
						3. What can I do at IT Talent as a candidate?
					</p>
					<div className={`faq-answer ${openQuestions.includes(3) ? 'open' : ''}`}>
						<p>
							As a candidate, you can add your GitHub profile and work experiences, so
							that companies can take you into account. You will also be able to see
							your statistics.
						</p>
					</div>
				</div>

				<div
					className={`faq-question ${openQuestions.includes(4) ? 'active' : ''}`}
					onClick={() => toggleQuestion(4)}>
					<p className='font-bold orange-text'>
						4. What can I do at IT Talent as a representative?
					</p>
					<div className={`faq-answer ${openQuestions.includes(4) ? 'open' : ''}`}>
						<p>
							As a representative, you will be able to perform GitHub profile analysis
							supported by a history and a favorites section, and you will also be
							able to form teams of the number of people you need with the languages,
							tools and experiences you are looking for. You will also be able to see
							current trends.
						</p>
					</div>
				</div>

				<div
					className={`faq-question ${openQuestions.includes(5) ? 'active' : ''}`}
					onClick={() => toggleQuestion(5)}>
					<p className='font-bold orange-text'>5. How do I analyze someone?</p>
					<div className={`faq-answer ${openQuestions.includes(5) ? 'open' : ''}`}>
						<p>
							Talent is provided with an analysis section for representatives. You can
							easily find a candidate's profile inputting their Github account name
							and, if necessary, a Github token.
						</p>
					</div>
				</div>

				<div
					className={`faq-question ${openQuestions.includes(6) ? 'active' : ''}`}
					onClick={() => toggleQuestion(6)}>
					<p className='font-bold orange-text'>
						6. What are the terms and conditions of IT Talent?
					</p>
					<div className={`faq-answer ${openQuestions.includes(6) ? 'open' : ''}`}>
						<p>
							You can carefully consult the terms and conditions of the IT Talent
							service{' '}
							<a
								href='https://it-talent-wiki.vercel.app/docs/Coordinaci%C3%B3n/Customer%20Agreement'
								target='_blank'
								className='link'>
								at this link
							</a>
							.
						</p>
					</div>
				</div>

				<div
					className={`faq-question ${openQuestions.includes(7) ? 'active' : ''}`}
					onClick={() => toggleQuestion(7)}>
					<p className='font-bold orange-text'>7. How can I delete my data?</p>
					<div className={`faq-answer ${openQuestions.includes(7) ? 'open' : ''}`}>
						<p>
							You can request the deletion of your data through{' '}
							<a
								href='https://forms.gle/H5GKKbcPeRUe8fcH7'
								target='_blank'
								className='link'>
								this following form
							</a>
							.
						</p>
					</div>
				</div>

				<div
					className={`faq-question ${openQuestions.includes(8) ? 'active' : ''}`}
					onClick={() => toggleQuestion(8)}>
					<p className='font-bold orange-text'>
						8. How can I contact technical support service?
					</p>
					<div className={`faq-answer ${openQuestions.includes(8) ? 'open' : ''}`}>
						<p>
							You can contact us via email at the following address:{' '}
							<a
								href='mailto:ittalentofficial@outlook.com'
								target='_blank'
								className='link'>
								ittalentofficial@outlook.com
							</a>
							.
						</p>
					</div>
				</div>

				<div
					className={`faq-question ${openQuestions.includes(9) ? 'active' : ''}`}
					onClick={() => toggleQuestion(9)}>
					<p className='font-bold orange-text'>9. Are payments secure?</p>
					<div className={`faq-answer ${openQuestions.includes(9) ? 'open' : ''}`}>
						<p>
							Of course, all payments are made through Stripe, which certifies the
							security of the payment.
						</p>
					</div>
				</div>

				<div
					className={`faq-question ${openQuestions.includes(10) ? 'active' : ''}`}
					onClick={() => toggleQuestion(10)}>
					<p className='font-bold orange-text'>10. What is the refund policy?</p>
					<div className={`faq-answer ${openQuestions.includes(10) ? 'open' : ''}`}>
						<p>Unfortunately, we do not have the ability to make returns.</p>
					</div>
				</div>
			</div>
		</div>
	)
}
