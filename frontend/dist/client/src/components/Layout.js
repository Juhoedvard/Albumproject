"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const Navbar_1 = __importDefault(require("./Navbar"));
const SearchContextProvider_1 = require("../hooks/SearchContextProvider");
const Layout = () => {
    return (React.createElement(React.Fragment, null,
        React.createElement(SearchContextProvider_1.SearchProvider, null,
            React.createElement(Navbar_1.default, null),
            React.createElement("br", null),
            React.createElement("main", { className: "grid min-h-full w-full mx-auto" },
                React.createElement(react_router_dom_1.Outlet, null)))));
};
exports.default = Layout;
