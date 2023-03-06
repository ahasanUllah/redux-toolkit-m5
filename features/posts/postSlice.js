const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');
const { default: fetch } = require('node-fetch');

const initialState = {
   posts: [],
   loading: false,
   error: '',
};

const fetchPost = createAsyncThunk('post/fetchPost', async () => {
   const response = await fetch('https://jsonplaceholder.typicodes.com/posts?_limit=5');
   const post = await response.json();
   return post;
});

const postSlice = createSlice({
   name: 'post',
   initialState,
   extraReducers: (builder) => {
      builder.addCase(fetchPost.pending, (state, action) => {
         state.loading = true;
         state.error = '';
      });

      builder.addCase(fetchPost.fulfilled, (state, action) => {
         state.loading = false;
         state.error = '';
         state.posts = action.payload;
      });

      builder.addCase(fetchPost.rejected, (state, action) => {
         state.loading = false;
         state.error = action.payload;
         state.posts = [];
      });
   },
});

module.exports = postSlice.reducer;
module.exports.fetchPost = fetchPost;
