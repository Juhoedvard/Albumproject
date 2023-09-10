"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtectedRoutes = exports.AuthContext = void 0;
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const store_1 = require("../store");
const react_router_dom_1 = require("react-router-dom");
const LogInModal_1 = __importDefault(require("../components/LogInModal"));
const flowbite_react_1 = require("flowbite-react");
exports.AuthContext = (0, react_2.createContext)({
    isAuthenticated: false,
});
function Auth() {
    const { isAuthenticated } = (0, store_1.useAppSelector)((state) => state.user);
    return isAuthenticated;
}
exports.default = Auth;
const ProtectedRoutes = () => {
    const isAuth = Auth();
    const [openModal, setOpenModal] = (0, react_2.useState)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    return (isAuth ? react_1.default.createElement(react_router_dom_1.Outlet, null) :
        react_1.default.createElement("div", { className: "flex h-screen w-full" },
            react_1.default.createElement("div", { className: "flex flex-col w-full justify-center items-center gap-2" },
                react_1.default.createElement("h1", { className: "text-2xl" }, "Page requires authentication"),
                react_1.default.createElement("br", null),
                react_1.default.createElement("div", { className: "flex gap-4" },
                    react_1.default.createElement(flowbite_react_1.Button, { color: 'dark', onClick: () => navigate(-1) }, "Return"),
                    react_1.default.createElement(flowbite_react_1.Button, { color: 'dark', type: "button", onClick: () => setOpenModal('dismissible') }, "Log in"))),
            react_1.default.createElement(LogInModal_1.default, { openModal: openModal, setOpenModal: setOpenModal })));
};
exports.ProtectedRoutes = ProtectedRoutes;
