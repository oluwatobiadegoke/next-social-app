import React, { useState, useEffect } from "react";

import { db } from "../../../firebase";
import Posts from "./Posts";
import Spinner from "../../utils/Spinner";

const Post = ({ setPostUpdated, postUpdated }) => {
  const [posts, setPosts] = useState([]);
  //to trigger comment loading
  const [loadComments, setLoadComments] = useState(false);

  const deletePost = (id) => {
    const newPosts = posts.filter((post) => post.postId !== id);
    setPosts(newPosts);
  };

  useEffect(() => {
    let thePosts = [];
    const unsubscribe = db
      .collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const doc = change.doc;
          if (change.type === "added") {
            thePosts.push({ ...doc.data(), theid: doc.id });
          } else if (change.type === "removed") {
            deletePost(doc.id);
          }
        });
        setLoadComments(!loadComments);
        setPosts(thePosts);
      });

    return () => {
      unsubscribe();
    };
  }, [postUpdated]);

  console.log(loadComments);

  if (!posts) {
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
      <Posts
        posts={posts}
        setPosts={setPosts}
        setPostUpdated={setPostUpdated}
        postUpdated={postUpdated}
      />
    </div>
  );
};

export default Post;
