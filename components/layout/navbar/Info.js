import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/client";

const Info = () => {
  const [session] = useSession();
  console.log(session.user);
  return (
    <div className="flex-1 flex items-center justify-end">
      <Link href="/profile">
        <p className="text-black-100 font-bold">{session?.user?.name}</p>
      </Link>
      <div className="w-11 h-11 rounded-full flex items-center justify-center bg-indigo-800 drop-shadow-xl ml-4">
        {!session?.user?.image === undefined ? (
          <Image
            width={44}
            height={44}
            src={session?.user?.image}
            alt="image"
          />
        ) : (
          <p className="font-bold text-3xl  text-transparent bg-clip-text bg-gradient-to-br from-light-400 to-black-200">
            {session?.user?.name.slice(0, 1).toUpperCase()}
          </p>
        )}
      </div>
    </div>
  );
};

export default Info;
