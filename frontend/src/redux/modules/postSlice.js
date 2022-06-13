import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// posts 데이터 get
export const getPosts = createAsyncThunk("GET/POSTS", async () => {
  return axios
    .get("http://localhost:5001/posts")
    .then((response) => response.data)
    .catch((error) => console.log(error));
});

const postSlice = createSlice({
  name: "postReducer",
  initialState: {
    posts: [
      {
        postId: "",
        createdAt: 0,
        title: "",
        content: "",
        nickName: "",
        imgUrl: "",
      },
    ],
  },
  reducers: {},
  extraReducers: {
    [getPosts.fulfilled]: (state, { payload }) => {
      state.posts = payload;
    },

    // 저번 주차에 썼던 코드인데 혹시 참고되실까해서 남겨봅니다!
    //   // 게시물 추가하기
    //   addPost: (state, { payload }) => {
    //     state.post.unshift(payload);
    //   },
    //   // 게시물 수정하기
    //   editPost: (state, { payload }) => {
    //     state.post = state.post.map((post) => {
    //       if (post.uid === payload.uid) {
    //         return {
    //           ...post,
    //           text: payload.text,
    //           fileUrl: payload.fileUrl,
    //           layout: payload.layout,
    //         };
    //       } else return post;
    //     });
    //   },
    //   //게시물 삭제하기
    //   deletePost: (state, { payload }) => {
    //     state.post = state.post.filter((post) => {
    //       return payload.uid !== post.uid;
    //     });
    //   },
  },
});

export default postSlice.reducer;
