import React, { useState } from "react";

import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { MainBody, Hr } from "../elements/commonStyle";
import { MainBtn, SubBtn } from "../elements/Btn";
import { logoutDB } from "../redux/modules/user";

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
          <div onClick={() => navigate("/")}>Desklet</div>
          {isLogin ? (
            <nav>
              <span>{"nickname"}님</span>
              <MainBtn onClick={() => navigate("/upload")}>글쓰기</MainBtn>
              <SubBtn onClick={onClickSignOut}>로그아웃</SubBtn>
              <MainBtn onClick={() => navigate("/login")}>로그인</MainBtn>
              <SubBtn onClick={() => navigate("/signup")}>회원가입</SubBtn>
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
  padding: 10px 0;

  h2 {
    cursor: pointer;
  }

  nav {
    margin: auto 0;
  }
  span {
    margin-right: 5px;
  }
  div {
    font-size: 30px;
    font-weight: bold;
    cursor: pointer;
  }
`;

export default Header;
