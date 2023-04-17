import { configureStore } from '@reduxjs/toolkit'
import {DevByReducer} from "./dev-by";

export const store = configureStore({
    reducer: {
        devBy: DevByReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
