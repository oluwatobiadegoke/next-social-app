import { useSession } from "next-auth/client";

import Messages from "../../components/chat/indMessages/Messages";
import { db } from "../../firebase";
import getRecipientName from "../../components/utils/getRecipientName";

const ChatMessages = ({ messages, chat }) => {
  const [session] = useSession();

  const chatWith = getRecipientName(chat.user, session.user.name);

  return (
    <section>
      <div className="w-full">
        <Messages chatWith={chatWith} messages={messages} />
      </div>
    </section>
  );
};

export default ChatMessages;

export async function getServerSideProps(context) {
  const ref = db.collection("chats").doc(context.params.id);

  const mesResponse = await ref
    .collection("messages")
    .orderBy("timestamp", "asc")
    .get();

  const messages = mesResponse.docs
    .map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    })
    .map((messages) => ({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime(),
    }));

  const chatResponse = await ref.get();
  const chat = {
    id: chatResponse.id,
    ...chatResponse.data(),
  };

  return {
    props: {
      messages: JSON.stringify(messages),
      chat,
    },
  };
}
