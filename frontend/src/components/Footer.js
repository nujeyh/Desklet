import React from "react";
// import styled from "styled-components";

import { MainBody, Hr } from "../elements/commonStyle";

const Footer = () => {
  return (
    <>
      <Hr style={{ marginTop: "50px" }} />
      <MainBody style={{ textAlign: "center", padding: "20px 0" }}>
        <div style={{ color: "gray", fontSize: "smaller" }}>
          <p>{new Date().getFullYear()} 항해99 6주차 미니 프로젝트</p>
          <p>BE : 김형근, 김주혁, 유승재</p>
          <p>FE : 김채운, 차혜준</p>
        </div>
      </MainBody>
    </>
  );
};

export default Footer;
