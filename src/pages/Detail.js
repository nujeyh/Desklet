import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import Comment from "../components/Comment";
import { getCommentListDB, postCommentDB } from "../redux/modules/comment";
import { getPostOneDB, deletePostDB } from "../redux/modules/post";

import { MainBody, Width, Hr } from "../elements/commonStyle";
import { SmallBtn, MainBtn } from "../elements/Btn";
import { Input } from "../elements/Input";

const Detail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const post = useSelector((state) => state.post.postOne);
  const userId = useSelector((state) => state.user.user.userId);
  const commentList = useSelector((state) => state.comment.commentList);
  const nickName = useSelector((state) => state.user.user.nickName);

  const commentRef = useRef("");
  const [comment, setComment] = useState("");
  const [help, setHelp] = useState("");

  const postId = location.state.postId;

  // 댓글 작성하기
  const onClickWrite = () => {
    if (commentRef.current.value === "") {
      setHelp("댓글을 입력해주세요!");
      return false;
    }

    const commentObj = {
      postId,
      nickName,
      userId,
      content: commentRef.current.value,
    };
    dispatch(postCommentDB(commentObj));
    setComment("");
    setHelp("");
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
          {post.userId === userId && (
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
          <Hr />
          <h2>댓글</h2>
        </Wrap>
        {userId && (
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
            <p>{help}</p>
          </CommentWrap>
        )}
        <CommentWrap>
          {commentList[0] ? "" : "작성된 댓글이 없습니다.🥲"}
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
  p {
    color: red;
  }
`;

export default Detail;
