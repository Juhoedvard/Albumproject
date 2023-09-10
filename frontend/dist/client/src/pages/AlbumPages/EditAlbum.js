"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const AlbumComponent_1 = __importDefault(require("../../components/AlbumComponent"));
const store_1 = require("../../store");
const EditAlbum = () => {
    const { id } = (0, react_router_dom_1.useParams)();
    const { albums } = (0, store_1.useAppSelector)((state) => state.albums);
    const album = albums.find((album) => album.id.toString() === id);
    (album === null || album === void 0 ? void 0 : album.likes);
    const editPhoto = (photo) => {
    };
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
                        React.createElement("div", { className: "flex flex-col gap-2" },
                            React.createElement("dt", null, "Description: "),
                            React.createElement("dd", null, album.description))))),
        React.createElement("div", { className: "grid grid-cols-3 md:grid-cols-3 m-10 gap-4 justify-items-start   " }, album === null || album === void 0 ? void 0 : album.photos.map((photo, index) => {
            return (React.createElement("div", { key: index }));
        }))));
};
exports.default = EditAlbum;
