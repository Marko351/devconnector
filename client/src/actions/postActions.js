import axios from 'axios';
import { ADD_POST, GET_ERRORS, GET_POSTS, POST_LOADING, DELETE_POST, GET_POST, CLEAR_ERRORS } from './types';

//Add Post
export const addPost = postData => dispatch => {
  dispatch(clearErrors());
  axios
    .post('/api/posts', postData)
    .then(res => {
      return dispatch({
        type: ADD_POST,
        payload: res.data
      })
    })
    .catch(err => {
      return dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
}

//Get Posts
export const getPosts = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get('/api/posts')
    .then(res => {
      return dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    })
    .catch(err => {
      return dispatch({
        type: GET_POSTS,
        payload: null
      })
    })
}

//Get Post
export const getPost = (id) => dispatch => {
  dispatch(setPostLoading());
  axios
    .get('/api/posts/' + id)
    .then(res => {
      return dispatch({
        type: GET_POST,
        payload: res.data
      })
    })
    .catch(err => {
      return dispatch({
        type: GET_POST,
        payload: null
      })
    })
}

//Delete Post
export const deletePost = id => dispatch => {
  axios
    .delete(`/api/posts/${id}`)
    .then(res => {
      return dispatch({
        type: DELETE_POST,
        payload: id
      })
    })
    .catch(err => {
      return dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
}

//Add like
export const addLike = id => dispatch => {
  axios
    .post(`/api/posts/like/${id}`)
    .then(res => {
      return dispatch(getPosts())
    })
    .catch(err => {
      return dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
}

//Remove like
export const removeLike = id => dispatch => {
  axios
    .post(`/api/posts/unlike/${id}`)
    .then(res => {
      return dispatch(getPosts())
    })
    .catch(err => {
      return dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
}

//Add Comment
export const addComment = (postId, commentData) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/posts/comment/${postId}`, commentData)
    .then(res => {
      return dispatch({
        type: GET_POST,
        payload: res.data
      })
    })
    .catch(err => {
      return dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
}

//Delete Comment
export const deleteComment = (postId, commentId) => dispatch => {
  axios
    .delete(`/api/posts/comment/${postId}/${commentId}`)
    .then(res => {
      return dispatch({
        type: GET_POST,
        payload: res.data
      })
    })
    .catch(err => {
      return dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
}

//Set loading state
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  }
}

//Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  }
} 