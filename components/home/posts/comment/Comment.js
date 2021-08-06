import SingleComment from "./SingleComment";

const Comment = (props) => {
  const { comments } = props;

  return (
    <div>
      {comments.map((acomment) => {
        const { postId, posterId, poster, commentId, comment, likes } =
          acomment;
        return (
          <SingleComment
            postId={postId}
            posterId={posterId}
            poster={poster}
            commentId={commentId}
            comment={comment}
            likes={likes}
            key={commentId}
          />
        );
      })}
    </div>
  );
};

export default Comment;
