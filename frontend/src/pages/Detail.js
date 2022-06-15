import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import styled, { css } from "styled-components";
import Comment from "../components/Comment";

import { MainBody, Width } from "../elements/commonStyle";
import { SmallBtn, MainBtn } from "../elements/Btn";
import { Input } from "../elements/Input";
import { getCommentListDB, postCommentDB } from "../redux/modules/comment";
import { getPostOneDB, deletePostDB } from "../redux/modules/post";

const Detail = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isOwner, setisOwner] = useState(true);
  const post = useSelector((state) => state.post.postOne);
  const user = useSelector((state) => state.user.user);
  const commentList = useSelector((state) => state.comment.commentList);
  // console.log(commentList);
  const commentRef = useRef("");
  const navigate = useNavigate();
  const [comment, setComment] = useState("");

  const postId = location.state.postId;

  // 댓글 작성하기
  const onClickWrite = () => {
    const commentObj = {
      postId: postId,
      userId: "user.userId",
      nickName: "nickName",
      content: commentRef.current.value,
    };
    dispatch(postCommentDB(commentObj));
    setComment("");
  };

  // 댓글 삭제하기
  const deletePost = () => {
    dispatch(deletePostDB(postId));
  };

  // 해당 게시물과 댓글 목록 불러오기
  useEffect(() => {
    dispatch(getPostOneDB(postId));
    dispatch(getCommentListDB(postId));
  }, [dispatch, postId]);

  const onChangeComment = (event) => {
    setComment(event.target.value);
  };

  return (
    <MainBody>
      <ContentWrap>
        <PostImg src={post.imageUrl} alt="post image" />
        <Wrap>
          <h2>{post.title}</h2>
          <div>{post.createdAt}</div>
          <span>{post.nickName}</span>
          {isOwner && (
            <span>
              <SmallBtn
                onClick={() => {
                  navigate(`/edit/${postId}`);
                }}
              >
                수정
              </SmallBtn>
              <SmallBtn onClick={deletePost}>삭제</SmallBtn>
            </span>
          )}

          <p>{post.content}</p>
        </Wrap>

        <CommentWrap>
          <div>
            <Input
              ref={commentRef}
              value={comment}
              onChange={onChangeComment}
              placeholder="댓글 달기..."
            />
            <MainBtn onClick={onClickWrite}>입력</MainBtn>
          </div>
        </CommentWrap>
        <div>
          {commentList.map((comment) => {
            return <Comment key={comment._id} commentObj={comment} />;
          })}
        </div>
      </ContentWrap>
    </MainBody>
  );
};

const ContentWrap = styled.article`
  max-width: 800px;
  margin: 0 auto;
  div {
    margin: 15px auto;
  }
`;
const Wrap = styled.div`
  ${Width}
  div {
    color: silver;
  }
`;
const PostImg = styled.img`
  width: 100%;
  max-height: 800px;
  object-fit: scale-down;
`;
const CommentWrap = styled.div`
  ${Width}
`;

export default Detail;
