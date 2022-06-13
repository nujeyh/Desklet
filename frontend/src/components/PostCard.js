import React from "react";

import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const PostCard = ({ post }) => {
  const navigate = useNavigate();

  return (
    <CardWrap>
      <div>{post.nickName}</div>
      <CardImg
        src={post.imgUrl}
        alt="card image"
        onClick={() =>
          navigate("/posts/" + post.postId, {
            state: {
              postId: post.postId,
            },
          })
        }
      />
      <div>{post.title}</div>
      <div style={{ width: "100%" }}>{post.content}</div>
    </CardWrap>
  );
};

const CardWrap = styled.article`
  height: 400px;
  border: solid 1px;
`;

const CardImg = styled.img`
  width: 100%;
  height: 50%;
  object-fit: cover;
  cursor: pointer;
`;

export default PostCard;
