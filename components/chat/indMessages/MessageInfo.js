import { TiArrowBackOutline } from "react-icons/ti";
import { useRouter } from "next/router";

import { useGlobalChatContext } from "../../../state/chatContext/chatContext";

const MessageInfo = ({ chatWith }) => {
  const router = useRouter();

  return (
    <div className="sticky top-0 left-0 flex items-center shadow-lg bg-indigo-900 rounded px-2 py-2">
      <div
        className="h-11 w-11 rounded-full bg-indigo-900 flex items-center justify-center cursor-pointer transition-all hover:bg-indigo-800"
        onClick={() => router.back()}
      >
        <TiArrowBackOutline className="text-3xl text-green-500" />
      </div>
      <p className="text-black-100 text-xl font-bold ml-6">{chatWith}</p>
    </div>
  );
};

export default MessageInfo;
