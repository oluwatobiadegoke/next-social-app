import { useState } from "react";
import { VscSmiley } from "react-icons/vsc";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import firebase from "firebase/app";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

import { db } from "../../../firebase";
import { useGlobalChatContext } from "../../../state/chatContext/chatContext";

const MessageInput = () => {
  const router = useRouter();
  const [session] = useSession();

  const { setScrollDown, scrollDown } = useGlobalChatContext();

  const [message, setMessage] = useState();
  const [emojiOpen, setEmojiOpen] = useState(false);

  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setMessage(message + emoji);
  };

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection("chats").doc(router.query.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message,
      user: session.user.name,
    });

    setMessage("");
    setScrollDown(!scrollDown);
  };

  return (
    <form className=" relative flex items-center w-full shadow-sm py-4 px-2 bg-indigo-900 rounded">
      {emojiOpen && (
        <div className="absolute left-2" style={{ top: "-425px" }}>
          <Picker onSelect={(e) => addEmoji(e)} />
        </div>
      )}
      <div className="cursor-pointer" onClick={() => setEmojiOpen(!emojiOpen)}>
        <VscSmiley className="text-green-500 text-xl" />
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="bg-indigo-800 ml-3 rounded w-full text-black-100"
      />
      <button disabled={!message} hidden onClick={(e) => sendMessage(e)}>
        Send message
      </button>
    </form>
  );
};

export default MessageInput;
