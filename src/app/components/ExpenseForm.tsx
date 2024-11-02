import { useState } from "react";

interface Expense {
  id?: number;
  title: string;
  description: string;
  amount: number;
  date: Date;
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
  const [title, setTitle] = useState<string>(initialData?.title || "");
  const [description, setDescription] = useState<string>(
    initialData?.description || ""
  );
  const [amount, setAmount] = useState<string>(
    initialData?.amount?.toString() || ""
  );
  const [date, setDate] = useState<string>(
    initialData?.date
      ? new Date(initialData.date).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0]
  );
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const expense: Expense = {
      id: initialData?.id,
      title,
      description,
      amount: parseFloat(amount) || 0,
      date: new Date(date),
    };

    if (!title || !description || !amount || !date) {
      setError("All fields are required.");
      return;
    }

    setError(null);
    onSubmit(expense);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Form fields */}
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
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          step="0.01"
          required
          className="px-4 py-2 text-gray-700 font-medium border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-gray-700 font-medium mb-1">Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="px-4 py-2 text-gray-700 font-medium border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <button
        type="submit"
        className="mt-4 py-2 px-4 bg-primary text-white font-semibold rounded hover:bg-secondary"
      >
        {isEdit ? "Update" : "Add"}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
}
