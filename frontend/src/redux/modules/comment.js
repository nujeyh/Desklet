import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";

////////////
// Action //
////////////

const GET_COMMENT_LIST = "GET_COMMENT_LIST";
const POST_COMMENT = "POST_COMMENT";
const PUT_COMMENT = "PUT_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";

////////////////////
// Action Creator //
////////////////////

const getCommentList = createAction(GET_COMMENT_LIST, (commentList) => ({
  commentList,
}));
const postComment = createAction(POST_COMMENT, (comment) => comment);
const putComment = createAction(PUT_COMMENT, (comment) => comment);
const deleteComment = createAction(DELETE_COMMENT, (comment) => comment);

///////////////////
// Initial State //
///////////////////

const initialState = {
  commentList: [
    {
      postId: "",
      content: "내용",
      commentId: "id",
      createdAt: "2022-04-04",
      nickName: "닉네임",
    },
  ],
};

////////////////
// Middleware //
////////////////

const url = "http://3.34.45.167";

// 댓글 모두 불러오기 | GET
export const getCommentListDB = (postId) => async (dispatch) => {
  try {
    const { data } = await axios.get(url + "/comments/" + postId);
    dispatch(getCommentList(data.comments));
  } catch (error) {
    alert("댓글을 불러오는데 실패했습니다.");
    console.log(error);
  }
};

// 댓글 작성하기 | POST
export const postCommentDB = (_commentObj) => async (dispatch) => {
  const commentObj = {
    postId: _commentObj.postId,
    nickName: _commentObj.nickName,
    content: _commentObj.content,
  };
  try {
    const { data } = await axios.post(url + "/comments", commentObj, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    dispatch(
      postComment({
        ...commentObj,
        createdAt: data.createdAt,
        _id: data._id,
        userId: _commentObj.userId,
      })
    );
  } catch (error) {
    alert("댓글 작성 중에 오류가 발생했습니다.");
    console.log(error);
  }
};

// 댓글 수정하기 | PUT
export const putCommentDB = (commentObj) => async (dispatch) => {
  try {
    await axios.put(
      url + "/comments/" + commentObj._id,
      { data: commentObj.content },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    dispatch(putComment(commentObj));
  } catch (error) {
    alert("댓글 수정 중에 오류가 발생했습니다.");
    console.log(error);
  }
};

// 댓글 삭제하기 | DELETE
export const deleteCommentDB = (_id) => async (dispatch) => {
  try {
    await axios.delete(url + "/comments/" + _id, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: _id,
    });
    dispatch(deleteComment(_id));
  } catch (error) {
    alert("댓글 삭제 중에 오류가 발생했습니다.");
    console.log(error);
  }
};

/////////////
// Reducer //
/////////////

export default handleActions(
  {
    [GET_COMMENT_LIST]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.commentList = payload.commentList;
      }),

    [POST_COMMENT]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.commentList.unshift(payload);
      }),
    [PUT_COMMENT]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.commentList = state.commentList.map((comment) => {
          console.log(comment._id, payload._id, payload);
          if (comment._id === payload._id) {
            return { ...comment, content: payload.content };
          } else {
            return comment;
          }
        });
      }),
    [DELETE_COMMENT]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.commentList = draft.commentList.filter(
          (comment) => comment._id !== payload
        );
      }),
  },
  initialState
);

const actionCreators = {
  getCommentListDB,
  getCommentList,
  postCommentDB,
  postComment,
  putCommentDB,
  putComment,
  deleteCommentDB,
  deleteComment,
};

export { actionCreators };
