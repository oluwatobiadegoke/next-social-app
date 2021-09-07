import "../styles/globals.css";
import { Provider } from "next-auth/client";

import Layout from "../components/layout/Layout";
import ChatProvider from "../state/chatContext/chatState";
import UserProvider from "../state/userContext/userState";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <UserProvider>
        <ChatProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChatProvider>
      </UserProvider>
    </Provider>
  );
}

export default MyApp;
