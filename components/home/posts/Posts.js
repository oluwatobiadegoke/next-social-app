import SinglePost from "./SinglePost";

const Posts = (props) => {
  const { posts } = props;
  return (
    <div className="mt-4">
      {posts.map((post) => {
        const { postId, poster, comments, likes, content } = post;
        return (
          <SinglePost
            poster={poster}
            comments={comments}
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
