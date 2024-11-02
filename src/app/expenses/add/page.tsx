"use client";

import { useRouter } from "next/navigation";
import ExpenseForm from "../../components/ExpenseForm";
import Header from "@/app/components/Header";

interface Expense {
  id?: number;
  title: string;
  description: string;
  amount: number;
  date: Date;
}

const AddExpensePage: React.FC = () => {
  const router = useRouter();

  const handleSubmit = (expense: Expense) => {
    console.log("Expense added:", expense);
    router.push("/expenses");
  };

  return (
    <div>
      <Header />
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-left max-w-xl w-full">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-800">Add Expense</h1>
            <button
              onClick={() => router.back()}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
            >
              <strong>{">"}</strong>
            </button>
          </div>
          <ExpenseForm onSubmit={handleSubmit} isEdit={false} />
        </div>
      </div>
    </div>
  );
};

export default AddExpensePage;
