import React from "react";
import Link from "next/link";
import { NoExpensesMessageProps } from "@/app/types";

const NoExpensesMessage: React.FC<NoExpensesMessageProps> = ({
  onAddExpenseClick,
}) => (
  <div className="bg-yellow-100 border border-yellow-400 text-gray-800 p-4 rounded">
    <p>
      No expenses found. To add some expenses, &nbsp;
      <Link href="/expenses/add">
        <button className="text-blue-800 underline" onClick={onAddExpenseClick}>
          Click here
        </button>
      </Link>
    </p>
  </div>
);

export default NoExpensesMessage;
