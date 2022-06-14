import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import styled from "styled-components";
import Comment from "../components/Comment";

import { MainBody } from "../components/commonStyle";
import comment, {
  getCommentListDB,
  postCommentDB,
} from "../redux/modules/comment";
import { getPostOneDB, deletePostDB } from "../redux/modules/post";

const Detail = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isOwner, setisOwner] = useState(true);
  const post = useSelector((state) => state.post.postOne);
  const user = useSelector((state) => state.user);
  // console.log(user.user);
  const comments = useSelector((state) => state.comment.commentList);
  console.log(comments);
  const commentRef = useRef("");
  const navigate = useNavigate();

  const postId = location.state.postId;

  const onClickWrite = () => {
    const commentObj = {
      postId: postId,
      userId: "userId",
      nickName: "nickName",
      content: commentRef.current.value,
    };
    dispatch(postCommentDB(commentObj));
  };

  const deletePost = () => {
    dispatch(deletePostDB(postId));
  };

  useEffect(() => {
    dispatch(getPostOneDB(postId));
    dispatch(getCommentListDB(postId));
  }, [dispatch, postId]);
  return (
    <MainBody>
      <div>
        <span>{post.nickName}</span>
        {isOwner && (
          <>
            <button
              onClick={() => {
                navigate(`/edit/${postId}`);
              }}
            >
              수정
            </button>
            <button onClick={deletePost}>삭제</button>
          </>
        )}
      </div>

      <PostImg src={post.imageUrl} alt="post image" />

      <div>{post.createdAt}</div>
      <div>{post.title}</div>
      <div>{post.content}</div>
      <div>
        <input ref={commentRef} placeholder="댓글 달기..." />
        <button onClick={onClickWrite}>입력</button>
      </div>
      <div>
        {comments.map((comment) => {
          return <Comment key={comment.commentId} comment={comment} />;
        })}
      </div>
    </MainBody>
  );
};

const PostImg = styled.img`
  width: 100%;
  max-height: 800px;
  object-fit: scale-down;
  background-color: #f2f2f2;
`;

export default Detail;
