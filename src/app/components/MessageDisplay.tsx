import React from "react";
import { MessageDisplayProps } from "@/app/types";

const MessageDisplay: React.FC<MessageDisplayProps> = ({
  message,
  isSuccess,
}) => {
  if (!message) return null;

  return (
    <div className="mb-4">
      <div
        className={`p-4 rounded ${
          isSuccess
            ? "bg-green-100 border border-green-400 text-green-800"
            : "bg-red-100 border border-red-400 text-red-800"
        }`}
      >
        <p>{message}</p>
      </div>
    </div>
  );
};

export default MessageDisplay;
