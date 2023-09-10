"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const flowbite_react_1 = require("flowbite-react");
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
const react_2 = require("react");
const user_1 = require("../../Features/user");
const ResetPasswordPage = () => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const [email, setEmail] = (0, react_2.useState)("");
    const navigate = (0, react_router_dom_1.useNavigate)();
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch((0, user_1.sendPasswordEmail)(email));
        navigate("/");
    };
    return (react_1.default.createElement("main", { className: "flex flex-col justify-center items-center gap-4 py-5 " },
        react_1.default.createElement("br", null),
        react_1.default.createElement("h1", { className: "text-2xl font-medium" }, "Reset your password with email: "),
        react_1.default.createElement("br", null),
        react_1.default.createElement("form", { className: "flex flex-col w-1/3 gap-2", onSubmit: handleSubmit },
            react_1.default.createElement("div", null,
                react_1.default.createElement("label", { htmlFor: "email", className: "block mb-2 text-sm font-medium text-gray-900 dark:text-white" }, "Your email: "),
                react_1.default.createElement("input", { type: "email", id: "email", onChange: (e) => setEmail(e.target.value), className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500", placeholder: "name@flowbite.com", required: true })),
            react_1.default.createElement("div", { className: "flex gap-2" },
                react_1.default.createElement(flowbite_react_1.Button, { color: "light", type: "submit" }, "Send email"),
                react_1.default.createElement(react_router_dom_1.Link, { to: '/' },
                    react_1.default.createElement(flowbite_react_1.Button, { color: "light", type: "button" }, " Cancel"))))));
};
exports.default = ResetPasswordPage;
