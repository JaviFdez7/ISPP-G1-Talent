import React from "react";
import { Link } from "react-router-dom";

export default function Pricing() {
  const suscriptions = [
    {
      name: "Basic",
      price: "Free",
      description: [
        "All basic functions",
        "Basic notifications",
        "1 update per month",
        "No access to trends",
      ],
    },
    {
      name: "Advance",
      price: "9.99$",
      description: [
        "All basic functions",
        "See enterprises",
        "3 updates per month",
        "Full access to trends",
      ],
    },
  ];
  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
            Pricing
          </h1>
        </div>
        <div className="flex flex-wrap -m-4">
          {suscriptions.map((suscription, index) => (
            <div className="p-4 xl:w-1/3 md:w-1/2 w-full">
              <div className="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
                <h2 className="text-sm tracking-widest title-font mb-1 font-medium">
                  {suscription.name.toUpperCase()}
                </h2>
                <h1 className="text-5xl text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none">
                  {suscription.price} €
                </h1>
                {suscription.name == "standar" && (
                  <span className="bg-indigo-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">
                    POPULAR
                  </span>
                )}
                {suscription.description.map((s) => (
                  <p className="flex items-center text-gray-600 mb-2">
                    <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2.5"
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
                  to={`/payments/${suscription.name}/${suscription.price}`}
                  className={`flex items-center mt-auto border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded ${
                    suscription.name == "standar"
                      ? "bg-indigo-400 text-white hover:bg-indigo-600"
                      : "text-gray-600 bg-gray-200"
                  }`}
                >
                  Suscribirse
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-4 h-4 ml-auto"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </Link>
                <p className="text-xs text-gray-500 mt-3">
                  Todas las caracteristicas de la version{" "}
                  <span className="text-red-700 text-sm">
                    {suscription.name.toUpperCase()}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}