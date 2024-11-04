import Image from "next/image";
import nextImage from "../../../public/logo.png";

const UserFormHeader: React.FC = () => {
  return (
    <div className="text-center">
      <Image
        src={nextImage}
        alt="Welcome to Expense Tracker"
        className="mb-2 w-80 h-60"
      />
      <h1 className="mb-4 text-2xl font-bold">
        <span className="text-black">B R I G H T</span>
        &nbsp;&nbsp;&nbsp;
        <span className="text-primary">M O N E Y</span>
      </h1>
    </div>
  );
};

export default UserFormHeader;
