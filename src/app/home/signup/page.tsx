"use client";

import Link from "next/link";
import Image from "next/image";
import nextImage from "../../../../public/logo.png";
import { useState } from "react";
import { signupUser } from "../../api";
import dynamic from "next/dynamic";

const SignupForm = dynamic(() => import("../components/SignupForm"));

const SignupPage: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSignupSubmit = async (username: string, password: string) => {
    try {
      const data = await signupUser(username, password);
      console.log("Signup successful", data);
      window.location.href = "/";
    } catch (error) {
      setErrorMessage((error as Error).message);
      console.error("Signup failed:", error);
    }
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

          {errorMessage && (
            <div className="mb-4 text-red-500">{errorMessage}</div>
          )}

          <SignupForm onSubmit={handleSignupSubmit} />

          <div>
            <Link href="/">
              <button className="w-full mb-4 px-4 py-2 border border-primary text-primary rounded hover:text-secondary hover:border-secondary transition-colors">
                Back to Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
