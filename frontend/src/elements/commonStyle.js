import styled, { css } from "styled-components";

// body 여백
export const MainBody = styled.div`
  width: 70%;
  margin: 10px auto;
  @media screen and (max-width: 900px) {
    width: 95%;
  }
`;
export const Width = css`
  max-width: 500px;
  @media screen and (width: 900) {
    max-width: 500px;
  }
`;

// 연한 회색 수평선
export const Hr = styled.hr`
  border-top: solid 1px #ddd;
`;

/////////
// Box //
/////////

export const BoxShadow = css`
  transition: all 0.5s;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px;
  }
`;
