import React from 'react'
// import Header from '../components/Header'
import styled from 'styled-components';

function Upload() {
    return (
        <UploadSection>
            {/* <Header /> */}
            <p>nickname님의 데스크 셋업을 소개해보세요!</p>
            <ImgSection>
                <label>
                    <button id="file-input">파일선택</button>
                </label>
                <input id="file-input" type="file" style={{ display: "none" }} />
                <img src="https://user-images.githubusercontent.com/75834421/124501682-fb25fd00-ddfc-11eb-93ec-c0330dff399b.jpg" alt="" />
            </ImgSection>
            <TitleInput type="text" placeholder='제목 입력...' />
            <Textarea rows="8" placeholder="내용 입력..." />
            <UploadBtn>작성하기</UploadBtn>
        </UploadSection>
    )
}

const UploadSection = styled.section`
  max-width: 800px;
  width: 100%;
  height: 100vh;
  margin: auto;
  /* border : 2px solid red; */
  display: flex;
  flex-direction:column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 20px;
  p {
      font-size: 24px;
      font-weight: bold;
  }
  textarea {
      width: 500px;
  }
`
const ImgSection = styled.div`
  display: flex;
  flex-direction: column;
  label {
      
  }
  img {
      width: 500px;
      height: 400px;
      margin-bottom: 30px;
  }
  label>button {
      width: 100px;
      height: 36px;
      margin-bottom: 20px;
      font-size: 14px;
      background-color: #1B9CFC ;
      border: none;
      border-radius: 7px;
      color: white;
      cursor: pointer;
  }
`

const TitleInput = styled.input`
  width: 500px;
  height: 30px;
  outline: none;
  border: 2px solid #1B9CFC;
  border-radius: 9px;
  padding:10px;
`
const Textarea = styled.textarea`
  width: 500px;
  outline: none;
  border: 2px solid #1B9CFC;
  border-radius: 9px;
  padding: 0 6px;
  margin: 20px 0;
  padding: 10px;
`
const UploadBtn = styled.button`
   width: 500px;
   height: 36px;
   margin-bottom: 20px;
   font-size: 14px;
   background-color: #1B9CFC ;
   border: none;
   border-radius: 7px;
   color: white;
   cursor: pointer;
`

export default Upload