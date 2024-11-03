"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { fetchExpenses, deleteExpense } from "../api";
import MessageDisplay from "../components/MessageDisplay";
import Header from "../components/Header";
import Loader from "../components/Loader";
import { useRouter } from "next/navigation";

interface Expense {
  id: number;
  title: string;
  description: string;
  amount: number;
  date: Date;
}

const ViewExpensePage: React.FC = () => {
  const router = useRouter();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [navigating, setNavigating] = useState<boolean>(false);

  const loadExpenses = async (page: number) => {
    setLoading(true);
    try {
      const data = await fetchExpenses(page);
      const expensesWithNumbers = data.expenses.map((expense) => ({
        ...expense,
        amount:
          typeof expense.amount === "string"
            ? parseFloat(expense.amount)
            : expense.amount,
        date: new Date(expense.date),
      }));

      setExpenses(expensesWithNumbers);
      setTotalAmount(Number(data.total_amount));
      setTotalPages(data.total_pages);
      setCurrentPage(data.current_page);
    } catch (error) {
      setError("Failed to load expenses");
      console.error(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    const username = sessionStorage.getItem("username");
    if (!username) {
      router.push("/");
    } else {
      loadExpenses(currentPage);
    }
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteExpense(id);
      const updatedExpenses = expenses.filter((expense) => expense.id !== id);
      setExpenses(updatedExpenses);

      const updatedTotalAmount = updatedExpenses.reduce(
        (total, expense) => total + expense.amount,
        0
      );
      setTotalAmount(updatedTotalAmount);

      if (updatedExpenses.length === 0) {
        setCurrentPage(1);
        loadExpenses(1);
      } else {
        if (updatedExpenses.length < (currentPage - 1) * 10) {
          setCurrentPage(currentPage - 1);
          loadExpenses(currentPage - 1);
        }
      }

      setSuccessMessage("Expense deleted successfully!");
      setError(null);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 1500);
    } catch (error) {
      setError("Failed to delete expense");
      console.error(error);
      setTimeout(() => {
        setError(null);
      }, 1500);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleAddExpenseClick = () => {
    setNavigating(true);
    setTimeout(() => {
      setNavigating(false);
    }, 2000);
  };

  const handleEditExpenseClick = () => {
    setNavigating(true);
    setTimeout(() => {
      setNavigating(false);
    }, 2000);
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col h-screen bg-gray-100 p-4">
        <MessageDisplay
          message={successMessage || error}
          isSuccess={!!successMessage}
        />
        {loading || navigating ? (
          <Loader />
        ) : expenses.length === 0 ? (
          <div className="bg-yellow-100 border border-yellow-400 text-gray-800 p-4 rounded">
            <p>
              No expenses found. To add some expenses, &nbsp;
              <Link href="/expenses/add">
                <button
                  className="text-blue-800 underline"
                  onClick={handleAddExpenseClick}
                >
                  {" "}
                  Click here
                </button>
              </Link>{" "}
            </p>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-gray-800">Expense List</h1>
              <Link href="/expenses/add">
                <button
                  onClick={handleAddExpenseClick}
                  className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition-colors"
                >
                  + Add Expense
                </button>
              </Link>
            </div>

            <div className="flex-grow overflow-auto">
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
                        {expense.amount.toFixed(2)}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-800 text-center">
                        <div className="flex justify-center items-center space-x-8">
                          <Link href={`/expenses/${expense.id}/edit`}>
                            <img
                              src="/edit.svg"
                              alt="Edit"
                              onClick={handleEditExpenseClick}
                              className="cursor-pointer w-5 h-5"
                            />
                          </Link>
                          <img
                            src="/delete.svg"
                            alt="Delete"
                            onClick={() => handleDelete(expense.id)}
                            className="cursor-pointer w-5 h-5 text-red-600 hover:underline"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-between items-center mb-4">
                <div className="flex-grow flex justify-center">
                  <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="bg-primary text-white px-3 py-1 rounded disabled:opacity-50 text-sm"
                  >
                    {"<"}
                  </button>
                  <span className="mx-2 text-black">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="bg-primary text-white px-3 py-1 rounded disabled:opacity-50 text-sm"
                  >
                    {">"}
                  </button>
                </div>
              </div>

              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800">
                  Total Expenses: ${totalAmount.toFixed(2)}
                </h2>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewExpensePage;
