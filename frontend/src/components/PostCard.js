import React from "react";

import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { BoxShadow } from "../elements/commonStyle";

const PostCard = ({ post }) => {
  const navigate = useNavigate();

  return (
    <CardWrap
      onClick={() =>
        navigate("/posts/" + post._id, {
          state: {
            postId: post.postId,
          },
        })
      }
    >
      <Text>
        {post.nickName}
        <Date>{post.createdAt}</Date>
      </Text>

      <CardImg src={post.imageUrl} alt="card image" />

      <Title>{post.title}</Title>
      <Text style={{ width: "100%" }}>{post.content}</Text>
    </CardWrap>
  );
};

const CardWrap = styled.article`
  ${BoxShadow}
  height: 400px;
  border-radius: 10px;
  cursor: pointer;
`;

const CardImg = styled.img`
  width: 100%;
  height: 50%;
  object-fit: cover;
`;
const Title = styled.div`
  font-weight: bold;
  padding: 15px 15px 0 15px;
`;
const Text = styled.div`
  padding: 15px;
  position: relative;
`;

const Date = styled.div`
  color: silver;
  position: absolute;
  right: 15px;
  top: 15px;
`;
export default PostCard;
