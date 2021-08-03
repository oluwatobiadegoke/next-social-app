import React, { useState, useEffect } from "react";
import useSWR from "swr";

import Posts from "./Posts";
import Spinner from "../../utils/Spinner";

const Post = () => {
  const [posts, setPosts] = useState();

  const { data: data, error } = useSWR("/api/posts");

  useEffect(() => {
    if (data) {
      setPosts(data.data);
    }
  }, [data]);

  if (error) {
    return (
      <div className="mt-4 text-center px-4">
        <p className="text-red-500 font-bold">
          Error! Couldn't fetch posts. Please refresh the page or try again
          later
        </p>
      </div>
    );
  }

  if (!data || !posts) {
    return (
      <div className="mt-4 flex justify-center">
        <Spinner />
      </div>
    );
  }

  if (posts.length < 1) {
    return (
      <div className="mt-4 text-center px-4">
        <p className="text-red-500 font-bold">
          There are currently no post available.
        </p>
      </div>
    );
  }

  return (
    <div>
      <Posts posts={posts} />
    </div>
  );
};

export default Post;
