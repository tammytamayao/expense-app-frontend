"use client";

import Link from "next/link";
import Image from "next/image";
import nextImage from "../../../public/logo.png";
import LoginForm from "./LoginForm";

const HomePage: React.FC = () => {
  const handleLoginSubmit = (email: string, password: string) => {
    console.log("Email:", email, "Password:", password);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
          <Image
            src={nextImage}
            alt="Welcome to Expense Tracker"
            className="mb-2 w-80 h-60"
          />
          <h1 className="mb-4 text-2xl font-bold">
            <span className="text-black">B R I G H T</span>
            &nbsp;&nbsp;&nbsp;
            <span className="text-primary">M O N E Y</span>
          </h1>

          <LoginForm onSubmit={handleLoginSubmit} />

          <div>
            <Link href="/signup">
              <button className="w-full mb-4 px-4 py-2 border border-primary text-primary rounded hover:text-secondary hover:border-secondary transition-colors">
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
            <span className="text-gray-800 hover:text-primary cursor-pointer text-lg">
              Continue as <strong className="font-bold">Guest</strong>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
