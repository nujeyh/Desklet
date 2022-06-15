import styled, { css } from "styled-components";

const Btn = css`
  margin: auto 5px;
  padding: 10px 15px;
  font-weight: 400;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.5s;
`;

// 메인버튼 | 검정색
export const MainBtn = styled.button`
  ${Btn}
  color: #fff;
  border: 0;
  background-color: #000000;
  &:hover {
    background-color: #666666;
  }
`;

// 서브버튼 | 검정 테두리 흰배경
export const SubBtn = styled.button`
  ${Btn}
  border: solid 1px #000000;
  background-color: #fff;
  &:hover {
    background-color: #e6e3e3;
  }
`;
// 작은 버튼
export const SmallBtn = styled.button`
  cursor: pointer;
  transition: all 0.5s;
  background-color: white;
  border: 0;
  color: gray;
  font-size: medium;
  &:hover {
    color: black;
  }
`;
