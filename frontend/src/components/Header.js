import React, { useState } from "react";

import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { MainBody, Hr } from "./commonStyle";
import { MainBtn, SubBtn } from "../elements/Btn";
import { logoutDB } from "../redux/modules/user";
import { useDispatch } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  // 로그아웃하기
  const onClickSignOut = () => {
    const confirm = window.confirm("로그아웃 하시겠어요?");
    if (confirm) {
      console.log("로그아웃 클릭");
      dispatch(logoutDB());
    }
  };

  return (
    <>
      <MainBody>
        <HeaderWrap>
          <h2 onClick={() => navigate("/")}>Desklet</h2>
          {isLogin ? (
            <nav>
              <span>{"nickname"}님</span>
              <MainBtn onClick={() => navigate("/upload")}>글쓰기</MainBtn>
              <SubBtn onClick={onClickSignOut}>로그아웃</SubBtn>
            </nav>
          ) : (
            <nav>
              <MainBtn onClick={() => navigate("/login")}>로그인</MainBtn>
              <SubBtn onClick={() => navigate("/signup")}>회원가입</SubBtn>
            </nav>
          )}
        </HeaderWrap>
      </MainBody>
      <Hr />
    </>
  );
};

const HeaderWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  nav {
    margin: auto 0;
  }
  span {
    margin-right: 5px;
  }
`;

export default Header;
