import { useSession } from "next-auth/client";
import { CgBoy } from "react-icons/cg";
import { FiInfo } from "react-icons/fi";
import Image from "next/image";

const Bio = () => {
  const [session] = useSession();
  return (
    <div className="flex flex-col items-center mt-10 mb-4">
      <div className="w-32 h-32 profileDiv">
        {session?.user?.profilePicture ? (
          <Image
            width={128}
            height={128}
            src={session?.user?.profilePicture}
            alt="image"
          />
        ) : (
          <p className="font-bold text-3xl  text-transparent bg-clip-text bg-gradient-to-br from-light-400 to-black-200">
            {session?.user?.name.slice(0, 1).toUpperCase()}
          </p>
        )}
      </div>
      <div className="flex items-center">
        <CgBoy className="text-base text-black-100" />
        <p className="text-black-100 text-sm font-bold my-1 ml-2">
          {session?.user?.name}
        </p>
      </div>
      <div className="flex items-center">
        <FiInfo className="text-base text-black-100" />
        <p className="text-black-100 text-sm font-bold ml-2">
          {session?.user?.bio}
        </p>
      </div>
    </div>
  );
};

export default Bio;
