import { combineReducers, configureStore } from "@reduxjs/toolkit";
import auth from "./Slices/auth";
import messageReducer from "./Slices/message";
// import pinsReducer from "./Slices/spots";
import spotsReducer from "./Slices/spots";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const reducer = combineReducers({
  auth: auth,
  message: messageReducer,
  // pins: pinsReducer,
  spots: spotsReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
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
