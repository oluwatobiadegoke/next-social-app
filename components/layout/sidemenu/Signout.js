import { BiLogOut } from "react-icons/bi";
import { signOut } from "next-auth/client";

const Signout = () => {
  return (
    <div className="flex h-full items-end justify-center mb-5">
      <button
        className="flex items-center justify-center shadow px-5 py-1 rounded text-black-100 text-sm cursor-pointer hover:text-red-500 transition-all"
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        <BiLogOut />
        <p className="ml-2">Sign out</p>
      </button>
    </div>
  );
};

export default Signout;
