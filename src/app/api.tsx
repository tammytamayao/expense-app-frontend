const API_URL = "http://127.0.0.1:3000/api";

export interface Expense {
  id: number;
  title: string;
  description: string;
  amount: number;
}

type NewExpense = Omit<Expense, "id">;

export const fetchExpenses = async (): Promise<Expense[]> => {
  const response = await fetch(`${API_URL}/expenses`);
  if (!response.ok) {
    throw new Error("Failed to fetch expenses");
  }
  return await response.json();
};

export const addExpense = async (expense: NewExpense): Promise<Expense> => {
  const response = await fetch(`${API_URL}/expenses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(expense),
  });
  if (!response.ok) {
    throw new Error("Failed to add expense");
  }
  return await response.json();
};

export const deleteExpense = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/expenses/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete expense");
  }
};
