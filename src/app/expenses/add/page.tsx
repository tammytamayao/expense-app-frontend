"use client";

import { useRouter } from "next/navigation";
import ExpenseForm from "../components/ExpenseForm";
import MessageDisplay from "../../components/MessageDisplay";
import useExpenseForm from "../../hooks/useExpenseForm";
import Header from "@/app/components/Header";

const AddExpensePage: React.FC = () => {
  const router = useRouter();
  const { message, isSuccess, handleSubmit } = useExpenseForm();

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
            <h1 className="text-3xl font-bold text-gray-800">Add Expense</h1>
            <button
              onClick={() => router.back()}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
            >
              <strong>{">"}</strong>
            </button>
          </div>
          <ExpenseForm onSubmit={handleSubmit} isEdit={false} />
        </div>
      </div>
    </div>
  );
};

export default AddExpensePage;
