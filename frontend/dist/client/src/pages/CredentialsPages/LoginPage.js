"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const user_1 = require("../../Features/user");
const react_2 = require("react");
const react_hook_form_1 = require("react-hook-form");
const react_router_dom_1 = require("react-router-dom");
const user_2 = require("../../Features/user");
const LoadingSpinner_1 = __importDefault(require("../../components/LoadingSpinner"));
const store_1 = require("../../store");
const LoginPage = () => {
    const dispatch = (0, store_1.useAppDispatch)();
    const { isAuthenticated, loading, registered } = (0, store_1.useAppSelector)((state) => state.user);
    const { register, handleSubmit, } = (0, react_hook_form_1.useForm)();
    (0, react_2.useEffect)(() => {
        dispatch((0, user_1.resetRegistered)());
    }, [registered]);
    const onSubmit = (data) => {
        dispatch((0, user_2.loginUser)(Object.assign({}, data)));
    };
    if (isAuthenticated) {
        return react_1.default.createElement(react_router_dom_1.Navigate, { to: "/" });
    }
    return (react_1.default.createElement("main", { className: "flex flex-col justify-center items-center gap-4 py-5 " },
        react_1.default.createElement("br", null),
        react_1.default.createElement("h1", { className: "text-2xl" }, "Log in to you account"),
        react_1.default.createElement("br", null),
        react_1.default.createElement("form", { onSubmit: handleSubmit(onSubmit), className: "w-1/4" },
            react_1.default.createElement("div", { className: "mb-6" },
                react_1.default.createElement("label", { htmlFor: "email", className: "block mb-2 text-sm font-medium  dark:text-white" }, "Your email"),
                react_1.default.createElement("input", Object.assign({}, register("email", { required: true }), { type: "email", id: "email", className: "bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500", placeholder: "name@flowbite.com", required: true }))),
            react_1.default.createElement("div", { className: "mb-6" },
                react_1.default.createElement("label", { htmlFor: "password", className: "block mb-2 text-sm font-medium text-white dark:text-white" }, "Your password"),
                react_1.default.createElement("input", Object.assign({}, register("password", { required: true }), { type: "password", id: "password", className: "bg-gray-50 border text-black border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500", required: true }))),
            react_1.default.createElement("div", { className: "flex items-start mb-6" },
                react_1.default.createElement("div", { className: "flex items-center h-5" },
                    react_1.default.createElement("input", { id: "remember", type: "checkbox", value: "", className: "w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-black-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-black-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" })),
                react_1.default.createElement("label", { htmlFor: "remember", className: "ml-2 text-sm font-medium  dark:text-gray-300" }, "Remember me")),
            react_1.default.createElement("br", null),
            loading ? (react_1.default.createElement(LoadingSpinner_1.default, null)) : (react_1.default.createElement("div", null,
                react_1.default.createElement(react_router_dom_1.Link, { to: "/", type: "button", className: "py-2.5 px-5 mr-2 mb-2 text-sm font-medium  focus:outline-none text-black bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-black-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" }, "Cancel"),
                react_1.default.createElement("button", { type: "submit", className: "py-2.5 px-5 mr-2 mb-2 text-sm font-medium  focus:outline-none text-black bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-black-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" }, "Sign in"),
                react_1.default.createElement("div", null,
                    react_1.default.createElement("span", { className: " text-sm" },
                        "Don't have a account yet? ",
                        react_1.default.createElement(react_router_dom_1.Link, { to: '/register', className: "font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline" }, "Sign up"))),
                react_1.default.createElement("div", null,
                    react_1.default.createElement("span", { className: " text-sm" },
                        "Forgotten pasword? ",
                        react_1.default.createElement(react_router_dom_1.Link, { to: '/reset-password', className: "font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline" }, "Reset password"))))))));
};
exports.default = LoginPage;
