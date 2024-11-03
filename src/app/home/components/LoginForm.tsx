"use client";

import { useState } from "react";

const LoginForm: React.FC<{
  onSubmit: (email: string, password: string) => void;
}> = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(email, password);
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col">
      <input
        type="text"
        placeholder="Username"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
