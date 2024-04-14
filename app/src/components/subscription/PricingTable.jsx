import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { handleNetworkError } from '../TokenExpired.jsx'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from "../../context/authContext";

const PricingTable = ({ suscription }) => {
  const { isRepresentative } = useAuthContext();
  const [popular, setPopular] = useState("Pro");
  const [isCurrentPlan, setIsCurrentPlan] = useState(false);
  const apiURL = import.meta.env.VITE_BACKEND_URL
  const navigate = useNavigate()

  useEffect(() => {
    getCurrentPlan()
    getPopularPlan()
  }, [])

  async function getCurrentPlan() {
    const userId = localStorage.getItem("userId")
    const uri = `/subscriptions/${userId}`
    const token = localStorage.getItem('access_token')
    try {
      const response = await axios.get(apiURL + uri, {
        headers: {
          Authorization: `${token}`,
        },
      })
      const plan = response.data.data.subtype
      setIsCurrentPlan(plan === suscription.name)
      return plan
    } catch (error) {
      handleNetworkError(error, navigate)
    }
  }

  async function getPopularPlan() {
    const uri = `/subscriptions`
    try {
      const response = await axios.get(apiURL + uri)
      const subscriptions = response.data.data;

      let plans = {};
      const filteredSubscriptions = isRepresentative ? subscriptions.filter( subscription => subscription.type === 'CompanySubscription') : subscriptions.filter(subscription => subscription.type === 'CandidateSubscription');
      filteredSubscriptions.forEach(subscription => {
        const plan = subscription.subtype;
        if (plan in plans) {
          plans[plan]++;
        } else {
          plans[plan] = 1;
        }
      });

      let mostPopularPlan = '';
      let maxCount = 0;
      for (const plan in plans) {
        if (plans[plan] > maxCount || (plans[plan] === maxCount && plan === 'Pro plan')) {
          mostPopularPlan = plan;
          maxCount = plans[plan];
        }
      }

      console.log('Most popular plan:', mostPopularPlan);
      setPopular(mostPopularPlan);
      return mostPopularPlan;
    } catch (error) {
      handleNetworkError(error, navigate)
      console.error(error)
    }
  }

  return (
    <div className="p-4 xl:w-1/3 md:w-1/2 w-full">
      <div className="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
        <h2 className="text-sm tracking-widest title-font mb-1 font-medium text-white">
          {suscription.name.toUpperCase()}
        </h2>
        <h1 className="text-5xl pb-4 mb-4 border-b border-gray-200 leading-none text-white">
          {suscription.price}
        </h1>
        {suscription.name == popular && (
          <span className="bg-indigo-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">
            POPULAR
          </span>
        )}
        {suscription.description.map((s) => (
          <p className="flex items-center text-white mb-2">
            <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                className="w-3 h-3"
                viewBox="0 0 24 24"
              >
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>
            {s}
          </p>
        ))}
        <Link
          to={!isCurrentPlan ? suscription.name === "Custom" ? "/support" : `/payments/${suscription.name}` :  "#"}
          className={`flex items-center mt-auto border-0 py-2 px-4 w-full focus:outline-non rounded ${!isCurrentPlan
            ? "bg-gray-200 text-gray-600 hover:bg-gray-500"
            : "text-gray-800 bg-gray-400"
            }`}
        >
          {!isCurrentPlan ? suscription.name === "Custom" ? "Contact us" : "Subscribe" : "Acquired"}
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 ml-auto"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </Link>

      </div>
    </div>
  )
}

export default PricingTable
