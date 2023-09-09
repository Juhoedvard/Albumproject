"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LoadingSpinner_1 = __importDefault(require("../components/LoadingSpinner"));
const react_router_dom_1 = require("react-router-dom");
const flowbite_react_1 = require("flowbite-react");
const react_1 = require("react");
const store_1 = require("../store");
const react_hook_form_1 = require("react-hook-form");
const user_1 = require("../Features/user");
const Dashboard = () => {
    const { isAuthenticated, user, loading } = (0, store_1.useAppSelector)((state) => state.user);
    const dispatch = (0, store_1.useAppDispatch)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [edit, setEdit] = (0, react_1.useState)(false);
    const [showPassword, setShowPassword] = (0, react_1.useState)(false);
    const { register, handleSubmit, formState: { errors }, } = (0, react_hook_form_1.useForm)();
    const onSubmit = (data) => {
        dispatch((0, user_1.changePassword)({ password: data.password, email: user.email }));
        setShowPassword(!showPassword);
        navigate("/login");
    };
    if (!isAuthenticated && !loading && user === null) {
        return React.createElement(react_router_dom_1.Navigate, { to: "/login" });
    }
    else {
        return (React.createElement("div", null, loading || user === null ? (React.createElement(LoadingSpinner_1.default, null)) :
            (React.createElement("main", { className: "flex gap-4 items-center justify-center" },
                React.createElement("div", { className: "flex flex-col w-2/3 min-h-screen justify-center items-center gap-4" },
                    React.createElement("div", null,
                        React.createElement("h1", { className: "text-2xl" }, "Dashboard")),
                    React.createElement("br", null),
                    React.createElement(React.Fragment, null, !showPassword ? (React.createElement(React.Fragment, null,
                        React.createElement("div", { className: "flex justify-between w-1/3 pt-4" },
                            React.createElement("dt", null, "Fistname : "),
                            !edit ? React.createElement("dd", null,
                                " ",
                                user.first_name) : React.createElement(flowbite_react_1.TextInput, { placeholder: user.first_name, id: "small", sizing: "sm", type: "text" })),
                        React.createElement("div", { className: "flex justify-between w-1/3 border-t  pt-4" },
                            React.createElement("dt", null, "Lastname : "),
                            !edit ? React.createElement("dd", null,
                                " ",
                                user.last_name) : React.createElement(flowbite_react_1.TextInput, { placeholder: user.last_name, id: "small", sizing: "sm", type: "text" })),
                        React.createElement("div", { className: "flex justify-between w-1/3 border-t  pt-4" },
                            React.createElement("dt", null, "Email : "),
                            !edit ? React.createElement("dd", null,
                                " ",
                                user.email) : React.createElement(flowbite_react_1.TextInput, { placeholder: user.email, id: "small", sizing: "sm", type: "email" })),
                        React.createElement("div", { className: "flex justify-between w-1/3 border-t  pt-4" }),
                        React.createElement("div", { className: "flex gap-2 " },
                            React.createElement(flowbite_react_1.Button, { color: "light", className: "text-white", onClick: () => setEdit(!edit) }, !edit ? 'Edit' : 'Cancel'),
                            React.createElement(flowbite_react_1.Button, { color: "light", className: "text-white", onClick: () => setShowPassword(!showPassword) }, "Change password")))) : (React.createElement("form", { onSubmit: handleSubmit(onSubmit), className: "flex flex-col w-full items-center justify-center gap-3" },
                        React.createElement("div", { className: "flex flex-col gap-3 pt-4 w-1/2" },
                            React.createElement("label", { htmlFor: "password", className: "block mb-2 text-sm font-medium text-white dark:text-white" }, "Password: "),
                            React.createElement("input", Object.assign({}, register("password", { required: true, minLength: 6 }), { type: "password", id: "password", className: "bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500", required: true }))),
                        React.createElement("div", { className: "flex flex-col gap-3 pt-4 w-1/2" },
                            React.createElement("label", { htmlFor: "confirm_password", className: "block mb-2 text-sm font-medium text-white dark:text-white" }, "Confirm password: "),
                            React.createElement("input", Object.assign({}, register("confirm_password", { required: true, minLength: 6 }), { type: "password", id: "confirm_password", className: "bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500", required: true }))),
                        React.createElement("div", { className: "flex gap-2 w-1/2" },
                            React.createElement(flowbite_react_1.Button, { color: "light", className: "text-white", onClick: () => setShowPassword(!showPassword) }, "Cancel"),
                            React.createElement(flowbite_react_1.Button, { color: "light", className: "text-white", type: "submit" }, "Change password"))))))))));
    }
};
exports.default = Dashboard;
