import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import PostCard from "../components/PostCard";
import { MainBody } from "../components/commonStyle";
import { getPostListDB } from "../redux/modules/post";

const Main = () => {
  const mainImg = "https://i.ytimg.com/vi/C-8sFlhfosM/maxresdefault.jpg";
  const subImg =
    "https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/snapshots/165421782392648651.jpeg?gif=1&w=1440";

  const postList = useSelector((state) => state.post.postList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPostListDB());
  }, [dispatch]);

  return (
    <MainBody>
      <MainGrid>
        <MainImg src={mainImg} />
        <SubImg src={subImg} />
        <div style={{ height: "30px", gridColumn: "1/-1" }}>
          <h2>👇 다른 사람들 책상 구경하기 👇</h2>
        </div>
        {postList.map((post) => {
          return <PostCard post={post} key={post.createdAt} />;
        })}
      </MainGrid>
    </MainBody>
  );
};

const MainGrid = styled.main`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-gap: 30px;
  h2 {
    text-align: center;
    margin: auto 0;
  }
`;

const MainImg = styled.img`
  width: 100%;
  height: 300px;
  grid-column: 1/-2;
  object-fit: cover;
  border-radius: 15px;
`;
const SubImg = styled.img`
  width: 100%;
  height: 300px;
  grid-column: -2/-1;
  object-fit: cover;
  border-radius: 15px;
`;

export default Main;
