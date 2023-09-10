"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const album_1 = require("../Features/album");
const store_1 = require("../store");
const flowbite_react_1 = require("flowbite-react");
const ErrorAlbums = () => {
    const dispatch = (0, store_1.useAppDispatch)();
    return (react_1.default.createElement("div", { className: "flex flex-col h-screen w-full justify-center items-center gap-2" },
        react_1.default.createElement("h1", null, "Something went wrong "),
        react_1.default.createElement("div", { className: "flex justify-center items-center" },
            react_1.default.createElement(flowbite_react_1.Button, { color: 'dark', onClick: () => dispatch((0, album_1.getAlbums)()) }, "Try again!  "))));
};
exports.default = ErrorAlbums;
