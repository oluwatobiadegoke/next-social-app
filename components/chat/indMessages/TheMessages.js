import { useCollection } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

import { db } from "../../../firebase";
import Message from "./Message";
import { useGlobalChatContext } from "../../../state/chatContext/chatContext";
import Scroll from "../../utils/Scroll";

const TheMessages = ({ messages }) => {
  const router = useRouter();

  const scrollUpRef = useRef(null);
  const { scrollDown } = useGlobalChatContext();

  const [msgSnapshot] = useCollection(
    db
      .collection("chats")
      .doc(router.query.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );

  useEffect(() => {
    scrollUpRef.current.scrollIntoView({
      behaviour: "smooth",
      block: "start",
    });
  }, [scrollDown]);

  const showMessages = () => {
    if (msgSnapshot) {
      return msgSnapshot.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ));
    } else {
      return JSON.parse(messages).map((message) => (
        <Message key={message.id} user={message.user} message={message} />
      ));
    }
  };

  return (
    <Scroll>
      <div className="flex-1 flex flex-col w-full px-2 overflow-auto">
        {showMessages()}
        <div ref={scrollUpRef}></div>
      </div>
    </Scroll>
  );
};

export default TheMessages;
