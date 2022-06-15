import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import PostCard from "../components/PostCard";
import { getPostListDB } from "../redux/modules/post";

import { MainBody } from "../elements/commonStyle";
// import Img from "./images/black_desk.jpg";

const Main = () => {
  const mainImg = "/images/black_desk.jpg";
  const subImg = "/images/white_desk.jpg";

  const postList = useSelector((state) => state.post.postList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPostListDB());
  }, [dispatch]);

  return (
    <MainBody>
      <MainGrid>
        {/* <MainImgWrap> */}
        <MainImg src={mainImg} />
        {/* <div></div> */}
        {/* </MainImgWrap> */}
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

const MainImgWrap = styled.div`
  position: relative;
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
