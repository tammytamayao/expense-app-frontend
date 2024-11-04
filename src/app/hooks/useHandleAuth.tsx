import { useState } from "react";

const useHandleAuth = (
  authFunction: (username: string, password: string) => Promise<any>
) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleSubmit = async (username: string, password: string) => {
    try {
      const data = await authFunction(username, password);
      console.log("Operation successful", data);
      return true;
    } catch (error) {
      setErrorMessage((error as Error).message);
      setIsSuccess(false);
      console.error("Operation failed:", error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 1000);
      return false;
    }
  };

  return { errorMessage, isSuccess, handleSubmit };
};

export default useHandleAuth;
