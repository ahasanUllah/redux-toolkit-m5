const store = require('./app/store');
const { counterActions } = require('./features/counter/counterSlice');
const { dynamicCounterActions } = require('./features/dynamicCounter/dynamicCounterSlice');
const { fetchPost } = require('./features/posts/postSlice');

// console.log(`initial: ${JSON.stringify(store.getState())}`);
// subscribe to state changes
store.subscribe(() => {
   //    console.log(store.getState());
});

// disptach actions
store.dispatch(fetchPost());
