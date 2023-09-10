"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchProvider = exports.useSearch = void 0;
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const SearchContext = (0, react_2.createContext)(undefined);
function useSearch() {
    const context = (0, react_2.useContext)(SearchContext);
    if (!context) {
        throw new Error("useSearch must be used within a SearchProvider");
    }
    return context;
}
exports.useSearch = useSearch;
function SearchProvider({ children }) {
    const [searchTerm, setSearchTerm] = (0, react_2.useState)('');
    return (react_1.default.createElement(SearchContext.Provider, { value: { searchTerm, setSearchTerm } }, children));
}
exports.SearchProvider = SearchProvider;
