import { configureStore } from '@reduxjs/toolkit'
import {DevByReducer} from "./resources";
import {ProfileReducer} from "./auth";

export const store = configureStore({
    reducer: {
        devBy: DevByReducer,
        profile: ProfileReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch