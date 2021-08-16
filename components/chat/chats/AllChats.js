import { BsChatDots } from "react-icons/bs";

const AllChats = ({ name }) => {
  return (
    <div className="flex justify-between items-center mx-0 my-2 py-3 px-2 bg-indigo-800 rounded transition-all hover:mx-1 hover:py-2 cursor-pointer">
      <p>{name}</p>
      <BsChatDots className="text-black-100" />
    </div>
  );
};

export default AllChats;
