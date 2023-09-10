"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_hook_form_1 = require("react-hook-form");
const user_1 = require("../../Features/user");
const store_1 = require("../../store");
const react_router_dom_1 = require("react-router-dom");
const LoadingSpinner_1 = __importDefault(require("../../components/LoadingSpinner"));
const RegisterPage = () => {
    const { registered, loading } = (0, store_1.useAppSelector)((state) => state.user);
    const dispatch = (0, store_1.useAppDispatch)();
    const { register, handleSubmit, formState: { errors }, } = (0, react_hook_form_1.useForm)();
    const onSubmit = (data) => {
        (data);
        dispatch((0, user_1.registerUser)(Object.assign({}, data)));
        return React.createElement(react_router_dom_1.Navigate, { to: "/login" });
    };
    if (registered) {
        return React.createElement(react_router_dom_1.Navigate, { to: "/login" });
    }
    return (React.createElement("main", { className: "flex flex-col justify-center items-center gap-4 py-5 " },
        React.createElement("br", null),
        React.createElement("h1", { className: "text-2xl" }, "Register for an Account"),
        React.createElement("form", { onSubmit: handleSubmit(onSubmit), className: "w-1/4 " },
            React.createElement("div", { className: "relative z-0 w-full mb-6 group" },
                React.createElement("input", Object.assign({}, register("first_name", { required: true }), { type: "text", id: "floating_firstname", className: "block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-white peer", placeholder: " ", required: true })),
                React.createElement("label", { htmlFor: "floating_firstname", className: "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-400 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" }, "First name")),
            React.createElement("div", { className: "relative z-0 w-full mb-6 group" },
                React.createElement("input", Object.assign({}, register("last_name", { required: true }), { type: "text", id: "floating_lastName", className: "block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-white peer", placeholder: " ", required: true })),
                React.createElement("label", { htmlFor: "floating_lastname", className: "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-400 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" }, "Last name")),
            React.createElement("div", { className: "relative z-0 w-full mb-6 group" },
                React.createElement("input", Object.assign({}, register("email", { required: true }), { type: "email", id: "floating_email", className: "block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-white peer", placeholder: " ", required: true })),
                React.createElement("label", { htmlFor: "floating_email", className: "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-400 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" }, "Email")),
            React.createElement("div", { className: "relative z-0 w-full mb-6 group" },
                React.createElement("input", Object.assign({}, register("password", { required: true }), { type: "password", id: "floating_password", className: "block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-white peer", placeholder: " ", required: true })),
                React.createElement("label", { htmlFor: "floating_password", className: "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-400 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" }, "Password")),
            loading ? (React.createElement(LoadingSpinner_1.default, null)) : (React.createElement("div", { className: "flex justify-center" },
                React.createElement("button", { type: "submit", className: "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" }, "Register"))))));
};
exports.default = RegisterPage;
