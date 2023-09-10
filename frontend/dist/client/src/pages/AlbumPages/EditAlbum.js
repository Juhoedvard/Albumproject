"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const AlbumComponent_1 = __importDefault(require("../../components/AlbumComponent"));
const store_1 = require("../../store");
const EditAlbum = () => {
    const { id } = (0, react_router_dom_1.useParams)();
    const { albums } = (0, store_1.useAppSelector)((state) => state.albums);
    const album = albums.find((album) => album.id.toString() === id);
    const editPhoto = (photo) => {
    };
    return (react_1.default.createElement("div", { className: "flex flex-col justify-center items-center" },
        react_1.default.createElement("div", { className: "border-b m-2 p-4 w-1/4" },
            react_1.default.createElement("br", null),
            album &&
                react_1.default.createElement("div", { className: "flex gap-4" },
                    react_1.default.createElement("div", { className: "flex h-full w-full justify-end" },
                        react_1.default.createElement(AlbumComponent_1.default, { album: album })),
                    react_1.default.createElement("div", { className: "flex flex-col w-full h-full gap-4 " },
                        react_1.default.createElement("div", null,
                            react_1.default.createElement("h1", { className: "italic text-5xl font-medium " },
                                " ",
                                album.title)),
                        react_1.default.createElement("div", { className: "flex flex-col gap-2" },
                            react_1.default.createElement("dt", null, "Description: "),
                            react_1.default.createElement("dd", null, album.description))))),
        react_1.default.createElement("div", { className: "grid grid-cols-3 md:grid-cols-3 m-10 gap-4 justify-items-start   " }, album === null || album === void 0 ? void 0 : album.photos.map((photo, index) => {
            return (react_1.default.createElement("div", { key: index }));
        }))));
};
exports.default = EditAlbum;
