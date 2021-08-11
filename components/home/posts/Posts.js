import SinglePost from "./SinglePost";

const Posts = (props) => {
  const { posts, setPosts, setPostUpdated, postUpdated } = props;
  return (
    <div className="mt-4">
      {posts.map((post) => {
        const { postId, poster, comments, likes, content, userId, theid } =
          post;
        return (
          <SinglePost
            setPosts={setPosts}
            posterId={userId}
            postId={postId}
            poster={poster}
            likes={likes}
            content={content}
            key={postId}
            docId={theid}
            setPostUpdated={setPostUpdated}
            postUpdated={postUpdated}
          />
        );
      })}
    </div>
  );
};

export default Posts;
