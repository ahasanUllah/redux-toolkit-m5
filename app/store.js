const { configureStore } = require('@reduxjs/toolkit');
const { createLogger } = require('redux-logger');
const counterReducer = require('../features/counter/counterSlice');
const dynamicCounterSlice = require('../features/dynamicCounter/dynamicCounterSlice');
const postSlice = require('../features/posts/postSlice');

const logger = createLogger();

const store = configureStore({
   reducer: {
      counter: counterReducer,
      dynamicCounter: dynamicCounterSlice,
      post: postSlice,
   },
   middleware: (getDefaultMiddlewares) => getDefaultMiddlewares().concat(logger),
});

module.exports = store;
