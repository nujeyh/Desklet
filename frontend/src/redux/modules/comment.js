import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";

////////////
// Action //
////////////

const GET_COMMENT_LIST = "GET_COMMENT_LIST";
const POST_COMMENT = "POST_COMMENT";

////////////////////
// Action Creator //
////////////////////

const getCommentList = createAction(GET_COMMENT_LIST, (commentList) => ({
  commentList,
}));
const postComment = createAction(POST_COMMENT, (comment) => comment);

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
    const { data } = await axios.get(
      //   "http://localhost:5001/comments/" + postId
      "http://localhost:5001/comments?postId=" + postId
    );
    dispatch(getCommentList(data));
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
    commentId: _commentObj.commentId,
    content: _commentObj.content,
    createdAt: _commentObj.createdAt,
  };
  try {
    // await axios.post("http://localhost:5001/comments", comment, {
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem("token")}`,
    //   },
    // });
    dispatch(postComment(commentObj));
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
        // console.log(draft.commentList);
        // draft.commentList.unshift(payload);
        // state.commentList.
      }),
  },
  initialState
);

const actionCreators = {
  getCommentListDB,
  getCommentList,
  postCommentDB,
  postComment,
};

export { actionCreators };
