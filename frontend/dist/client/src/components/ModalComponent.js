"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flowbite_react_1 = require("flowbite-react");
const react_1 = require("react");
const fc_1 = require("react-icons/fc");
const store_1 = require("../store");
const album_1 = require("../Features/album");
/// Tähän joskus joku fiksumpi tapa
const ModalComponent = ({ openModal, setOpenModal, photo, caption, likes, id }) => {
    const dispatch = (0, store_1.useAppDispatch)();
    const { isAuthenticated, user } = (0, store_1.useAppSelector)((state) => state.user);
    const [loaded, setLoaded] = (0, react_1.useState)(false);
    const [userLiked, setUserLiked] = (0, react_1.useState)(false);
    const [currentLike, setCurrentLike] = (0, react_1.useState)(likes || 0);
    console.log(id, likes);
    (0, react_1.useEffect)(() => {
        if (id && likes) {
            dispatch((0, album_1.getPhotoLikes)(id)).then((users) => {
                setLoaded(true);
                setCurrentLike(users.payload.length);
                if (users.payload.length && user) {
                    console.log('here');
                    const checklikes = users.payload.includes(user.id);
                    setUserLiked(checklikes);
                }
            });
        }
    }, [dispatch, loaded]);
    const likePhoto = (id, event) => {
        event.preventDefault();
        dispatch((0, album_1.LikePhoto)(id)).then(() => {
            setCurrentLike((prevLike) => (userLiked ? Math.max(prevLike - 1, 0) : prevLike + 1));
            setUserLiked(!userLiked);
        }).catch((err) => {
            console.log(err);
        });
    };
    return (React.createElement(flowbite_react_1.Modal, { dismissible: true, show: openModal === 'dismissible', size: 'md', onClose: () => setOpenModal(true) },
        React.createElement(flowbite_react_1.Modal.Header, { className: 'bg-' }, caption),
        React.createElement(flowbite_react_1.Modal.Body, null,
            React.createElement("figure", { className: "flex flex-growrelative text-transparent hover:text-zinc-300" },
                React.createElement("img", { className: "rounded-lg", src: photo, alt: "thumbnail" }))),
        React.createElement(flowbite_react_1.Modal.Footer, null,
            React.createElement("div", { className: 'flex  w-full justify-center items-center gap-1' },
                React.createElement("span", { className: 'text-black text-sm ' },
                    " ",
                    currentLike,
                    " "),
                id && isAuthenticated ? React.createElement("button", { onClick: (event) => likePhoto(id, event) }, userLiked ? React.createElement(fc_1.FcLike, null) : React.createElement(fc_1.FcLikePlaceholder, null)) : React.createElement("span", { className: 'text-black text-sm' }, "likes")))));
};
exports.default = ModalComponent;
