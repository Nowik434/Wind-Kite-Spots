import { combineReducers, configureStore } from "@reduxjs/toolkit";
import auth from "./Slices/auth";
import messageReducer from "./Slices/message";
// import pinsReducer from "./Slices/spots";
import spotsReducer from "./Slices/spots";

const reducer = combineReducers({
  auth: auth,
  message: messageReducer,
  // pins: pinsReducer,
  spots: spotsReducer,
});

const saveToLocalStorage = (state) => {
  try {
    if (state && state.auth.user.jwt !== null) {
      localStorage.setItem("spots", JSON.stringify(state));
    }
  } catch (e) {}
};

const loadFromLocalStorage = () => {
  try {
    const stateStr = localStorage.getItem("spots");
    console.log("dsadsad", JSON.parse(stateStr));
    return stateStr ? JSON.parse(stateStr) : undefined;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

const persistedStore = loadFromLocalStorage();

const store = configureStore({
  reducer: reducer,
  preloadedState: persistedStore,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

export default store;

// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import auth from "./Slices/auth";
// import messageReducer from "./Slices/message";
// // import pinsReducer from "./Slices/spots";
// import spotsReducer from "./Slices/spots";

// const reducer = combineReducers({
//   auth: auth,
//   message: messageReducer,
//   // pins: pinsReducer,
//   spots: spotsReducer,
// });

// const store = configureStore({
//   reducer: reducer,
//   devTools: true,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });

// export default store;
