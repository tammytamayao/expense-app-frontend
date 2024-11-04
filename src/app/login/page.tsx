"use client";

import Link from "next/link";
import { loginUser } from "../api";
import MessageDisplay from "../components/MessageDisplay";
import UserForm from "../components/UserForm";
import UserFormHeader from "../components/UserHeader";
import useHandleAuth from "../hooks/useHandleAuth";

const HomePage: React.FC = () => {
  const { errorMessage, isSuccess, handleSubmit } = useHandleAuth(loginUser);

  const handleLoginSubmit = async (username: string, password: string) => {
    const success = await handleSubmit(username, password);
    if (success) {
      sessionStorage.setItem("username", username);
      window.location.href = "/expenses";
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow flex flex-col items-center justify-center bg-gray-100">
        <div className="max-w-md w-full items-center justify-center bg-gray-100">
          <MessageDisplay message={errorMessage} isSuccess={isSuccess} />
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
          <UserFormHeader />
          <UserForm onSubmit={handleLoginSubmit} buttonLabel="Log In" />
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
