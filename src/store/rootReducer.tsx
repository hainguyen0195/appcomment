import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import persistStore from "redux-persist/es/persistStore";
import commentReducer from "./commentReducer";

const reducers = combineReducers({
    userReducer: userReducer,
    commentReducer: commentReducer,
});
const persistConfig = {
    key: "root",
    storage: storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const persistor = persistStore(store)
