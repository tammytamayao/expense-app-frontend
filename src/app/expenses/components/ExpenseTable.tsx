import React from "react";
import Link from "next/link";
import { ExpenseTableProps } from "@/app/types";

const ExpenseTable: React.FC<ExpenseTableProps> = ({
  expenses,
  onDelete,
  onEdit,
}) => {
  return (
    <table className="min-w-full border border-gray-300 mb-4">
      <thead>
        <tr>
          <th className="border border-gray-300 px-4 py-2 text-gray-800">
            Date
          </th>
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
            <td className="border border-gray-300 px-4 py-2 text-gray-800 text-center">
              {expense.date.toLocaleDateString()}
            </td>
            <td className="border border-gray-300 px-4 py-2 text-gray-800">
              {expense.title}
            </td>
            <td className="border border-gray-300 px-4 py-2 text-gray-800">
              {expense.description}
            </td>
            <td className="border border-gray-300 px-4 py-2 text-gray-800">
              {expense.amount.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </td>
            <td className="border border-gray-300 px-4 py-2 text-gray-800 text-center">
              <div className="flex justify-center items-center space-x-8">
                <Link href={`/expenses/${expense.id}/edit`}>
                  <img
                    src="/edit.svg"
                    alt="Edit"
                    onClick={onEdit}
                    className="cursor-pointer w-5 h-5"
                  />
                </Link>
                <img
                  src="/delete.svg"
                  alt="Delete"
                  onClick={() => onDelete(expense.id)}
                  className="cursor-pointer w-5 h-5 text-red-600 hover:underline"
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExpenseTable;
