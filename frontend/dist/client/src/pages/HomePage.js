"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("../store");
const AlbumComponent_1 = __importDefault(require("../components/AlbumComponent"));
const LoadingSpinner_1 = __importDefault(require("../components/LoadingSpinner"));
const ErrorAlbums_1 = __importDefault(require("../components/ErrorAlbums"));
const SearchContextProvider_1 = require("../hooks/SearchContextProvider");
const useDebounce_1 = __importDefault(require("../hooks/useDebounce"));
const react_1 = require("react");
const react_toastify_1 = require("react-toastify");
const HomePage = () => {
    const { albums, loading } = (0, store_1.useAppSelector)((state) => state.albums);
    const { searchTerm } = (0, SearchContextProvider_1.useSearch)();
    const debouncedSearch = (0, useDebounce_1.default)(searchTerm, 300);
    const [searchResults, setSearchResults] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        if (debouncedSearch === '') {
            setSearchResults(albums);
        }
        else {
            const searchedAlbums = albums.filter((album) => {
                return (album.title.toLowerCase().startsWith(debouncedSearch.toLowerCase()));
            });
            if (searchedAlbums.length < 1) {
                setTimeout(() => {
                    react_toastify_1.toast.info('No results from search');
                }, 1000);
            }
            else {
                setSearchResults(searchedAlbums);
            }
        }
    }, [debouncedSearch, albums]);
    if (albums.length < 1 && !loading) {
        return (React.createElement(ErrorAlbums_1.default, null));
    }
    return (React.createElement("div", { className: "grid h-full w-full " },
        React.createElement("br", null),
        !loading && React.createElement("h1", { className: "font-extrabold text-5xl italic m-10" }, "Albums"),
        React.createElement("br", null),
        React.createElement("div", { className: "grid grid-cols-3 md:grid-cols-4 gap-10 m-10 " },
            loading ?
                React.createElement(LoadingSpinner_1.default, null)
                :
                    searchResults === null || searchResults === void 0 ? void 0 : searchResults.map((album, index) => {
                        return (React.createElement("div", { key: index },
                            React.createElement(AlbumComponent_1.default, { album: album })));
                    }),
            " ")));
};
exports.default = HomePage;
