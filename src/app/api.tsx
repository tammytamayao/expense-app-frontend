const API_URL = "http://127.0.0.1:3000/api";

export interface Expense {
  id: number;
  title: string;
  description: string;
  amount: number;
  date: Date;
}

export interface UserCredentials {
  email: string;
  password: string;
  password_confirmation?: string;
}

type NewExpense = Omit<Expense, "id">;

export const registerUser = async (
  credentials: UserCredentials
): Promise<{ id: number; email: string }> => {
  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `Failed to create account: ${errorData.error || errorData.message}`
    );
  }

  return await response.json();
};

export const loginUser = async (
  credentials: UserCredentials
): Promise<{ message: string; user: { id: number; email: string } }> => {
  const response = await fetch(`${API_URL}/users/sign_in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user: credentials }),
    credentials: "include", // To handle cookies if your backend sets them
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Login failed: ${errorData.message}`);
  }

  return await response.json();
};

export const logoutUser = async (): Promise<{ message: string }> => {
  const response = await fetch(`${API_URL}/users/sign_out`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Logout failed");
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
  const response = await fetch(`${API_URL}/expenses?page=${page}`);
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

export const editExpense = async (id: number) => {
  const response = await fetch(`${API_URL}/expenses/${id}`);
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
  });
  if (!response.ok) {
    throw new Error("Failed to delete expense");
  }
};
