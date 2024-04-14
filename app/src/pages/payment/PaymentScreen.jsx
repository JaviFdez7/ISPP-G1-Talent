import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainButton from "../../components/mainButton.jsx";
import mainBackgroundRegisterLogin from "../../images/main-background2.jpg";
import axios from "axios";
import { useAuthContext } from "../../context/authContext";
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import Purchase from '../../components/swat/Purchase.js'

export default function PaymentScreen() {
    const { subscriptionPlan } = useParams();
    const { isRepresentative } = useAuthContext();
    const [price, setPrice] = useState(9.99);
    const [errors, setErrors] = useState({});
    let navigate = useNavigate();

    const stripe = useStripe();
    const elements = useElements();

    const prices = {
        candidate: {
            basic: 0,
            pro: 9.99
        },
        representative: {
            basic: 29.99,
            pro: 79.99
        }
    }

    useEffect(() => {
        if (isRepresentative && subscriptionPlan === "Basic plan") {
            setPrice(prices.representative.basic)
        } else if (isRepresentative && subscriptionPlan === "Pro plan") {
            setPrice(prices.representative.pro)
        } else if (!isRepresentative && subscriptionPlan === "Basic plan"){
            setPrice(prices.candidate.basic)
        } else {
            setPrice(prices.candidate.pro)
        }
    }, [])



    async function handleSubmit(e) {
        e.preventDefault();
        const { paymentMethod, error } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });
        if (error) {
            console.error(error);
            setErrors({ stripe: error.message });
        } else {
            const role = isRepresentative ? "Representative" : "Candidate";
            Purchase(confirmPurchase, navigate, role, paymentMethod, subscriptionPlan)
        }
    }

    async function confirmPurchase(paymentMethod) {
        const token = localStorage.getItem("access_token")
        const priceInCents = Math.round(price * 100);
        console.log(priceInCents);
        try {
            const response = await axios.post(
                import.meta.env.VITE_BACKEND_URL + '/payment',
                {
                    price: priceInCents,
                    paymentMethod: paymentMethod.id,
                    subscriptionPlan: subscriptionPlan
                },
                {
                    headers: {
                        'Authorization': `${token}`,
                    }
                }
            );
            return true
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setErrors(error.response.data);
            } else if (error.response && error.response.status === 404) {
                setErrors(error.response.data);
            }
            console.error(error);
            return false
        }
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
                        Change to {subscriptionPlan} for <p style={{ color: "var(--talent-highlight)" }}>{price !== 0 ? (price + "$") : ("Free")}</p>
                    </h2>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        {}
                        <CardElement
                            options={{
                                style: {
                                    base: {
                                        color: '#fff', // Color del texto
                                        fontSize: '16px', // Tamaño de fuente
                                        '::placeholder': {
                                            color: '#aab7c4', // Color del marcador de posición
                                        },
                                    },
                                    invalid: {
                                        color: '#ff0000', // Color del texto en caso de error
                                    },
                                    hidePostalCode: true,
                                    iconStyle: 'solid',
                                },
                            }}
                            autoComplete="off"
                        />

                        {errors.stripe && (
                            <h4 className="text-red-600">{errors.stripe}</h4>
                        )}
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
