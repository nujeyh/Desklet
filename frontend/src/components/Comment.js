import React from "react";
import { useSelector } from "react-redux";

const Comment = ({ comment }) => {
  return (
    <div>
      <span>{comment.nickName}</span>
      <span>{comment.content}</span>
      <span>{comment.createdAt}</span>
      <button>수정</button>
      <button>삭제</button>
    </div>
  );
};

export default Comment;
