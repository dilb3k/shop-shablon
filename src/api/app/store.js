import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./CategorySlice";
import storage from "redux-persist/lib/storage"; // localStorage uchun
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";

const persistConfig = {
    key: "root",
    storage,
};

const rootReducer = combineReducers({
    category: categoryReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);
