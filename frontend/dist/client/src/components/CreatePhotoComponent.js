"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ci_1 = require("react-icons/ci");
const react_1 = require("react");
const react_toastify_1 = require("react-toastify");
const EditPhotoComponent = ({ photo, removePhoto, photosLoaded, index, selectedPhoto, setSelectedPhoto }) => {
    const [isSelected, setIsSelected] = (0, react_1.useState)(false);
    const [caption, setCaption] = (0, react_1.useState)([]);
    const [selectedPhotoIndexes, setSelectedPhotoIndexes] = (0, react_1.useState)({});
    const [selectedPhotoEffects, setSelectedPhotoEffects] = (0, react_1.useState)({});
    const finalPhoto = (photo) => {
        (index);
        (caption);
        (caption);
        if (!caption) {
            return react_toastify_1.toast.error('Set caption for photo');
        }
        const temporaryPhoto = {
            caption: caption[index],
            photo: photo,
            albumID: '',
        };
        (temporaryPhoto);
        const isSelected = selectedPhotoIndexes[photo];
        let newSelectedPhotos = [...selectedPhoto];
        if (isSelected) {
            newSelectedPhotos = newSelectedPhotos.filter((selected) => selected.photo !== photo);
        }
        else {
            newSelectedPhotos.push(temporaryPhoto);
        }
        setSelectedPhoto(newSelectedPhotos);
        setSelectedPhotoEffects(Object.assign(Object.assign({}, selectedPhotoEffects), { [photo]: !isSelected }));
    };
    const handleCaptionChange = (index, value) => {
        const newCaptions = [...caption];
        newCaptions[index] = value;
        (newCaptions);
        setCaption(newCaptions);
    };
    const toggleSelected = () => {
        setIsSelected(!isSelected);
        if (setSelectedPhotoEffects) {
            setSelectedPhotoEffects((prevSelectedPhotoEffects) => (Object.assign(Object.assign({}, prevSelectedPhotoEffects), { [photo]: !isSelected })));
        }
        if (finalPhoto && !isSelected && index !== undefined) {
            (photo);
            (index);
            (caption);
            finalPhoto(photo);
        }
    };
    return (React.createElement("div", null,
        React.createElement("div", { className: "flex justify-center  relative z-0  mb-6 group " },
            React.createElement("input", { onChange: (e) => handleCaptionChange(index, e.target.value), type: "text", name: "floating_caption", id: "floating_last_name", className: " w-2/3 block py-2.5 px-0  text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer", placeholder: " ", required: true }),
            React.createElement("label", { htmlFor: "floating_caption", className: "peer-focus:font-medium absolute text-sm text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" }, "Add photo caption")),
        React.createElement("figure", { className: isSelected
                ? 'relative max-w-xs transition ease-in-out scale-105 delay-100 translate-y-1'
                : 'relative max-w-xs  filter grayscale text-transparent hover:text-zinc-300' },
            React.createElement("img", { className: "rounded-lg", src: photo, alt: "thumbnail" }),
            React.createElement("figcaption", { className: "w-full absolute px-4 bottom-6 text-center" }, caption && React.createElement("p", null, caption)),
            removePhoto && (React.createElement("figcaption", { className: "w-full absolute px-4 top-2 text-right" },
                React.createElement("button", { type: "button", onClick: () => removePhoto(photo) },
                    React.createElement(ci_1.CiCircleRemove, { size: 30 }))))),
        React.createElement("br", null),
        React.createElement("div", { className: 'flex w-full justify-center items-center' }, photosLoaded && (React.createElement("button", { type: "button", onClick: toggleSelected, className: "text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" }, !isSelected ? 'Add photo' : 'Remove photo')))));
};
exports.default = EditPhotoComponent;
