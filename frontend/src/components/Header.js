import React, { useState } from "react";

import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { MainBody } from "./commonStyle";

const Header = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  // 로그아웃하기
  const onClickSignOut = () => {
    const confirm = window.confirm("로그아웃 하시겠어요?");
    if (confirm) {
      console.log("로그아웃 클릭");
      setIsLogin(false);
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
              <button onClick={() => console.log("navigate(글쓰기)")}>
                글쓰기
              </button>
              <button onClick={onClickSignOut}>로그아웃</button>
            </nav>
          ) : (
            <nav>
              <button onClick={() => navigate("/login")}>로그인</button>
              <button onClick={() => navigate("/signup")}>회원가입</button>
            </nav>
          )}
        </HeaderWrap>
      </MainBody>
      <hr />
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
`;

export default Header;
