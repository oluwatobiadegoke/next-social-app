import SinglePost from "./SinglePost";

const Posts = (props) => {
  const { posts, setPosts } = props;
  return (
    <div className="mt-4">
      {posts.map((post) => {
        const { postId, poster, comments, likes, content, posterId } = post;
        return (
          <SinglePost
            setPosts={setPosts}
            posterId={posterId}
            postId={postId}
            poster={poster}
            likes={likes}
            content={content}
            key={postId}
          />
        );
      })}
    </div>
  );
};

export default Posts;
