import React from "react";
// import styled from "styled-components";

import { MainBody } from "./commonStyle";

const Footer = () => {
  return (
    <>
      <hr />
      <MainBody>
        <p>{new Date().getFullYear()} 항해99 6주차 미니 프로젝트</p>
        <p>BE : 김형근, 김주혁, 유승재</p>
        <p>FE : 김채운, 차혜준</p>
      </MainBody>
    </>
  );
};

export default Footer;
