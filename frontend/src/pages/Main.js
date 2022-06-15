import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled, { css } from "styled-components";

import PostCard from "../components/PostCard";
import { getPostListDB } from "../redux/modules/post";

// style
import { MainBody } from "../elements/commonStyle";

// 메인 페이지
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
        <TopWrap>
          <MainImgText>Desklet.</MainImgText>
          <MainImg src={mainImg} />
        </TopWrap>
        <SubImg src={subImg} />
        <MidWrap>
          <h2>👇 다른 사람들 책상 구경하기 👇</h2>
        </MidWrap>
        {postList.map((post) => {
          return <PostCard post={post} key={post._id} />;
        })}
      </MainGrid>
    </MainBody>
  );
};

const MainGrid = styled.main`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-gap: 30px;
`;

const TopWrap = styled.div`
  position: relative;
  grid-column: 1/-2;
`;
const MainImgText = styled.div`
  position: absolute;
  top: 70%;
  left: 10%;
  color: white;
  font-size: 60px;
  font-weight: bold;
`;
const ImgCover = css`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 15px;
`;
const MainImg = styled.img`
  ${ImgCover}
`;
const SubImg = styled.img`
  ${ImgCover}
  grid-column: -2/-1;
`;

const MidWrap = styled.div`
  height: 30px;
  grid-column: 1/-1;
  h2 {
    text-align: center;
    margin: auto 0;
  }
`;

export default Main;
