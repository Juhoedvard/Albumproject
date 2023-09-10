"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const Navbar_1 = __importDefault(require("./Navbar"));
const SearchContextProvider_1 = require("../hooks/SearchContextProvider");
const Layout = () => {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(SearchContextProvider_1.SearchProvider, null,
            react_1.default.createElement(Navbar_1.default, null),
            react_1.default.createElement("br", null),
            react_1.default.createElement("main", { className: "grid min-h-full w-full mx-auto" },
                react_1.default.createElement(react_router_dom_1.Outlet, null)))));
};
exports.default = Layout;
