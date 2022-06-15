import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import moment from "moment";

////////////
// Action //
////////////

const ADD_POST = "ADD_POST";
const MODIFY_POST = "MODIFY_POST";
const DELETE_POST = "DELETE_POST";
const GET_POST_LIST = "GET_POST_LIST";
const GET_POST_ONE = "GET_POST_ONE";

////////////////////
// Action Creator //
////////////////////

const addPost = createAction(ADD_POST, (post) => ({ post }));
const modifyPost = createAction(MODIFY_POST, (post, postId) => ({
  post,
  postId,
}));
const deletePost = createAction(DELETE_POST, (postId) => ({ postId }));
const getPostList = createAction(GET_POST_LIST, (postList) => ({ postList }));
const getPostOne = createAction(GET_POST_ONE, (postOne) => ({ postOne }));

///////////////////
// Initial State //
///////////////////

const initialState = {
  postOne: {
    postId: "",
    createdAt: "",
    title: "",
    content: "",
    nickName: "",
    imageUrl: "",
  },
  postList: [
    {
      postId: "",
      createdAt: "",
      title: "",
      content: "",
      nickName: "",
      imgUrl: "",
    },
  ],
};

////////////////
// Middleware //
////////////////
const url = "http://3.34.45.167";
// "http://3.34.200.72";

// 게시물 업로드
export const addPostDB = (formData) => {
  return async function (dispatch, getState) {
    await axios
      .post(url + "/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// 게시물 수정

export const modifyPostDB = (formData, postId) => {
  return async function (dispatch, getState) {
    // const post_index = getState().post.postList.findIndex((p) => p.postId === postId)
    // const _post = getState().post.postList[post_index]
    for (let key of formData.keys()) {
      console.log(key, ":", formData.get(key));
    }
    await axios
      .put(
        url + `/posts/${postId}`,
        { data: formData },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        dispatch(modifyPost(formData, postId));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// 게시물 삭제
export const deletePostDB = (postId) => {
  return async function (dispatch) {
    await axios
      .delete(url + `/posts/${postId}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        dispatch(deletePost(postId));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// 게시물 모두 불러오기 | GET
export const getPostListDB = () => async (dispatch) => {
  try {
    const { data } = await axios.get(url + "/posts");
    dispatch(getPostList(data.post));
    console.log(data.post);
  } catch (error) {
    alert("오류가 발생했습니다. 다시 시도해주세요.");
    console.log(error);
  }
};

// 게시글 하나 불러오기 | GET
export const getPostOneDB = (postId) => async (dispatch) => {
  try {
    const { data } = await axios.get(url + "/posts/" + postId);
    dispatch(getPostOne(data.post));
    // console.log(data);
  } catch (error) {
    alert("오류가 발생했습니다. 다시 시도해주세요.");
    console.log(error);
  }
};

/////////////
// Reducer //
/////////////

export default handleActions(
  {
    [ADD_POST]: (state, action) => {
      produce(state, (draft) => {
        draft.postList.unshift(action.payload.post);
      });
    },
    [DELETE_POST]: (state, action) => {
      produce(state, (draft) => {
        draft.postList = draft.postList.filter(
          (p) => p.postId !== action.payload.postId
        );
      });
    },
    [MODIFY_POST]: (state, action) => {
      produce(state, (draft) => {
        const index = draft.postList.findIndex(
          (p) => p.postId === action.payload.postId
        );
        draft.postList[index] = {
          ...draft.postList[index],
          ...action.payload.post,
        };
      });
    },
    [GET_POST_LIST]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.postList = payload.postList;
      }),

    [GET_POST_ONE]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.postOne = payload.postOne;
      }),
  },
  initialState
);

const actionCreators = {
  getPostListDB,
  getPostList,
};

export { actionCreators };
