"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const LoadingSpinner_1 = __importDefault(require("../components/LoadingSpinner"));
const react_router_dom_1 = require("react-router-dom");
const flowbite_react_1 = require("flowbite-react");
const react_2 = require("react");
const store_1 = require("../store");
const react_hook_form_1 = require("react-hook-form");
const user_1 = require("../Features/user");
const Dashboard = () => {
    const { isAuthenticated, user, loading } = (0, store_1.useAppSelector)((state) => state.user);
    const dispatch = (0, store_1.useAppDispatch)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [edit, setEdit] = (0, react_2.useState)(false);
    const [showPassword, setShowPassword] = (0, react_2.useState)(false);
    const { register, handleSubmit, } = (0, react_hook_form_1.useForm)();
    const onSubmit = (data) => {
        dispatch((0, user_1.changePassword)({ password: data.password, email: user.email }));
        setShowPassword(!showPassword);
        navigate("/login");
    };
    if (!isAuthenticated && !loading && user === null) {
        return react_1.default.createElement(react_router_dom_1.Navigate, { to: "/login" });
    }
    else {
        return (react_1.default.createElement("div", null, loading || user === null ? (react_1.default.createElement(LoadingSpinner_1.default, null)) :
            (react_1.default.createElement("main", { className: "flex gap-4 items-center justify-center" },
                react_1.default.createElement("div", { className: "flex flex-col w-2/3 min-h-screen justify-center items-center gap-4" },
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("h1", { className: "text-2xl" }, "Dashboard")),
                    react_1.default.createElement("br", null),
                    react_1.default.createElement(react_1.default.Fragment, null, !showPassword ? (react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement("div", { className: "flex justify-between w-1/3 pt-4" },
                            react_1.default.createElement("dt", null, "Fistname : "),
                            !edit ? react_1.default.createElement("dd", null,
                                " ",
                                user.first_name) : react_1.default.createElement(flowbite_react_1.TextInput, { placeholder: user.first_name, id: "small", sizing: "sm", type: "text" })),
                        react_1.default.createElement("div", { className: "flex justify-between w-1/3 border-t  pt-4" },
                            react_1.default.createElement("dt", null, "Lastname : "),
                            !edit ? react_1.default.createElement("dd", null,
                                " ",
                                user.last_name) : react_1.default.createElement(flowbite_react_1.TextInput, { placeholder: user.last_name, id: "small", sizing: "sm", type: "text" })),
                        react_1.default.createElement("div", { className: "flex justify-between w-1/3 border-t  pt-4" },
                            react_1.default.createElement("dt", null, "Email : "),
                            !edit ? react_1.default.createElement("dd", null,
                                " ",
                                user.email) : react_1.default.createElement(flowbite_react_1.TextInput, { placeholder: user.email, id: "small", sizing: "sm", type: "email" })),
                        react_1.default.createElement("div", { className: "flex justify-between w-1/3 border-t  pt-4" }),
                        react_1.default.createElement("div", { className: "flex gap-2 " },
                            react_1.default.createElement(flowbite_react_1.Button, { color: "light", className: "text-white", onClick: () => setEdit(!edit) }, !edit ? 'Edit' : 'Cancel'),
                            react_1.default.createElement(flowbite_react_1.Button, { color: "light", className: "text-white", onClick: () => setShowPassword(!showPassword) }, "Change password")))) : (react_1.default.createElement("form", { onSubmit: handleSubmit(onSubmit), className: "flex flex-col w-full items-center justify-center gap-3" },
                        react_1.default.createElement("div", { className: "flex flex-col gap-3 pt-4 w-1/2" },
                            react_1.default.createElement("label", { htmlFor: "password", className: "block mb-2 text-sm font-medium text-white dark:text-white" }, "Password: "),
                            react_1.default.createElement("input", Object.assign({}, register("password", { required: true, minLength: 6 }), { type: "password", id: "password", className: "bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500", required: true }))),
                        react_1.default.createElement("div", { className: "flex flex-col gap-3 pt-4 w-1/2" },
                            react_1.default.createElement("label", { htmlFor: "confirm_password", className: "block mb-2 text-sm font-medium text-white dark:text-white" }, "Confirm password: "),
                            react_1.default.createElement("input", Object.assign({}, register("confirm_password", { required: true, minLength: 6 }), { type: "password", id: "confirm_password", className: "bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500", required: true }))),
                        react_1.default.createElement("div", { className: "flex gap-2 w-1/2" },
                            react_1.default.createElement(flowbite_react_1.Button, { color: "light", className: "text-white", onClick: () => setShowPassword(!showPassword) }, "Cancel"),
                            react_1.default.createElement(flowbite_react_1.Button, { color: "light", className: "text-white", type: "submit" }, "Change password"))))))))));
    }
};
exports.default = Dashboard;
