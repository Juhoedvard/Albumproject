"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const flowbite_react_1 = require("flowbite-react");
const react_1 = require("react");
const react_hook_form_1 = require("react-hook-form");
const album_1 = require("../../Features/album");
const store_1 = require("../../store");
const react_router_dom_1 = require("react-router-dom");
const react_toastify_1 = require("react-toastify");
const CreatePhotoComponent_1 = __importDefault(require("../../components/CreatePhotoComponent"));
const CreateAlbum = () => {
    const { register, handleSubmit, watch, } = (0, react_hook_form_1.useForm)();
    const title = watch('title');
    const description = watch('description');
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [thumbnail, setThumbnail] = (0, react_1.useState)();
    const [photos, setPhotos] = (0, react_1.useState)([]);
    const [addedPhotos, setAddedPhotos] = (0, react_1.useState)([]);
    const [thumbnailUrl, setThumbnailUrl] = (0, react_1.useState)('');
    const [selectedPhoto, setSelectedPhoto] = (0, react_1.useState)([]);
    const [photosLoaded, setPhotosLoaded] = (0, react_1.useState)(false);
    const dispatch = (0, store_1.useAppDispatch)();
    const onSubmit = (data) => __awaiter(void 0, void 0, void 0, function* () {
        if (thumbnail && selectedPhoto) {
            yield dispatch((0, album_1.createAlbum)(Object.assign(Object.assign({}, data), { thumbnail: thumbnailUrl, photos: selectedPhoto })));
            navigate('/');
        }
        else {
            react_toastify_1.toast.info('Add a thumbnail for your album');
        }
    });
    const UploadThumbnail = (e) => {
        if (e.target.files) {
            setThumbnail(e.target.files[0]);
        }
    };
    const UploadPhotos = (e) => {
        if (e.target.files) {
            const newPhotos = [...photos];
            for (let i = 0; i < e.target.files.length; i++) {
                newPhotos.push(e.target.files[i]);
            }
            (newPhotos);
            setPhotos(newPhotos);
        }
    };
    const uploadSelectedPhotos = () => {
        if (thumbnail) {
            dispatch((0, album_1.addThumbnail)(thumbnail))
                .then((add) => {
                setThumbnailUrl(add.payload);
            })
                .catch((error) => {
                (error);
            });
            if (photos) {
                dispatch((0, album_1.addPhotos)(photos))
                    .then((add) => {
                    setAddedPhotos(add.payload);
                    setPhotosLoaded(true);
                })
                    .catch((error) => {
                    (error);
                });
            }
        }
        else {
            react_toastify_1.toast.error('Add a thumbnail');
        }
    };
    const removePhoto = (photo) => {
        const updatedPhotos = addedPhotos.filter((p) => p !== photo);
        setAddedPhotos(updatedPhotos);
        const updatedPhotoFiles = photos.filter((p) => p.name !== photo);
        setPhotos(updatedPhotoFiles);
    };
    return (React.createElement("main", { className: "flex flex-col items-center justify-center gap-4 py-5 " },
        React.createElement("br", null),
        !thumbnailUrl && React.createElement("h1", { className: "text-2xl font-medium italic" }, "Create Album"),
        React.createElement("br", null),
        React.createElement("form", { onSubmit: handleSubmit(onSubmit), className: "flex justify-center items-center gap-4 w-full" },
            React.createElement("div", { className: `flex flex-col w-1/3 pr-5 justify-center items-center  gap-4 ${!thumbnailUrl ? "" : "border-r"}` },
                React.createElement("div", { className: "" },
                    thumbnailUrl &&
                        React.createElement("div", null,
                            React.createElement("h1", { className: "text-2xl font-medium italic" }, "Create Album"),
                            React.createElement("br", null)),
                    React.createElement("div", { className: "relative z-0 w-full mb-6 group" },
                        React.createElement("input", Object.assign({}, register("title", { required: true }), { type: "text", id: "floating_title", className: "block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer", placeholder: " ", required: true })),
                        React.createElement("label", { htmlFor: "floating_title", className: "peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" }, "Album title")),
                    React.createElement("div", { className: "max-w-md", id: "textarea" },
                        React.createElement("div", { className: "mb-2 block" },
                            React.createElement(flowbite_react_1.Label, { htmlFor: "comment", value: "Description:", color: 'text-white' }))),
                    React.createElement(flowbite_react_1.Textarea, Object.assign({}, register("description", { required: true }), { rows: 6, id: "floating_title", placeholder: "Description ", required: true })),
                    React.createElement("div", { className: "max-w-md", id: "fileUpload" },
                        React.createElement("div", { className: "mb-2 block" },
                            React.createElement(flowbite_react_1.Label, { htmlFor: "file", value: "Upload file", color: 'white' })),
                        React.createElement(flowbite_react_1.FileInput, { helperText: "Upload you cover thumbnail", id: "file", onChange: UploadThumbnail })),
                    React.createElement("div", { className: "flex flex-col gap-4" },
                        React.createElement("div", { className: "mb-2 block" },
                            React.createElement(flowbite_react_1.Label, { htmlFor: "file", value: "Upload photos to your album", color: 'white' })),
                        React.createElement(flowbite_react_1.FileInput, { helperText: "Upload you album photos", id: "file", multiple: true, onChange: UploadPhotos }),
                        React.createElement("p", null, "Added photos:"),
                        photos && (photos.map((p, index) => {
                            return (React.createElement("div", { key: index },
                                React.createElement("ul", null,
                                    React.createElement("li", { className: "text-sm" }, p.name))));
                        })),
                        React.createElement("div", { className: "flex w-full gap-2 justify-center" },
                            React.createElement("button", { type: 'button', onClick: () => navigate('/'), className: "w-1/3 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" }, "Cancel"),
                            React.createElement("button", { type: 'button', onClick: uploadSelectedPhotos, className: "w-1/3 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" }, "Preview"))))),
            thumbnailUrl &&
                React.createElement("div", { className: "flex flex-col w-2/3 h-full" },
                    React.createElement("div", { className: "flex w-full items-center justify-center gap-4" },
                        React.createElement("figure", { className: "relative max-w-xs transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0 text-transparent hover:text-zinc-300" },
                            React.createElement("img", { className: "rounded-lg", src: thumbnailUrl, alt: "thumbnail" })),
                        React.createElement("div", { className: "flex h-full flex-col  gap-4 " },
                            React.createElement("div", { className: "flex  justify-start items-start" },
                                React.createElement("h1", { className: "italic text-5xl font-medium " }, title)),
                            React.createElement("div", { className: "flex flex-col gap-4" },
                                React.createElement("dt", null, "Description: "),
                                React.createElement("dd", null,
                                    " ",
                                    description)))),
                    React.createElement("div", null, addedPhotos.length > 0 && (React.createElement("div", { className: "grid grid-cols-3 md:grid-cols-3 m-10 justify-items-start   " }, addedPhotos.map((photo, index) => {
                        return (React.createElement("div", { key: index, className: "flex flex-col w-80  items-center " },
                            React.createElement("div", null,
                                React.createElement(CreatePhotoComponent_1.default, { photo: photo, removePhoto: removePhoto, selectedPhoto: selectedPhoto, setSelectedPhoto: setSelectedPhoto, photosLoaded: photosLoaded, index: index })),
                            React.createElement("br", null)));
                    })))),
                    React.createElement("br", null),
                    React.createElement("div", { className: "flex justify-center " },
                        React.createElement("button", { type: "submit", className: "w-1/5 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" }, "Add album"))))));
};
exports.default = CreateAlbum;
