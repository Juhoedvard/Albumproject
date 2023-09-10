"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const store_1 = require("../store");
const fi_1 = require("react-icons/fi");
const AlbumComponent = ({ album }) => {
    const { user } = (0, store_1.useAppSelector)((state) => state.user);
    let ownAlbums = false;
    if (user) {
        ownAlbums = user.id === album.user.id;
    }
    return (react_1.default.createElement(react_1.default.Fragment, null, ownAlbums ?
        react_1.default.createElement("figure", { className: "relative max-w-sm transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0 text-transparent hover:text-zinc-300" },
            react_1.default.createElement(react_router_dom_1.Link, { to: `/album/${album.id}` },
                react_1.default.createElement("img", { className: "rounded-lg", src: album.thumbnail, alt: "thumbnail" })),
            react_1.default.createElement("figcaption", { className: " w-full absolute px-4 top-6 text-center " },
                react_1.default.createElement("p", { className: "mx-auto text-xl" }, album.title)),
            react_1.default.createElement("figcaption", { className: "flex w-full absolute px-4 top-6 items-end justify-end " },
                react_1.default.createElement(react_router_dom_1.Link, { to: `/editAlbum/${album.id}` },
                    react_1.default.createElement(fi_1.FiEdit, { size: 30 }))))
        :
            react_1.default.createElement("figure", { className: "relative max-w-sm transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0 text-transparent hover:text-zinc-300" },
                react_1.default.createElement(react_router_dom_1.Link, { to: `/album/${album.id}` },
                    react_1.default.createElement("img", { className: "rounded-lg", src: album.thumbnail, alt: "thumbnail" })),
                react_1.default.createElement("figcaption", { className: " w-full absolute px-4 top-6 text-center " },
                    react_1.default.createElement("p", { className: "mx-auto text-xl" },
                        album.title,
                        " ")))));
};
exports.default = AlbumComponent;
