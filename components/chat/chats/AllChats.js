import { BsChatDots } from "react-icons/bs";
import { useSession } from "next-auth/client";
// import { useCollection } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";

import getRecipientName from "../../utils/getRecipientName";
// import { db } from "../../../firebase";
import { useGlobalChatContext } from "../../../state/chatContext/chatContext";

const AllChats = ({ users, id }) => {
  const [session] = useSession();
  const router = useRouter();

  const chatName = getRecipientName(users, session.user.name);

  const handleRoute = () => {
    router.push(`/chat/${id}`);
  };

  return (
    <div
      className="flex justify-between items-center mx-0 my-2 py-3 px-2 bg-indigo-800 rounded transition-all hover:mx-1 hover:py-2 cursor-pointer"
      onClick={handleRoute}
    >
      <p>{chatName}</p>
      <BsChatDots className="text-black-100" />
    </div>
  );
};

export default AllChats;
