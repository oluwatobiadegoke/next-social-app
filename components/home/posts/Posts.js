import SinglePost from "./SinglePost";

const Posts = (props) => {
  const { posts, setPostUpdated, postUpdated } = props;
  return (
    <div className="mt-4">
      {posts.map((post) => {
        const { postId, poster, likes, content, userId, theid, userPicture } =
          post;
        return (
          <SinglePost
            posterId={userId}
            postId={postId}
            poster={poster}
            posterPicture={userPicture}
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
