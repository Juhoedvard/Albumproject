"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const store_1 = require("../../store");
const LoadingSpinner_1 = __importDefault(require("../../components/LoadingSpinner"));
const AlbumComponent_1 = __importDefault(require("../../components/AlbumComponent"));
const ai_1 = require("react-icons/ai");
const MyAlbumsPage = () => {
    const { id } = (0, react_router_dom_1.useParams)();
    const { albums, loading } = (0, store_1.useAppSelector)((state) => state.albums);
    const { user, isAuthenticated } = (0, store_1.useAppSelector)((state) => state.user);
    const myAlbums = albums.filter((album) => album.user.id.toString() === id);
    if (!albums && !loading) {
        return (react_1.default.createElement("div", null, "Something went wrong fetching data"));
    }
    return (react_1.default.createElement("div", { className: "flex h-full w-full " },
        react_1.default.createElement("div", { className: "w-2/3" },
            react_1.default.createElement("br", null),
            user &&
                react_1.default.createElement("div", { className: "flex justify-between m-10" },
                    react_1.default.createElement("h1", { className: "font-extrabold text-3xl italic" },
                        user.first_name,
                        " ",
                        user.last_name,
                        " albums:"),
                    react_1.default.createElement("div", null,
                        react_1.default.createElement(react_router_dom_1.Link, { to: '/create-album', className: "flex items-center gap-2" },
                            " ",
                            react_1.default.createElement(ai_1.AiOutlineUpload, null),
                            "Add a new album"))),
            react_1.default.createElement("br", null),
            react_1.default.createElement("div", { className: "grid grid-cols-3 md:grid-cols-3 gap-10 m-10 " },
                loading ?
                    react_1.default.createElement(LoadingSpinner_1.default, null)
                    :
                        myAlbums === null || myAlbums === void 0 ? void 0 : myAlbums.map((album, index) => {
                            return (react_1.default.createElement("div", { key: index },
                                react_1.default.createElement(AlbumComponent_1.default, { album: album })));
                        }),
                " "))));
};
exports.default = MyAlbumsPage;
