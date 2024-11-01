import { useState, useEffect } from "react";
import { addExpense } from "../api";

interface Expense {
  id?: number;
  title: string;
  description: string;
  amount: number;
}

interface ExpenseFormProps {
  initialData?: Expense;
  onSubmit: (expense: Expense) => void;
  isEdit: boolean;
}

export default function ExpenseForm({
  initialData,
  onSubmit,
  isEdit,
}: ExpenseFormProps) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setAmount(initialData.amount);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const expense: Expense = {
      id: initialData?.id,
      title,
      description,
      amount,
    };

    try {
      if (!isEdit) {
        const newExpense = await addExpense(expense);
        onSubmit(newExpense);
      } else {
        onSubmit(expense);
      }
    } catch (err) {
      setError("Failed to add expense. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col">
        <label className="text-gray-700 font-medium mb-1">Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="px-4 py-2 text-gray-700 font-medium border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-gray-700 font-medium mb-1">Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="px-4 py-2 text-gray-700 font-medium border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-gray-700 font-medium mb-1">Amount:</label>
        <input
          type="text"
          value={amount === 0 ? "" : amount}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*$/.test(value)) {
              setAmount(Number(value));
            }
          }}
          required
          className="px-4 py-2 text-gray-700 font-medium border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-4 py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 disabled:bg-blue-300"
      >
        {loading ? "Saving..." : isEdit ? "Update" : "Add"}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
}
