import { useState } from "react";
import { FormExpense, ExpenseFormProps } from "@/app/types";

export default function ExpenseForm({
  initialData,
  onSubmit,
  isEdit,
}: ExpenseFormProps) {
  const [title, setTitle] = useState<string>(initialData?.title || "");
  const [description, setDescription] = useState<string>(
    initialData?.description || ""
  );

  const initialAmount = initialData?.amount
    ? (typeof initialData.amount === "string"
        ? parseFloat(initialData.amount)
        : initialData.amount
      ).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : "0.00";

  const [amount, setAmount] = useState<string>(initialAmount);
  const [date, setDate] = useState<string>(
    initialData?.date
      ? new Date(initialData.date).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0]
  );
  const [error, setError] = useState<string | null>(null);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, "");
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(
        parseFloat(value).toLocaleString(undefined, {
          minimumFractionDigits: 0,
        }) || "0"
      );
    }
  };

  const handleAmountBlur = () => {
    const formattedAmount = parseFloat(amount.replace(/,/g, ""));
    setAmount(
      isNaN(formattedAmount)
        ? "0.00"
        : formattedAmount.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const expense: FormExpense = {
      id: initialData?.id,
      title,
      description,
      amount: parseFloat(amount),
      date: new Date(date),
    };

    if (!title || !description || isNaN(expense.amount) || !date) {
      setError("All fields are required.");
      return;
    }

    setError(null);
    onSubmit(expense);
  };

  const today = new Date().toISOString().split("T")[0];

  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 100);
  const min = minDate.toISOString().split("T")[0];

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
          value={amount}
          onChange={handleAmountChange}
          onBlur={handleAmountBlur}
          required
          className="px-4 py-2 text-gray-700 font-medium border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="0.00"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-gray-700 font-medium mb-1">Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          max={today}
          min={min}
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
