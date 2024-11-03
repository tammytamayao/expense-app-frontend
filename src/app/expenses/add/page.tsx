"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ExpenseForm from "../components/ExpenseForm";
import MessageDisplay from "../../components/MessageDisplay";
import { addExpense } from "../../api";
import Header from "@/app/components/Header";

interface Expense {
  id?: number;
  title: string;
  description: string;
  amount: number;
  date: Date;
  username?: string;
}

const AddExpensePage: React.FC = () => {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const username = localStorage.getItem("username");

  const handleAdd = async (expense: Expense) => {
    if (!username) {
      setMessage("User not found. Please log in again.");
      setIsSuccess(false);
      return;
    }

    const expenseData = {
      ...expense,
      username,
    };

    try {
      await addExpense(expenseData);
      setMessage("Expense added successfully!");
      setIsSuccess(true);
      setTimeout(() => router.push("/expenses"), 1000);
    } catch (error) {
      setMessage("Failed to add expense. Please try again.");
      setIsSuccess(false);
      setTimeout(() => {
        setMessage(null);
      }, 1000);
    }
  };

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
            {/* Back button */}
            <button
              onClick={() => router.back()}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
            >
              <strong>{">"}</strong>
            </button>
          </div>
          <ExpenseForm onSubmit={handleAdd} isEdit={false} />
        </div>
      </div>
    </div>
  );
};

export default AddExpensePage;
