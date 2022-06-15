import styled, { css } from "styled-components";

export const Input = styled.input`
  width: 100%;
  max-width: 400px;
  border-radius: 10px;
  border: solid 1px #ddd;
  padding: 10px;
  transition: border-color 300ms ease-in-out;
  outline: none;
  @media screen and (max-width: 700px) {
    width: 77%;
  }
  &:focus {
    border: solid 2px black;
  }
`;
