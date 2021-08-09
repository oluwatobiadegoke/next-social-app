import SingleComment from "./SingleComment";
import Scroll from "../../../utils/Scroll";

const Comment = (props) => {
  const { comments, mutate } = props;

  return (
    <Scroll>
      <div>
        {comments.map((acomment) => {
          const { postId, posterId, poster, commentId, comment, likes } =
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
            />
          );
        })}
      </div>
    </Scroll>
  );
};

export default Comment;
