import { getSession, signOut } from "next-auth/client";

import PostInput from "../../../components/home/postinput/PostInput";
import Post from "../../../components/home/posts/Post";
import Scroll from "../../../components/utils/Scroll";

const index = () => {
  return (
    <Scroll>
      <section
        className="px-5 relative"
        style={{ height: "calc(100vh - 64px)" }}
      >
        <PostInput />
        <div className="h-h w-full bg-black-100"></div>
        <Post />
      </section>
    </Scroll>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default index;
