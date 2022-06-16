import React from "react";

import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { MainBody, Hr } from "../elements/commonStyle";
import { MainBtn, SubBtn } from "../elements/Btn";
import { logoutDB } from "../redux/modules/user";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.user.is_login);
  const nickName = useSelector((state) => state.user.user.nickName);

  // 로그아웃하기
  const onClickSignOut = () => {
    const confirm = window.confirm("로그아웃 하시겠어요?");
    if (confirm) {
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
              <span>{nickName}님</span>
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
  padding: 10px 0;

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
