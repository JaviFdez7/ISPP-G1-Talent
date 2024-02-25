import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section
      className="text-gray-700 body-font h-screen flex items-center justify-center"
      style={{ backgroundColor: "#282828" }}
    >
      <div className="container mx-auto flex flex-col items-center text-center">
        <h1 className="title-font text-8xl mb-16 font-medium text-amber-500">
          Welcome to TALENT
          <br className="hidden lg:inline-block" />
        </h1>
        <p className="mb-8 leading-relaxed text-white text-4xl">
          Prepare for a <strong>revolution</strong>
          <br className="hidden lg:inline-block" />
          in hiring computer professionals
        </p>
        <p className="mb-8 leading-relaxed text-amber-500 text-3xl">
          Join us now!
        </p>
        <div className="flex gap-4">
          <Link
            to="/login"
            className=" text-white font-bold py-4 px-8 rounded text-lg"
            style={{ backgroundColor: "#D4983D" }}
          >
            Log in
          </Link>
          <Link
            to="/register"
            className=" text-white py-4 px-8 rounded text-lg"
            style={{ backgroundColor: "#393939" }}
          >
            Register
          </Link>
        </div>
      </div>
    </section>
  );
}
