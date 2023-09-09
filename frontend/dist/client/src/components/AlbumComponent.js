"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const store_1 = require("../store");
const fi_1 = require("react-icons/fi");
const AlbumComponent = ({ album }) => {
    const { user } = (0, store_1.useAppSelector)((state) => state.user);
    let ownAlbums = false;
    if (user) {
        ownAlbums = user.id === album.user.id;
    }
    return (React.createElement(React.Fragment, null, ownAlbums ?
        React.createElement("figure", { className: "relative max-w-sm transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0 text-transparent hover:text-zinc-300" },
            React.createElement(react_router_dom_1.Link, { to: `/album/${album.id}` },
                React.createElement("img", { className: "rounded-lg", src: album.thumbnail, alt: "thumbnail" })),
            React.createElement("figcaption", { className: " w-full absolute px-4 top-6 text-center " },
                React.createElement("p", { className: "mx-auto text-xl" }, album.title)),
            React.createElement("figcaption", { className: "flex w-full absolute px-4 top-6 items-end justify-end " },
                React.createElement(react_router_dom_1.Link, { to: `/editAlbum/${album.id}` },
                    React.createElement(fi_1.FiEdit, { size: 30 }))))
        :
            React.createElement("figure", { className: "relative max-w-sm transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0 text-transparent hover:text-zinc-300" },
                React.createElement(react_router_dom_1.Link, { to: `/album/${album.id}` },
                    React.createElement("img", { className: "rounded-lg", src: album.thumbnail, alt: "thumbnail" })),
                React.createElement("figcaption", { className: " w-full absolute px-4 top-6 text-center " },
                    React.createElement("p", { className: "mx-auto text-xl" },
                        album.title,
                        " ")))));
};
exports.default = AlbumComponent;
