import React from "react";
import mainBackground from "../../images/main-background2.jpg";
import PricingTable from "../../components/subscription/PricingTable";

export default function CandidateSubscription() {
  const suscriptions = [
    {
      name: "Basic plan",
      price: "Free",
      description: [
        "All basic functions",
        "Basic notifications",
        "1 update per month",
        "No access to trends",
      ],
    },
    {
      name: "Pro plan",
      price: "9.99€",
      description: [
        "All basic functions",
        "See enterprises",
        "3 updates per month",
        "Full access to trends",
      ],
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
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4 justify-center">
          {suscriptions.map((suscription, index) => (
            <PricingTable
              suscription = {suscription}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
