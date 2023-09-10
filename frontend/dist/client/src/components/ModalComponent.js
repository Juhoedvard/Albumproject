"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const flowbite_react_1 = require("flowbite-react");
const react_2 = require("react");
const fc_1 = require("react-icons/fc");
const store_1 = require("../store");
const album_1 = require("../Features/album");
/// Tähän joskus joku fiksumpi tapa
const ModalComponent = ({ openModal, setOpenModal, photo, caption, likes, id }) => {
    const dispatch = (0, store_1.useAppDispatch)();
    const { isAuthenticated, user } = (0, store_1.useAppSelector)((state) => state.user);
    const [loaded, setLoaded] = (0, react_2.useState)(false);
    const [userLiked, setUserLiked] = (0, react_2.useState)(false);
    const [currentLike, setCurrentLike] = (0, react_2.useState)(likes || 0);
    (0, react_2.useEffect)(() => {
        if (id && likes) {
            dispatch((0, album_1.getPhotoLikes)(id)).then((users) => {
                setLoaded(true);
                setCurrentLike(users.payload.length);
                if (users.payload.length && user) {
                    const checklikes = users.payload.includes(user.id);
                    setUserLiked(checklikes);
                }
            });
        }
    }, [dispatch, loaded, user]);
    const likePhoto = (id, event) => {
        event.preventDefault();
        dispatch((0, album_1.LikePhoto)(id)).then(() => {
            setCurrentLike((prevLike) => (userLiked ? Math.max(prevLike - 1, 0) : prevLike + 1));
            setUserLiked(!userLiked);
        }).catch((err) => {
            throw Error(err);
        });
    };
    return (react_1.default.createElement(flowbite_react_1.Modal, { dismissible: true, show: openModal === 'dismissible', size: 'md', onClose: () => setOpenModal(undefined) },
        react_1.default.createElement(flowbite_react_1.Modal.Header, { className: 'bg-' }, caption),
        react_1.default.createElement(flowbite_react_1.Modal.Body, null,
            react_1.default.createElement("figure", { className: "flex flex-growrelative text-transparent hover:text-zinc-300" },
                react_1.default.createElement("img", { className: "rounded-lg", src: photo, alt: "thumbnail" }))),
        react_1.default.createElement(flowbite_react_1.Modal.Footer, null,
            react_1.default.createElement("div", { className: 'flex  w-full justify-center items-center gap-1' },
                react_1.default.createElement("span", { className: 'text-black text-sm ' },
                    " ",
                    currentLike,
                    " "),
                id && isAuthenticated ? react_1.default.createElement("button", { onClick: (event) => likePhoto(id, event) }, userLiked ? react_1.default.createElement(fc_1.FcLike, null) : react_1.default.createElement(fc_1.FcLikePlaceholder, null)) : react_1.default.createElement("span", { className: 'text-black text-sm' }, "likes")))));
};
exports.default = ModalComponent;
