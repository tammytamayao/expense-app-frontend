export interface Expense {
  id: number;
  title: string;
  description: string;
  amount: number;
  date: Date;
}

export type NewExpense = Omit<Expense, "id">;

export interface FormExpense {
  id?: number;
  title: string;
  description: string;
  amount: number;
  date: Date;
  username?: string;
}

export interface ExpenseFormProps {
  initialData?: FormExpense;
  onSubmit: (expense: FormExpense) => void;
  isEdit: boolean;
}

export interface ExpensePaginationProps {
  currentPage: number;
  totalPages: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

export interface ExpenseTableProps {
  expenses: Expense[];
  onDelete: (id: number) => void;
  onEdit: () => void;
}

export interface ExpenseSubHeaderProps {
  onAddExpenseClick: () => void;
}

export interface MessageDisplayProps {
  message: string | null;
  isSuccess: boolean;
}

export interface NoExpensesMessageProps {
  onAddExpenseClick: () => void;
}

export interface UserFormProps {
  onSubmit: (username: string, password: string) => void;
  buttonLabel: string;
}
