import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { addPostDB, modifyPostDB } from "../redux/modules/post";

function Upload() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const is_edit = id ? true : false;
  const post_list = useSelector((state) => state.post.postOne);
  const userNickname = localStorage.getItem("nickName")
  const fileInput = useRef(null);

  const [attachment, setAttachment] = useState(is_edit ? post_list.imageUrl : "");
  const [title, setTitle] = useState(is_edit ? post_list.title : "");
  const [content, setContent] = useState(is_edit ? post_list.content : "");


  const selectImg = (e) => {
    const reader = new FileReader();
    const theFile = fileInput.current.files[0];
    reader.readAsDataURL(theFile);
    reader.onloadend = (finishiedEvent) => {
      const {
        currentTarget: { result },
      } = finishiedEvent;
      setAttachment(result);
    };
  };

  const handleUpload = () => {
    if (content === "" || fileInput === "" || title === "") {
      window.alert('내용을 입력해주세요!')
    }

    const file = fileInput.current.files[0];

    const formData = new FormData();

    formData.append("postImage", file);
    formData.append("title", title);
    formData.append("content", content);
    console.log("formData", formData);

    dispatch(addPostDB(formData));
  };

  const handleModify = () => {
    const file = fileInput.current.files[0];

    const formData = new FormData();

    formData.append("postImage", file);
    formData.append("title", title);
    formData.append("content", content);
    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ', ' + pair[1]);
    // }

    dispatch(modifyPostDB(formData, id));
  };

  return (
    <UploadSection>
      <BorderSection>
        <p>{userNickname}님의 데스크 셋업을 소개해보세요 ✨</p>
        <ImgSection>
          <button>
            <label htmlFor="file-input">파일선택</label>
          </button>
          <input
            id="file-input"
            type="file"
            accept="img/*"
            ref={fileInput}
            onChange={selectImg}
            style={{ display: "none" }}
            multiple="multiple"
          />
          <img
            src={
              attachment
                ? attachment
                : "https://user-images.githubusercontent.com/75834421/124501682-fb25fd00-ddfc-11eb-93ec-c0330dff399b.jpg"
            }
            alt="업로드할 이미지"
          />
        </ImgSection>
        <TitleInput
          type="text"
          placeholder="제목 입력..."
          defaultValue={title}
          onChange={(e) => setTitle(e.target.value)}
          multiple="multiple"
        />
        <Textarea
          rows="8"
          placeholder="내용 입력..."
          defaultValue={content}
          onChange={(e) => setContent(e.target.value)}
          multiple="multiple"
        />
        {is_edit ? (
          <Btn onClick={handleModify}>수정하기</Btn>
        ) : (
          <Btn onClick={handleUpload}>작성하기</Btn>
        )
        }
      </BorderSection>
    </UploadSection >
  );
}

const UploadSection = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
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
`;

const BorderSection = styled.div`
  max-width: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 7px 1px rgb(64 60 67 / 16%);
  margin-top: 20px;
  border-radius: 15px;
  padding-bottom: 10px;
`

const ImgSection = styled.div`
  display: flex;
  flex-direction: column;
  label {
    cursor:pointer;
  }
  img {
    width: 500px;
    height: 400px;
    margin-bottom: 30px;
    border-radius: 16px;
  }
  button {
    width: 100px;
    height: 36px;
    margin-bottom: 20px;
    font-size: 14px;
    background-color:#000000;
    border: none;
    border-radius: 7px;
    color: white;
    cursor: pointer;
    transition: all 0.5s;
    &:hover {
    background-color: #666666;
  }
  }
`;

const TitleInput = styled.input`
  width: 500px;
  height: 30px;
  outline: none;
  border: 2px solid #e6e3e3;
  border-radius: 5px;
  padding: 10px;
  &:focus {
    border: 2px solid gray;
  }
`;
const Textarea = styled.textarea`
  width: 500px;
  outline: none;
  border: 2px solid #e6e3e3;
  border-radius: 5px;
  padding: 0 6px;
  margin: 20px 0;
  padding: 10px;
  &:focus {
    border: 2px solid gray;
  }
`;
const Btn = styled.button`
  width: 500px;
  height: 36px;
  margin-bottom: 20px;
  font-size: 14px;
  background-color: #000000;
  border: none;
  border-radius: 7px;
  color: white;
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    background-color: #666666;
  }
`;

export default Upload;
