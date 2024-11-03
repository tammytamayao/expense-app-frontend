"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ExpenseForm from "../components/ExpenseForm";
import { addExpense } from "../../api";
import ExpenseFormContainer from "../components/ExpenseFormContainer";

interface Expense {
  id?: number;
  title: string;
  description: string;
  amount: number;
  date: Date;
  username?: string;
}

const AddExpensePage: React.FC = () => {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleAdd = async (expense: Expense) => {
    try {
      await addExpense(expense);
      setMessage("Expense added successfully!");
      setIsSuccess(true);
      setTimeout(() => router.push("/expenses"), 1000);
    } catch {
      setMessage("Failed to add expense. Please try again.");
      setIsSuccess(false);
      setTimeout(() => setMessage(null), 1000);
    }
  };

  return (
    <ExpenseFormContainer
      title="Add Expense"
      isEdit={false}
      onSubmit={handleAdd}
      message={message}
      setMessage={setMessage}
      isSuccess={isSuccess}
      setIsSuccess={setIsSuccess}
    >
      <ExpenseForm onSubmit={handleAdd} isEdit={false} />
    </ExpenseFormContainer>
  );
};

export default AddExpensePage;
