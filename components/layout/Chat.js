import { useGlobalChatContext } from "../../state/chatContext/chatContext";
import Messages from "../chat/indMessages/Messages";
import Chats from "../chat/indMessages/Chats";

const Chat = () => {
  const { isChatting } = useGlobalChatContext();
  return (
    <div className="absolute top-0 right-0">
      {isChatting ? <Messages /> : <Chats />}
    </div>
  );
};

export default Chat;
