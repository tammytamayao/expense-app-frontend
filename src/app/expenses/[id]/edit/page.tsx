"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ExpenseForm from "../../../components/ExpenseForm";
import { editExpense, updateExpense } from "../../../api";

interface Expense {
  id?: number;
  title: string;
  description: string;
  amount: number;
}

const EditExpensePage: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();
  const [expense, setExpense] = useState<Expense | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadExpense = async () => {
      try {
        const fetchedExpense = await editExpense(Number(id));
        console.log(fetchedExpense);
        setExpense(fetchedExpense);
      } catch (error) {
        setError("Failed to load expense data.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadExpense();
    }
  }, [id]);

  const handleSubmit = async (updatedExpense: Expense) => {
    try {
      await updateExpense(Number(id), updatedExpense);
      router.push("/expenses");
    } catch (error) {
      setError("Failed to update expense. Please try again.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-left max-w-xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-800">Edit Expense</h1>
          <button
            onClick={() => router.back()}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
          >
            Back
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
  );
};

export default EditExpensePage;
