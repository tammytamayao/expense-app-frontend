import React from "react";
import Link from "next/link";

interface ExpenseSubHeaderProps {
  onAddExpenseClick: () => void;
}

const ExpenseSubHeader: React.FC<ExpenseSubHeaderProps> = ({
  onAddExpenseClick,
}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold text-gray-800">Expense List</h1>
      <Link href="/expenses/add">
        <button
          onClick={onAddExpenseClick}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition-colors"
        >
          + Add Expense
        </button>
      </Link>
    </div>
  );
};

export default ExpenseSubHeader;
