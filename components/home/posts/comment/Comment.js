import SingleComment from "./SingleComment";

const Comment = (props) => {
  const { comments, mutate, setCommentUpdated, commentUpdated } = props;

  return (
    <div>
      <p className="text-black-100 font-bold pl-4 mt-5">Comments</p>
      {comments.map((acomment) => {
        const { postId, posterId, poster, commentId, comment, likes, theid } =
          acomment;
        return (
          <SingleComment
            mutate={mutate}
            postId={postId}
            posterId={posterId}
            poster={poster}
            commentId={commentId}
            comment={comment}
            likes={likes}
            key={commentId}
            docId={theid}
            setCommentUpdated={setCommentUpdated}
            commentUpdated={commentUpdated}
          />
        );
      })}
    </div>
  );
};

export default Comment;
