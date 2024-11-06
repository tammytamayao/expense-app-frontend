"use client";

import React, { useEffect, useState } from "react";
import { fetchExpenses, deleteExpense } from "../api";
import MessageDisplay from "../components/MessageDisplay";
import Header from "../components/Header";
import Loader from "../components/Loader";
import ExpenseTable from "./components/ExpenseTable";
import Pagination from "./components/ExpensePagination";
import ExpenseSubHeader from "./components/ExpenseSubHeader";
import { useRouter } from "next/navigation";
import NoExpensesMessage from "./components/NoExpenseMessage";
import { Expense } from "../types";

const ViewExpensePage: React.FC = () => {
  const router = useRouter();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [navigating, setNavigating] = useState<boolean>(false);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
    totalAmount: 0,
  });

  const loadExpenses = async (page: number) => {
    setLoading(true);
    try {
      const data = await fetchExpenses(page);
      const formattedExpenses = formatExpenses(data.expenses);
      setExpenses(formattedExpenses);
      setPagination((prev) => ({
        ...prev,
        totalAmount: Number(data.total_amount),
        totalPages: data.total_pages,
        currentPage: data.current_page,
      }));
    } catch (error) {
      handleError("Failed to load expenses");
    } finally {
      setLoading(false);
    }
  };

  const formatExpenses = (expenses: any[]) => {
    return expenses.map((expense) => ({
      ...expense,
      amount:
        typeof expense.amount === "string"
          ? parseFloat(expense.amount)
          : expense.amount,
      date: new Date(expense.date),
    }));
  };

  const handleError = (message: string) => {
    setError(message);
    console.error(message);
    setTimeout(() => setError(null), 1500);
  };

  useEffect(() => {
    const username = sessionStorage.getItem("username");
    if (!username) {
      router.push("/");
    } else {
      loadExpenses(pagination.currentPage);
    }
  }, [pagination.currentPage]);

  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      await deleteExpense(id);
      setSuccessMessage("Expense deleted successfully!");
      setTimeout(() => setSuccessMessage(null), 1500);

      if (expenses.length === 1 && pagination.currentPage > 1) {
        setPagination((prev) => ({
          ...prev,
          currentPage: prev.currentPage - 1,
        }));
      } else {
        await loadExpenses(pagination.currentPage);
      }
    } catch (error) {
      handleError("Failed to delete expense");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (direction: "next" | "prev") => {
    setPagination((prev) => ({
      ...prev,
      currentPage:
        direction === "next" ? prev.currentPage + 1 : prev.currentPage - 1,
    }));
  };

  const handleNavigation = () => {
    setNavigating(true);
    setTimeout(() => setNavigating(false), 1500);
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
          <NoExpensesMessage onAddExpenseClick={handleNavigation} />
        ) : (
          <div>
            <ExpenseSubHeader onAddExpenseClick={handleNavigation} />
            <div className="flex-grow overflow-auto">
              <ExpenseTable
                expenses={expenses}
                onDelete={handleDelete}
                onEdit={handleNavigation}
              />
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPreviousPage={() => handlePageChange("prev")}
                onNextPage={() => handlePageChange("next")}
              />
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800">
                  Total Expenses: ${pagination.totalAmount.toFixed(2)}
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
