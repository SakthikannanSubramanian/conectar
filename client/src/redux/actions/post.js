import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  REMOVE_COMMENT,
  ADD_COMMENT,
  REMOVE_ALERT,
} from "./types";

import axios from "axios";
import { setAlert } from "./alert";

//get Posts

export const getPosts = () => async (dispatch) => {
  try {
    const responseData = await axios.get("/api/posts");

    dispatch({
      type: GET_POSTS,
      payload: responseData.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Add like to Posts

export const addLike = (postId) => async (dispatch) => {
  try {
    const responseData = await axios.put(`/api/posts/like/${postId}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: responseData.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Remove like to Posts

export const removeLike = (postId) => async (dispatch) => {
  try {
    const responseData = await axios.put(`/api/posts/unlike/${postId}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: responseData.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete Posts

export const deletePost = (postId) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${postId}`);

    dispatch({
      type: DELETE_POST,
      payload: postId,
    });

    dispatch(setAlert("Post Removed", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// //Add Posts

export const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const responseData = await axios.post(`/api/posts`, formData, config);

    dispatch({
      type: ADD_POST,
      payload: responseData.data,
    });

    dispatch(setAlert("Post Added", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//get Post

export const getPost = (id) => async (dispatch) => {
  try {
    const responseData = await axios.get(`/api/posts/${id}`);

    dispatch({
      type: GET_POST,
      payload: responseData.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Add comment
export const addComment = (postId, formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const responseData = await axios.post(
      `/api/posts/comments/${postId}`,
      formData,
      config
    );

    dispatch({
      type: ADD_COMMENT,
      payload: responseData.data.comments,
    });

    dispatch(setAlert("Comment Added", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Remove comment
export const removeComment = (postId, commentId) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/comments/${postId}/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    });

    dispatch(setAlert("Comment Removed", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
