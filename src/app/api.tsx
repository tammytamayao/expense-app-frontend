const API_URL = "http://127.0.0.1:3000/api";

export interface Expense {
  id: number;
  title: string;
  description: string;
  amount: number;
  date: Date;
}

type NewExpense = Omit<Expense, "id">;

export const loginUser = async (
  username: string,
  password: string
): Promise<any> => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) {
    throw new Error("Invalid credentials");
  }
  return await response.json();
};

export const fetchExpenses = async (
  page: number
): Promise<{
  expenses: Expense[];
  total_amount: number;
  current_page: number;
  per_page: number;
  total_pages: number;
}> => {
  const response = await fetch(`${API_URL}/expenses?page=${page}`, {
    headers: {
      Username: localStorage.getItem("username") || "",
    },
  });
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
      Username: localStorage.getItem("username") || "",
    },
    body: JSON.stringify(expense),
  });
  if (!response.ok) {
    throw new Error("Failed to add expense");
  }
  return await response.json();
};

export const editExpense = async (id: number): Promise<Expense> => {
  const response = await fetch(`${API_URL}/expenses/${id}`, {
    headers: {
      Username: localStorage.getItem("username") || "",
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to retrieve expense`);
  }
  return response.json();
};

export const updateExpense = async (
  id: number,
  expense: NewExpense
): Promise<Expense> => {
  const response = await fetch(`${API_URL}/expenses/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Username: localStorage.getItem("username") || "",
    },
    body: JSON.stringify(expense),
  });
  if (!response.ok) {
    throw new Error("Failed to update expense");
  }
  return await response.json();
};

export const deleteExpense = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/expenses/${id}`, {
    method: "DELETE",
    headers: {
      Username: localStorage.getItem("username") || "",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to delete expense");
  }
};
