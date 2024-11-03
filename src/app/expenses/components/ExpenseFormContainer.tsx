import React, { ReactNode } from "react";
import Header from "@/app/components/Header";
import MessageDisplay from "../../components/MessageDisplay";
import router from "next/router";

interface Expense {
  id?: number;
  title: string;
  description: string;
  amount: number;
  date: Date;
  username?: string;
}

interface ExpenseFormContainerProps {
  title: string;
  isEdit: boolean;
  onSubmit: (expense: Expense) => Promise<void>;
  initialData?: Expense | null;
  message: string | null;
  setMessage: React.Dispatch<React.SetStateAction<string | null>>;
  isSuccess: boolean;
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
}

const ExpenseFormContainer: React.FC<ExpenseFormContainerProps> = ({
  title,
  message,
  isSuccess,
  children,
}) => {
  return (
    <div>
      <Header />
      <div className="flex flex-col h-screen items-center justify-center bg-gray-100">
        <div className="max-w-xl w-full items-center justify-center bg-gray-100">
          {message && (
            <MessageDisplay message={message} isSuccess={isSuccess} />
          )}
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md text-left max-w-xl w-full">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
            <button
              onClick={() => router.back()}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
            >
              <strong>{">"}</strong>
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ExpenseFormContainer;
