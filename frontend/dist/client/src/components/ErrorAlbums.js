"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const album_1 = require("../Features/album");
const store_1 = require("../store");
const flowbite_react_1 = require("flowbite-react");
const ErrorAlbums = () => {
    const dispatch = (0, store_1.useAppDispatch)();
    return (React.createElement("div", { className: "flex flex-col h-screen w-full justify-center items-center gap-2" },
        React.createElement("h1", null, "Something went wrong "),
        React.createElement("div", { className: "flex justify-center items-center" },
            React.createElement(flowbite_react_1.Button, { color: 'dark', onClick: () => dispatch((0, album_1.getAlbums)()) }, "Try again!  "))));
};
exports.default = ErrorAlbums;
