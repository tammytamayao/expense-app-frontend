"use client";

import { useState } from "react";
import { UserFormProps } from "@/app/types";

const UserForm: React.FC<UserFormProps> = ({ onSubmit, buttonLabel }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(username, password);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="mb-4 px-4 py-2 border text-gray-600 rounded focus:outline-none focus:ring focus:ring-primary-300"
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-4 px-4 py-2 border text-gray-600 rounded focus:outline-none focus:ring focus:ring-primary-300"
        required
      />

      <button
        type="submit"
        className="w-full mb-2 px-4 py-2 bg-primary text-white rounded hover:bg-secondary transition-colors"
      >
        {buttonLabel}
      </button>
    </form>
  );
};

export default UserForm;
