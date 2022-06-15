import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { loginDB } from '../redux/modules/user';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const emailCheck = (email) => {
        let reg = /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-Z])*.([a-zA-Z])*/;
        return reg.test(email);
    };

    //비밀번호 영문/숫자 포함(8_20자)
    const passwordCheck = (password) => {
        let _reg2 = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;

        return _reg2.test(password);
    }

    const handleLogin = () => {
        if (email === "" || password === "") {
            window.alert("이메일,비밀번호 모두 입력해주세요.")
        }
        if (!emailCheck) {
            window.alert("이메일 형식에 맞게 작성해주세요")
        }
        if (!passwordCheck(password)) {
            window.alert('비밀번호를 형식에 맞게 입력해주세요')
        }
        dispatch(loginDB(email, password))
    }

    return (
        <AccountSection>
            <FormSection>
                <h1>로그인</h1>
                <label htmlFor="id">
                    <p>아이디</p>
                    <Input id="id" type="email" required onChange={(e) => { setEmail(e.target.value) }} placeholder="이메일 형식에 맞게 작성해 주세요(@)" />
                </label>
                <label htmlFor="pw">
                    <p>비밀번호</p>
                    <Input id="pw" required type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="비밀번호를 입력해 주세요" />
                </label>
                <UserBtn onClick={handleLogin}>로그인</UserBtn>
                <LoginZoneText>계정이 없으신가요?</LoginZoneText>
                <UserBtn onClick={() => { navigate("/signup") }}>회원가입</UserBtn>
            </FormSection>
        </AccountSection>
    )
}

const FormSection = styled.div`
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
  max-width: 450px;
  width: 100%;
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
  box-shadow: inset 0 1px 4px 0 rgb(64 60 67 / 16%);
  border: 2px solid  #e6e3e3;
  border-radius: 6px;
  &:focus {
      outline:none;
      border-color: #666666;
  }
`

const UserBtn = styled.button`
  width: 40%;
  background-color:#000000;
  color: white;
  border: none;
  cursor: pointer;
  height: 40px;
  border-radius: 6px;
  margin: 10px 0;
  transition: all 0.5s;
  &:hover {
    background-color: #666666;
  }
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