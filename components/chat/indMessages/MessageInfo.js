import { GrFormPrevious } from "react-icons/gr";
import { useGlobalChatContext } from "../../../state/chatContext/chatContext";

const MessageInfo = () => {
  const { currentChatRecipient, setIsChatting } = useGlobalChatContext();

  return (
    <div>
      <GrFormPrevious onClick={() => setIsChatting(false)} />
      <p>{currentChatRecipient}</p>
    </div>
  );
};

export default MessageInfo;
