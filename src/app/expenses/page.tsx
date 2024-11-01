"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { fetchExpenses, deleteExpense } from "../api";
import MessageDisplay from "../components/MessageDisplay";

interface Expense {
  id: number;
  title: string;
  description: string;
  amount: number;
}

const ViewExpensePage: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const data = await fetchExpenses();
        const expensesWithNumbers = data.map((expense) => ({
          ...expense,
          amount:
            typeof expense.amount === "string"
              ? parseFloat(expense.amount)
              : expense.amount,
        }));
        setExpenses(expensesWithNumbers);
      } catch (error) {
        setError("Failed to load expenses");
        console.error(error);
      }
    };

    loadExpenses();
  }, []);

  const totalAmount = expenses.reduce(
    (sum, expense) =>
      sum + (typeof expense.amount === "number" ? expense.amount : 0),
    0
  );

  const handleDelete = async (id: number) => {
    try {
      await deleteExpense(id);
      setExpenses(expenses.filter((expense) => expense.id !== id));
      setSuccessMessage("Expense deleted successfully!");
      setError(null);

      setTimeout(() => {
        setSuccessMessage(null);
      }, 2000);
    } catch (error) {
      setError("Failed to delete expense");
      console.error(error);

      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4">
      <MessageDisplay
        message={successMessage || error}
        isSuccess={!!successMessage}
      />

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Expense List</h1>
        <Link href="/expenses/add">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
            + Add Expense
          </button>
        </Link>
      </div>

      {expenses.length === 0 ? (
        <div className="bg-yellow-100 border border-yellow-400 text-gray-800 p-4 rounded">
          <p>No expenses found. Please add some expenses.</p>
        </div>
      ) : (
        <div className="flex-grow overflow-auto">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-gray-800">
                  Title
                </th>
                <th className="border border-gray-300 px-4 py-2 text-gray-800">
                  Description
                </th>
                <th className="border border-gray-300 px-4 py-2 text-gray-800">
                  Amount ($)
                </th>
                <th
                  colSpan={2}
                  className="border border-gray-300 text-gray-800 text-center"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td className="border border-gray-300 px-4 py-2 text-gray-800">
                    {expense.title}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-800">
                    {expense.description}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-800">
                    {expense.amount.toFixed(2)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-800 text-center">
                    <Link href={`/expenses/${expense.id}/edit`}>
                      <button className="text-blue-600 hover:underline">
                        Edit
                      </button>
                    </Link>
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-800 text-center">
                    <button
                      onClick={() => handleDelete(expense.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td
                  colSpan={2}
                  className="border border-gray-300 px-4 py-2 font-bold text-gray-800 text-left"
                >
                  Total Expenses
                </td>
                <td className="border border-gray-300 px-4 py-2 font-bold text-gray-800">
                  ${totalAmount.toFixed(2)}
                </td>
                <td
                  colSpan={2}
                  className="border border-gray-300 px-4 py-2"
                ></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewExpensePage;
