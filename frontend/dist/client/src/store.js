"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAppSelector = exports.useAppDispatch = void 0;
/* eslint-disable @typescript-eslint/no-use-before-define */
const toolkit_1 = require("@reduxjs/toolkit");
const user_1 = require("./Features/user");
const react_redux_1 = require("react-redux");
const album_1 = require("./Features/album");
// ...
const store = (0, toolkit_1.configureStore)({
    reducer: {
        user: user_1.UserSlice.reducer,
        albums: album_1.AlbumSlice.reducer
    },
    devTools: process.env.NODE_ENV !== 'production',
});
exports.useAppDispatch = react_redux_1.useDispatch;
exports.useAppSelector = react_redux_1.useSelector;
exports.default = store;
