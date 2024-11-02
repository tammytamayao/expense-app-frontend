import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/logo.png";

const Header: React.FC = () => {
  return (
    <header className="bg-secondary shadow-md">
      <div className="mx-auto px-2 py-2 flex items-center">
        {" "}
        <Link href="/" className="flex items-center">
          {" "}
          <Image src={logo} alt="Logo" width={50} height={50} />
          <h1 className="ml-2 text-2xl font-bold">
            {" "}
            <span className="text-white">BRIGHT </span>
            <span className="text-white">MONEY</span>
          </h1>
        </Link>
      </div>
    </header>
  );
};

export default Header;
