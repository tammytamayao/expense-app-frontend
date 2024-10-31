"use client";

import Link from "next/link";
import Image from "next/image";
import nextImage from "../../../public/next.svg";
import LoginForm from "./LoginForm";

const HomePage: React.FC = () => {
  const handleLoginSubmit = (email: string, password: string) => {
    // NOTE: Extendable feature of the application
    console.log("Email:", email, "Password:", password);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
        {/* NOTE: Replace the heading with app image and adjust the image specs */}
        <Image
          src={nextImage}
          alt="Welcome to Expense Tracker"
          className="mb-4"
          width={300}
          height={100}
        />

        <LoginForm onSubmit={handleLoginSubmit} />

        <div>
          <Link href="/signup">
            <button className="w-full mb-4 px-4 py-2 border border-blue-600 text-blue-600 rounded hover:text-blue-800 hover:border-blue-800 transition-colors">
              Sign Up
            </button>
          </Link>
        </div>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-600">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <Link href="/expenses" aria-label="Continue as guest">
          <span className="text-gray-800 hover:text-blue-600 cursor-pointer text-lg">
            Continue as <strong className="font-bold">Guest</strong>
          </span>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
