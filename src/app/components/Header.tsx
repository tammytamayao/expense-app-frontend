import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/logo.png";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { logoutUser } from "../api";

const Header: React.FC = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogout = async () => {
    try {
      await logoutUser();
      console.log("Logout successful");
      router.push("/");
    } catch (error) {
      setErrorMessage((error as Error).message);
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="bg-secondary shadow-md">
      <div className="mx-auto px-2 py-2 flex items-center justify-between">
        {" "}
        <Link href="/" className="flex items-center">
          <Image src={logo} alt="Logo" width={50} height={50} />
          <h1 className="ml-2 text-2xl font-bold">
            <span className="text-white">BRIGHT </span>
            <span className="text-white">MONEY</span>
          </h1>
        </Link>
        <button
          onClick={handleLogout}
          className="ml-auto text-white text-lg px-4 py-2 rounded hover:bg-red-600 transition-colors" // Add styling for the logout button
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
