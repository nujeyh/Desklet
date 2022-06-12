import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
// import { loginUser } from '../redux/modules/userSlice';

function Login() {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const handleLogin = () => {
        if (email === "" || password === "") {
            window.alert("이메일,비밀번호 모두 입력해주세요.")
        } else {
            const loginData = {
                email,
                password
            }
            // dispatch(loginUser(loginData))
        }
    }
    return (
        <AccountSection>
            <FormSection>
                <h1>로그인</h1>
                <label htmlFor="id">
                    <p>아이디</p>
                    <Input id="id" type="email" required onChange={(e) => { setEmail(e.target.value) }} />
                </label>
                <label htmlFor="pw">
                    <p>비밀번호</p>
                    <Input id="pw" required type="password" onChange={(e) => { setPassword(e.target.value) }} />
                </label>
                <UserBtn onClick={handleLogin}>로그인</UserBtn>
                <LoginZoneText>계정이 없으신가요?</LoginZoneText>
                <UserBtn>회원가입</UserBtn>
            </FormSection>
        </AccountSection>
    )
}

const FormSection = styled.div`
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
  max-width: 450px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items: center;
  border-radius: 18px;
  padding: 15px 0;
  h1 {
      text-align: left;
      margin-bottom: 40px;
  }
  label {
      width: 80%;
  }
  label>p{
      margin:5px 0;
      text-align: left;
  }
`

const LoginZoneText = styled.p`
  &::before {
      display:inline-block;
      content:"";
      width: 100px;
      margin-right: 8px;
      vertical-align: middle;
      height: 1px;
      background-color: lightgrey;   
  }
  &::after {
      display:inline-block;
      content:"";
      width: 100px;
      margin-left: 8px;
      vertical-align: middle;
      height: 1px;
      background-color: lightgrey;
  }
`

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  margin-bottom: 20px;
  border: 2px solid rgba(27, 156, 252, 0.55);
  &:focus {
      outline:none;
      border-color: #1B9CFC;
  }
`

const UserBtn = styled.button`
  width: 40%;
  background-color:${(props) => props.disabled ? "rgba(27, 156, 252, 0.55)" : "#1B9CFC "};
  color: white;
  border: none;
  cursor: pointer;
  height: 40px;
  border-radius: 6px;
  margin: 10px 0;
`

const AccountSection = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default Login