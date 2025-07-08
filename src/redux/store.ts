import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import { bsaseApi } from "./baseApi";
import { userApi } from "./userApi";
export const store= configureStore({
    reducer:{
        auth: authReducer,
   [bsaseApi.reducerPath]: bsaseApi.reducer,
   [userApi.reducerPath]: userApi.reducer,
    },
    middleware:(getDefaultMiddleware)=> {
        return getDefaultMiddleware().concat(bsaseApi.middleware, userApi.middleware);
    },
})
export type RootState = ReturnType<typeof store.getState>;