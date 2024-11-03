"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ExpenseForm from "../../components/ExpenseForm";
import MessageDisplay from "../../../components/MessageDisplay";
import { editExpense, updateExpense } from "../../../api";
import Header from "@/app/components/Header";

interface Expense {
  id?: number;
  title: string;
  description: string;
  amount: number;
  date: Date;
  username?: string;
}

const EditExpensePage: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();
  const [expense, setExpense] = useState<Expense | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const username = sessionStorage.getItem("username");

  useEffect(() => {
    if (!username) {
      router.push("/");
    }
  }, [username]);

  useEffect(() => {
    const loadExpense = async () => {
      if (id) {
        try {
          const fetchedExpense = await editExpense(Number(id));
          setExpense(fetchedExpense);
        } catch (error) {
          setMessage("Failed to load expense data.");
          setIsSuccess(false);
        }
      }
    };

    loadExpense();
  }, [id]);

  const handleSubmit = async (updatedExpense: Expense) => {
    if (!username) {
      setMessage("User not found. Please log in again.");
      setIsSuccess(false);
      return;
    }

    const expenseData = {
      ...updatedExpense,
      username,
    };

    try {
      await updateExpense(Number(id), expenseData);
      setMessage("Expense updated successfully!");
      setIsSuccess(true);
      setTimeout(() => router.push("/expenses"), 1000);
    } catch (error) {
      setMessage("Failed to update expense. Please try again.");
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
            <h1 className="text-3xl font-bold text-gray-800">Edit Expense</h1>
            <button
              onClick={() => router.back()}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
            >
              <strong>{">"}</strong>
            </button>
          </div>
          {expense && (
            <ExpenseForm
              initialData={expense}
              onSubmit={handleSubmit}
              isEdit={true}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EditExpensePage;
