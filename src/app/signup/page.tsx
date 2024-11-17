"use client";

import Link from "next/link";
import { signupUser } from "@/app/api";
import MessageDisplay from "@/app/components/MessageDisplay";
import UserForm from "@/app/components/UserForm";
import UserFormHeader from "@/app/components/UserHeader";
import useHandleAuth from "@/app/hooks/useHandleAuth";

const SignupPage: React.FC = () => {
  const { errorMessage, isSuccess, handleSubmit } = useHandleAuth(signupUser);

  const handleSignupSubmit = async (username: string, password: string) => {
    const success = await handleSubmit(username, password);
    if (success) {
      window.location.href = "/";
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
          <UserForm onSubmit={handleSignupSubmit} buttonLabel="Sign Up" />
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
