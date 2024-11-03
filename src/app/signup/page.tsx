"use client";

import Link from "next/link";
import Image from "next/image";
import nextImage from "../../../public/logo.png";
import { useState } from "react";
import { signupUser } from "../api";
import dynamic from "next/dynamic";
import MessageDisplay from "@/app/components/MessageDisplay";

const SignupForm = dynamic(() => import("./components/SignupForm"));

const SignupPage: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleSignupSubmit = async (username: string, password: string) => {
    try {
      const data = await signupUser(username, password);
      console.log("Signup successful", data);
      window.location.href = "/";
    } catch (error) {
      setErrorMessage((error as Error).message);
      setIsSuccess(false);
      console.error("Signup failed:", error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow flex flex-col items-center justify-center bg-gray-100">
        <div className="max-w-md w-full items-center justify-center bg-gray-100">
          <MessageDisplay message={errorMessage} isSuccess={isSuccess} />
        </div>
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
