import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="text-gray-700 body-font bg-gray-700 h-screen flex items-center justify-center">
      <div className="container mx-auto flex flex-col items-center text-center">
        <h1 className="title-font text-9xl mb-16 font-medium text-amber-500">
          Welcome to TALENT
          <br className="hidden lg:inline-block" />
        </h1>
        <p className="mb-8 leading-relaxed text-white text-5xl">
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
            className="bg-yellow-500 hover:bg-yellow-800 text-white font-bold py-4 px-8 rounded text-lg"
          >
            Log in
          </Link>
          <Link
            to="/register"
            className="bg-black hover:bg-gray-500 text-white font-bold py-4 px-8 rounded text-lg"
          >
            Register
          </Link>
        </div>
      </div>
    </section>
  );
}
