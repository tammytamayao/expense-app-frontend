"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { addExpense, editExpense, updateExpense } from "@/app/api";
import { Expense } from "@/app/types";

const useHandleExpense = (id?: string) => {
  const router = useRouter();
  const [expense, setExpense] = useState<Expense | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const username = sessionStorage.getItem("username");

  useEffect(() => {
    if (!username) {
      router.push("/");
    }
  }, [username]);

  useEffect(() => {
    const loadExpense = async () => {
      if (id) {
        try {
          const fetchedExpense = await editExpense(Number(id));
          setExpense(fetchedExpense);
        } catch (error) {
          setMessage("Failed to load expense data.");
          setIsSuccess(false);
        }
      }
    };

    loadExpense();
  }, [id]);

  const handleSubmit = async (updatedExpense: Expense) => {
    if (!username) {
      setMessage("User not found. Please log in again.");
      setIsSuccess(false);
      return;
    }

    const expenseData = {
      ...updatedExpense,
      username,
    };

    try {
      if (id) {
        await updateExpense(Number(id), expenseData);
        setMessage("Expense updated successfully!");
      } else {
        await addExpense(expenseData);
        setMessage("Expense added successfully!");
      }
      setIsSuccess(true);
      setTimeout(() => router.push("/expenses"), 1000);
    } catch (error) {
      setMessage("Failed to process expense. Please try again.");
      setIsSuccess(false);
      setTimeout(() => {
        setMessage(null);
      }, 1000);
    }
  };

  return {
    expense,
    message,
    isSuccess,
    handleSubmit,
  };
};

export default useHandleExpense;
