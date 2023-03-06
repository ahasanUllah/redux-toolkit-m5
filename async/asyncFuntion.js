const { createStore, applyMiddleware } = require('@reduxjs/toolkit');
const { default: fetch } = require('node-fetch');
const { default: thunk } = require('redux-thunk');

const initialState = {
   loading: false,
   posts: [],
   error: '',
};

const fetchPostRequested = () => {
   return {
      type: 'posts/requested',
   };
};

const fetchPostSucceded = (posts) => {
   return {
      type: 'post/succeded',
      payload: posts,
   };
};

const fetchPostFaild = (error) => {
   return {
      type: 'post/faild',
      payload: error,
   };
};

//reducers

const postReducer = (state = initialState, action) => {
   switch (action.type) {
      case 'posts/requested':
         return {
            ...state,
            loading: true,
            error: '',
         };
      case 'post/succeded':
         return {
            ...state,
            loading: false,
            error: '',
            posts: action.payload,
         };
      case 'post/faild':
         return {
            ...state,
            loading: false,
            error: action.payload.message,
            posts: [],
         };

      default:
         return state;
   }
};

// thunk function
const fetchPosts = () => {
   return async (dispatch) => {
      dispatch(fetchPostRequested());
      try {
         const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
         const post = await response.json();
         dispatch(fetchPostSucceded(post));
      } catch (error) {
         dispatch(fetchPostFaild(error));
      }
   };
};

//create store
const store = createStore(postReducer, applyMiddleware(thunk));

//store subscribe
store.subscribe(() => {
   console.log(store.getState());
});

//dispatch

store.dispatch(fetchPosts());
