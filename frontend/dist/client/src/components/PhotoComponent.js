"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const ModalComponent_1 = __importDefault(require("./ModalComponent"));
const PhotoComponent = ({ photo }) => {
    const [openModal, setOpenModal] = (0, react_1.useState)();
    return (React.createElement("div", null,
        React.createElement("figure", { className: "relative  max-w-xs transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0 text-transparent hover:text-zinc-300" },
            React.createElement("img", { onClick: () => setOpenModal('dismissible'), className: "rounded-lg", src: photo.photo, alt: "thumbnail" }),
            React.createElement("figcaption", { className: " w-full absolute px-4 bottom-6 text-center " },
                React.createElement("p", null, photo.caption))),
        React.createElement(ModalComponent_1.default, { openModal: openModal, setOpenModal: setOpenModal, photo: photo.photo, caption: photo.caption, likes: photo.likes, id: photo.id })));
};
exports.default = PhotoComponent;
