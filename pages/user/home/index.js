import { getSession } from "next-auth/client";
import { useState } from "react";

import PostInput from "../../../components/home/postinput/PostInput";
import Post from "../../../components/home/posts/Post";
import Scroll from "../../../components/utils/Scroll";

const index = () => {
  const [postUpdated, setPostUpdated] = useState(false);

  return (
    <Scroll>
      <section className="px-5 relative bg-indigo-800">
        <PostInput setPostUpdated={setPostUpdated} postUpdated={postUpdated} />
        <div className="h-h w-full bg-indigo-700"></div>
        <Post setPostUpdated={setPostUpdated} postUpdated={postUpdated} />
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
