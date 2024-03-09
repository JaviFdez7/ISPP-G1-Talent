import React from "react";
import { Link } from "react-router-dom";
import mainBackground from "../../images/main-background2.jpg";

export default function RepresentativeSubscription() {
  const suscriptions = [
    {
      name: "Basic",
      price: "29.99€",
      description: ["25 searches", "3 members per search", "Basic filters"],
    },
    {
      name: "Advanced",
      price: "79.99€",
      description: [
        "150 searches",
        "5 members per search",
        "All filters",
        "Profile statistics",
        "Shorter response time",
      ],
    },
    {
      name: "Personal",
      price: "Custom",
      description: ["Custom", "Custom", "Custom", "Custom", "Custom"],
    },
  ];
  return (
    <div
      className="flex flex-col items-center justify-center bg-fixed h-screen w-screen"
      style={{
        backgroundImage: `url(${mainBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container px-16 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {suscriptions.map((suscription, index) => (
            <div className="p-4 xl:w-1/3 md:w-1/2 w-full">
              <div className="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
                <h2 className="text-sm tracking-widest title-font mb-1 font-medium text-white">
                  {suscription.name.toUpperCase()}
                </h2>
                <h1 className="text-5xl pb-4 mb-4 border-b border-gray-200 leading-none text-white">
                  {suscription.price}
                </h1>
                {suscription.name == "Advance" && (
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
          ))}
        </div>
      </div>
    </div>
  );
}
