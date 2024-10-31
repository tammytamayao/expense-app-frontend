"use client";

import React from "react";
import { useState } from "react";

interface Expense {
  id: number;
  title: string;
  description: string;
  amount: number;
}

// NOTE: sample expenses data (replaced with data fetched from API)
const initialExpenses: Expense[] = [
  {
    id: 1,
    title: "Grocery",
    description: "Weekly grocery shopping",
    amount: 150,
  },
  {
    id: 2,
    title: "Utilities",
    description: "Monthly electricity bill",
    amount: 75,
  },
  {
    id: 3,
    title: "Internet",
    description: "Monthly internet subscription",
    amount: 60,
  },
];

const ViewExpense: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);

  // NOTE: handle delete function of expense
  const handleDelete = (id: number) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  // NOTE: handle edit function of expense
  const handleEdit = (expense: Expense) => {
    console.log("Edit expense:", expense);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Expense List</h1>

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
                    <button
                      onClick={() => handleEdit(expense)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
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
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewExpense;
