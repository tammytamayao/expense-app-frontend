"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ExpenseForm from "../../components/ExpenseForm";
import { editExpense, updateExpense } from "../../../api";
import ExpenseFormContainer from "../../components/ExpenseFormContainer";

interface Expense {
  id?: number;
  title: string;
  description: string;
  amount: number;
  date: Date;
  username?: string;
}

const EditExpensePage: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();
  const [expense, setExpense] = useState<Expense | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    const loadExpense = async () => {
      try {
        const fetchedExpense = await editExpense(Number(id));
        setExpense(fetchedExpense);
      } catch {
        setMessage("Failed to load expense data.");
        setIsSuccess(false);
      }
    };

    if (id) {
      loadExpense();
    }
  }, [id]);

  const handleSubmit = async (updatedExpense: Expense) => {
    try {
      await updateExpense(Number(id), updatedExpense);
      setMessage("Expense updated successfully!");
      setIsSuccess(true);
      setTimeout(() => router.push("/expenses"), 1000);
    } catch {
      setMessage("Failed to update expense. Please try again.");
      setIsSuccess(false);
      setTimeout(() => setMessage(null), 1000);
    }
  };

  return (
    <ExpenseFormContainer
      title="Edit Expense"
      isEdit={true}
      onSubmit={handleSubmit}
      message={message}
      setMessage={setMessage}
      isSuccess={isSuccess}
      setIsSuccess={setIsSuccess}
    >
      {expense && (
        <ExpenseForm initialData={expense} onSubmit={handleSubmit} isEdit />
      )}
    </ExpenseFormContainer>
  );
};

export default EditExpensePage;
