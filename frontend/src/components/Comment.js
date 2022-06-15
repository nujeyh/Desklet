import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { putCommentDB, deleteCommentDB } from "../redux/modules/comment";

import styled from "styled-components";
import { SmallBtn, MainBtn } from "../elements/Btn";
import { Input } from "../elements/Input";
import { Width } from "../elements/commonStyle";

const Comment = ({ commentObj }) => {
  const dispatch = useDispatch();
  const commentRef = useRef(commentObj.content);

  const [update, setUpdate] = useState(false);
  const [inputs, setInputs] = useState({
    comment: commentObj.content,
    help: "",
  });
  const { comment, help } = inputs;

  // input 상태 관리
  const onChangeInput = (event) => {
    const { value, name } = event.target;
    setInputs({ ...inputs, [name]: value });
  };

  // 수정 영역 토글하기
  const toggleUpdate = () => {
    setUpdate((prev) => !prev);
    setInputs({
      comment: commentObj.content,
      help: "",
    });
  };

  // 댓글 수정하기
  const onClickUpdate = () => {
    const content = commentRef.current.value;
    if (content === "") {
      setInputs({ ...inputs, help: "댓글을 입력해주세요!" });
      return false;
    }
    if (content === commentObj.content) {
      toggleUpdate();
      return false;
    }
    const _commentObj = {
      _id: commentObj._id,
      content,
    };
    dispatch(putCommentDB(_commentObj));
    setUpdate(false);
  };

  // 댓글 삭제하기
  const onClickDelete = () => {
    const isConfirm = window.confirm("댓글을 삭제하시겠어요?");
    if (isConfirm) {
      dispatch(deleteCommentDB(commentObj._id));
    }
  };

  return (
    <ContentWrap>
      <span>{commentObj.nickName}</span>
      <span>{commentObj.createdAt}</span>
      <SmallBtn onClick={toggleUpdate}>{update ? "닫기" : "수정"}</SmallBtn>
      <SmallBtn onClick={onClickDelete}>삭제</SmallBtn>
      <div>{commentObj.content}</div>
      {update ? (
        <>
          <Input
            name="comment"
            ref={commentRef}
            value={comment}
            onChange={onChangeInput}
          />
          <MainBtn onClick={onClickUpdate}>입력</MainBtn>
          <p name="help" value={help} onChange={onChangeInput}>
            {help}
          </p>
        </>
      ) : null}
    </ContentWrap>
  );
};

const ContentWrap = styled.div`
  max-width: 500px;
  border: solid 1px #ddd;
  border-radius: 10px;
  padding: 15px;
  width: 100%;
  /* @media screen and (width: 900px) {
    width: 100%;
  } */
  span {
    margin-right: 20px;
  }
  p {
    color: red;
  }
`;

export default Comment;
