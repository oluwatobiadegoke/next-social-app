import "../styles/globals.css";
import { Provider } from "next-auth/client";

// import Layout from "../components/layout/Layout";
import ChatProvider from "../state/chatContext/chatState";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <ChatProvider>
        <Component {...pageProps} />
      </ChatProvider>
    </Provider>
  );
}

export default MyApp;
