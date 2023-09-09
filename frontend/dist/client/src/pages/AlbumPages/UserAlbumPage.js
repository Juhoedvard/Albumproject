"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const store_1 = require("../../store");
const AlbumComponent_1 = __importDefault(require("../../components/AlbumComponent"));
const PhotoComponent_1 = __importDefault(require("../../components/PhotoComponent"));
const LoadingSpinner_1 = __importDefault(require("../../components/LoadingSpinner"));
const UserAlbumPage = () => {
    const { id } = (0, react_router_dom_1.useParams)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { albums, loading } = (0, store_1.useAppSelector)((state) => state.albums);
    const album = albums.find((a) => a.id.toString() === id);
    const photos = album === null || album === void 0 ? void 0 : album.photos;
    console.log(photos);
    if (!album && !loading) {
        navigate('/');
    }
    return (React.createElement("div", { className: "flex flex-col justify-center items-center" },
        React.createElement("div", { className: "border-b m-2 p-4 w-1/4" },
            React.createElement("br", null),
            album &&
                React.createElement("div", { className: "flex gap-4" },
                    React.createElement("div", { className: "flex h-full w-full justify-end" },
                        React.createElement(AlbumComponent_1.default, { album: album })),
                    React.createElement("div", { className: "flex flex-col w-full h-full gap-4 " },
                        React.createElement("div", null,
                            React.createElement("h1", { className: "italic text-5xl font-medium " },
                                " ",
                                album.title)),
                        React.createElement("div", { className: "flex flex-col gap-4" },
                            React.createElement("dt", null, "Description: "),
                            React.createElement("dd", null,
                                " ",
                                album.description),
                            React.createElement("br", null),
                            React.createElement("dt", null, "From user: "),
                            React.createElement(react_router_dom_1.Link, { to: `/user/${album.user.id}` },
                                " ",
                                React.createElement("dd", { className: "italic" }, album.user.first_name)))))),
        photos ? React.createElement("div", { className: "grid grid-cols-3 md:grid-cols-3 m-10 gap-4 justify-items-start " }, photos.map((photo, index) => {
            return (React.createElement("div", { key: index, className: "flex items-center gap-2" },
                React.createElement(PhotoComponent_1.default, { photo: photo })));
        }))
            : React.createElement("div", { className: "grid grid-cols-3 md:grid-cols-3 m-10 gap-4 justify-items-start " }, Array(6).fill(null).map((_, index) => {
                return (React.createElement("div", { key: index },
                    React.createElement(LoadingSpinner_1.default, null)));
            })),
        React.createElement("div", null)));
};
exports.default = UserAlbumPage;
