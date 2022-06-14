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
      postId: "4",
      content: "내용4",
      commentId: "id4",
      createdAt: "2022-04-04",
      nickName: "닉네임4",
    },
  ],
};

////////////////
// Middleware //
////////////////

// 댓글 모두 불러오기 | GET
export const getCommentListDB = (postId) => async (dispatch) => {
  try {
    const { data } = await axios.get("http://3.36.56.155/comments/" + postId);
    dispatch(getCommentList(data));
    console.log(data);
  } catch (error) {
    alert("오류가 발생했습니다. 다시 시도해주세요.");
    console.log(error);
  }
};

// 댓글 작성하기 | POST
export const postCommentDB = (_commentObj) => async (dispatch) => {
  const commentObj = {
    postId: _commentObj.postId,
    userId: _commentObj.userId,
    nickName: _commentObj.nickName,
    content: _commentObj.content,
  };
  console.log(commentObj);
  try {
    await axios.post("http://3.36.56.155/comments", commentObj, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    dispatch(postComment(commentObj));
  } catch (error) {
    alert("오류가 발생했습니다. 다시 시도해주세요.");
    console.log(error);
  }
};

// 댓글 수정하기 | PUT
export const putCommentDB = (commentId, content) => async (dispatch) => {
  const commentObj = {
    commentId,
    content,
  };
  console.log(commentObj);
  try {
    await axios.put("http://3.36.56.155/comments/" + commentObj, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    dispatch(putComment(commentId, content));
  } catch (error) {
    alert("오류가 발생했습니다. 다시 시도해주세요.");
    console.log(error);
  }
};

// 댓글 삭제하기 | DELETE
export const deleteCommentDB = (commentId) => async (dispatch) => {
  console.log(commentId);
  try {
    await axios.delete("http://3.36.56.155/comments/" + commentId, commentId, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    dispatch(deleteComment(commentId));
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
          if (comment.commentId === payload.commentId) {
            return { ...comment, content: payload.content };
          } else {
            return comment;
          }
        });
      }),
    [DELETE_COMMENT]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.commentList = draft.commentList.filter(
          (comment) => comment.commentId !== payload
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
