import SinglePost from "./SinglePost";

const Posts = (props) => {
  const { posts } = props;
  return (
    <div className="mt-4">
      {posts.map((post) => {
        const { id, owner, pic, comments, likes, thepost } = post;
        return (
          <SinglePost
            owner={owner}
            pic={pic}
            comments={comments}
            likes={likes}
            thepost={thepost}
            key={id}
          />
        );
      })}
    </div>
  );
};

export default Posts;
