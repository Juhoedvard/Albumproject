"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const store_1 = require("../store");
const react_1 = require("react");
const user_1 = require("../Features/user");
const LoadingSpinner_1 = __importDefault(require("../components/LoadingSpinner"));
const AlbumComponent_1 = __importDefault(require("../components/AlbumComponent"));
const UserProfile = () => {
    const dispatch = (0, store_1.useAppDispatch)();
    const { id } = (0, react_router_dom_1.useParams)();
    const { userprofile, loading } = (0, store_1.useAppSelector)((state) => state.user);
    (0, react_1.useEffect)(() => {
        if (id) {
            dispatch((0, user_1.getProfile)(id));
        }
    }, [id]);
    return (React.createElement("div", { className: "flex" },
        React.createElement("br", null),
        React.createElement("div", { className: "flex flex-col h-1/3  items-center my-6 w-1/3 border-b" }, loading ? React.createElement(LoadingSpinner_1.default, null) : userprofile &&
            React.createElement("div", null,
                React.createElement("div", null,
                    React.createElement("h1", { className: "text-3xl font-bold" },
                        userprofile.first_name,
                        " ",
                        userprofile.last_name)),
                React.createElement("br", null),
                React.createElement("div", { className: "flex flex-col h-2/3 gap-4 " },
                    React.createElement("dt", null, "Description: "),
                    React.createElement("dd", null,
                        " ",
                        userprofile.description)))),
        React.createElement("div", { className: " min-h-screen border-r" }),
        React.createElement("div", { className: "grid h-2/3 w-full mx-10 items-center justify-center " },
            React.createElement("div", { className: "maw-w-4xl w-full" },
                React.createElement("h1", { className: "font-extrabold text-5xl italic m-10" }, "Albums"),
                React.createElement("br", null),
                React.createElement("div", { className: "grid grid-cols-2 md:grid-cols-3 m-10 gap-10 w-2/3 " },
                    loading ?
                        React.createElement(LoadingSpinner_1.default, null)
                        :
                            userprofile === null || userprofile === void 0 ? void 0 : userprofile.useralbums.map((album, index) => {
                                return (React.createElement("div", { key: index },
                                    React.createElement(AlbumComponent_1.default, { album: album })));
                            }),
                    " ")))));
};
exports.default = UserProfile;
