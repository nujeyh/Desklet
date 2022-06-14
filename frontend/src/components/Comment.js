import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { putCommentDB, deleteCommentDB } from "../redux/modules/comment";

const Comment = ({ comment }) => {
  const [update, setUpdate] = useState(false);
  const dispatch = useDispatch();
  const commentRef = useRef("");

  const toggleUpdate = () => {
    setUpdate((prev) => !prev);
  };

  const onClickUpdate = () => {
    dispatch(putCommentDB(comment.commentId, commentRef));
  };

  const onClickDelete = () => {
    const isConfirm = window.confirm("댓글을 삭제하시겠어요?");
    if (isConfirm) {
      dispatch(deleteCommentDB(comment.commentId));
    }
  };

  return (
    <div>
      <span>{comment.nickName}</span>
      <span>{comment.content}</span>
      <span>{comment.createdAt}</span>
      <button onClick={toggleUpdate}>{update ? "닫기" : "수정"}</button>
      <button onClick={onClickDelete}>삭제</button>
      <div>
        {update ? (
          <>
            <input ref={commentRef} defaultValue={comment.content} />
            <button onClick={onClickUpdate}>입력</button>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Comment;
