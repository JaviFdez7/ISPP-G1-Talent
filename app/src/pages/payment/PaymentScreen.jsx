import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainButton from "../../components/mainButton.jsx";
import mainBackgroundRegisterLogin from "../../images/main-background2.jpg";
import axios from "axios";
import { useAuthContext } from "../../context/authContext";
import { loadStripe } from '@stripe/stripe-js';
import Input from "../../components/Input.jsx";
import Purchase from '../../components/swat/Purchase.js'

export default function PaymentScreen() {
    const { subscriptionPlan } = useParams();
    const { isRepresentative } = useAuthContext();
    const [price, setPrice] = useState(9.99);
    const [form, setForm] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        nameOnCard: ''
    });
    const [errors, setErrors] = useState({});
    const {cardNumber, expiryDate, cvv, nameOnCard } = form;
    let navigate = useNavigate();
    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);
    const prices = {
        candidate: {
            advanced: 9.99
        },
        representative: {
            basic: 29.99,
            advanced: 79.99
        }
    }

    useEffect(() => {
        if (subscriptionPlan === "Basic plan") {
            setPrice(prices.representative.basic)
        } else if (isRepresentative && subscriptionPlan === "Advanced plan") {
            setPrice(prices.representative.advanced)
        } else {
            setPrice(prices.candidate.advanced)
        }
    }, [])


    function onInputChange(e) {
        const { name, value } = e.target;
        setForm(prevForm => ({ ...prevForm, [name]: value }));
        setErrors(prevErrors => ({ ...prevErrors, [name]: undefined }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        const { paymentMethod, error } = await stripe.createPaymentMethod({
            type: 'card',
            card: {
                number: cardNumber,
                exp_month: expiryDate.split('/')[0],
                exp_year: expiryDate.split('/')[1],
                cvc: cvv,
                name: nameOnCard
            }
        });

        if (error) {
            console.error(error);
            setErrors({ stripe: error.message });
        } else {
            const role = "Representative" ? isRepresentative : "Candidate";
            Purchase(confirmPurchase, navigate, role, paymentMethod)
        }
    }

    async function confirmPurchase(paymentMethod) {
        try {
            const response = await axios.post(
                import.meta.env.VITE_BACKEND_URL + '/payment',
                {
                    price: price,
                    paymentMethod: paymentMethod.id,
                    subscriptionPlan: subscriptionPlan
                }
            );
            console.log(response.data.data)
            navigate("/")
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setErrors(error.response.data);
                return;
            } else if (error.response && error.response.status === 404) {
                setErrors(error.response.data);
                return;
            }
            console.error(error);
        }
    }

    function validateForm() {
        let errors = {};
        if (!form.nameOnCard) {
            errors.nameOnCard = 'Name on card is required';
        }
        if (!form.cardNumber) {
            errors.cardNumber = 'Card number is required';
        } else if (!/^\d{16}$/.test(form.cardNumber)) {
            errors.cardNumber = 'Card number must be a 16-digit number';
        }
        if (!form.expiryDate) {
            errors.expiryDate = 'Expiration date is required';
        } else {
            const today = new Date();
            const [month, year] = form.expiryDate.split('/');
            const expiryDate = new Date(`20${year}`, month - 1, 1); // Assuming year is in YY format
            if (expiryDate <= today) {
                errors.expiryDate = 'Expiration date must be in the future';
            }
        }
        if (!form.cvv) {
            errors.cvv = 'CVV is required';
        } else if (!/^\d{3}$/.test(form.cvv)) {
            errors.cvv = 'CVV must be a 3-digit number';
        }
        return errors;
    }

    return (
        <div
            className="flex flex-col justify-center"
            style={{
                height: "100vh",
                backgroundAttachment: "fixed",
                backgroundImage: `url(${mainBackgroundRegisterLogin})`,
                backgroundSize: "cover",
            }}
        >
            <div
                className="h-100 rounded shadow-md flex flex-col justify-between"
                style={{
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    width: "100%",
                    maxWidth: "48rem",
                    padding: "2rem",
                    margin: "1rem",
                    marginLeft: "auto",
                    marginRight: "auto",
                    borderColor: "var(--talent-highlight)",
                    borderWidth: "1px",
                }}
            >
                <div>
                    <h2
                        className="font-bold text-center text-white"
                        style={{
                            fontSize: "4rem",
                            marginTop: "2rem",
                            marginBottom: "4rem",
                        }}
                    >
                        Change to {subscriptionPlan} for <p style={{ color: "var(--talent-highlight)" }}>{price}$</p>
                    </h2>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div
                            className="flex"
                            style={{
                                marginBottom: "1rem",
                            }}
                        >
                            <Input
                                name='Name on card'
                                value={nameOnCard}
                                editable={true}
                                placeholder='Enter the name on your credit card'
                                onChange={(e) => onInputChange(e)}
                                formName='nameOnCard'
                                width='80%'
                                isMandatory={true}
                                type='text'
                            />
                        </div>
                        <div
                            className="flex"
                            style={{
                                marginBottom: "1rem",
                            }}
                        >
                            <Input
                                name='Card number'
                                value={cardNumber}
                                editable={true}
                                placeholder='Enter your credit card number'
                                onChange={(e) => onInputChange(e)}
                                formName='cardNumber'
                                width='80%'
                                isMandatory={true}
                                type='password'
                            />
                        </div>
                        <div
                            className="flex"
                            style={{
                                marginBottom: "1rem",
                            }}
                        >
                            <Input
                                name='Expiration date'
                                value={expiryDate}
                                editable={true}
                                placeholder='Enter the expiration date on your credit card'
                                onChange={(e) => onInputChange(e)}
                                formName='expiryDate'
                                width='80%'
                                isMandatory={true}
                                type='date'
                            />
                        </div>
                        <div
                            className="flex items-center"
                            style={{
                                alignContent: "center",
                            }}
                        >
                            <Input
                                name='CVV'
                                value={cvv}
                                editable={true}
                                placeholder='CVV'
                                onChange={(e) => onInputChange(e)}
                                formName='cvv'
                                width='80%'
                                isMandatory={true}
                                type='password'
                            />
                        </div>
                        {
                            errors.errors && errors.errors[0] && errors.errors[0].detail && (
                                <p className="text-red-500">{errors.errors[0].detail}</p>
                            )
                        }
                        <div
                            className="flex justify-center items-center"
                            style={{ marginTop: "3rem" }}
                        >
                            {MainButton("Purchase", "/", handleSubmit)}
                        </div>
                    </form>
                </div >
            </div >
        </div >
    );
}
