import SingleComment from "./SingleComment";
import Scroll from "../../../components/utils/Scroll";

const Comment = (props) => {
  const { comments } = props;

  return (
    <Scroll>
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
    </Scroll>
  );
};

export default Comment;
