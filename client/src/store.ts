/* eslint-disable @typescript-eslint/no-use-before-define */
import React from "react";
import { configureStore } from '@reduxjs/toolkit'
import { UserSlice } from './Features/user'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AlbumSlice } from './Features/album'





// ...
const store = configureStore({
  reducer: {
    user: UserSlice.reducer,
    albums: AlbumSlice.reducer
  },
  devTools: process.env.REACT_APP_NODE_ENV !== 'production',
})


export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector
export default store