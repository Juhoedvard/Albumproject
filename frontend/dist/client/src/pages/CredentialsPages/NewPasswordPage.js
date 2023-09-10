"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flowbite_react_1 = require("flowbite-react");
const react_router_dom_1 = require("react-router-dom");
const react_router_dom_2 = require("react-router-dom");
const user_1 = require("../../Features/user");
const react_hook_form_1 = require("react-hook-form");
const react_1 = require("react");
const store_1 = require("../../store");
const NewPasswordPage = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const time = parseInt(window.localStorage.getItem("passwordResetTime") || '0');
    (time);
    if (!time) {
        navigate("/login");
    }
    const now = new Date();
    const diff = now.getTime() - (time);
    (0, react_1.useEffect)(() => {
        if (diff > 900000) {
            navigate("/login");
        }
    });
    const dispatch = (0, store_1.useAppDispatch)();
    const { register, handleSubmit, formState: { errors }, } = (0, react_hook_form_1.useForm)();
    const { token } = (0, react_router_dom_2.useParams)();
    const onSubmit = (data) => {
        if (token && diff < 900000 && data.password === data.confirm_password) {
            dispatch((0, user_1.changeForgottenPassword)({ password: data.password, token: token }));
            navigate("/login");
        }
        else {
        }
    };
    return (React.createElement("main", { className: "flex flex-col justify-center items-center gap-4 py-5 " },
        React.createElement("br", null),
        React.createElement("h1", { className: "text-2xl font-medium" }, "Reset your password with email: "),
        React.createElement("br", null),
        React.createElement("form", { className: "flex flex-col w-1/3 gap-2", onSubmit: handleSubmit(onSubmit) },
            React.createElement("div", null,
                React.createElement("label", { htmlFor: "password", className: "block mb-2 text-sm font-medium text-gray-900 dark:text-white" }, "Password: "),
                React.createElement("input", Object.assign({}, register("password", { required: true, minLength: 6 }), { type: "password", id: "password", className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500", required: true }))),
            React.createElement("div", null,
                React.createElement("label", { htmlFor: "confirm_password", className: "block mb-2 text-sm font-medium text-gray-900 dark:text-white" }, "Confirm password: "),
                React.createElement("input", Object.assign({}, register("confirm_password", { required: true, minLength: 6 }), { type: "password", id: "confirm_password", className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500", required: true }))),
            React.createElement("div", null,
                React.createElement(flowbite_react_1.Button, { color: "light", type: "submit" }, "Submit ")))));
};
exports.default = NewPasswordPage;
