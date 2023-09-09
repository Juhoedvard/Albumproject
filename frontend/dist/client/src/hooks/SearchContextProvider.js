"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchProvider = exports.useSearch = void 0;
const react_1 = require("react");
const SearchContext = (0, react_1.createContext)(undefined);
function useSearch() {
    const context = (0, react_1.useContext)(SearchContext);
    if (!context) {
        throw new Error("useSearch must be used within a SearchProvider");
    }
    return context;
}
exports.useSearch = useSearch;
function SearchProvider({ children }) {
    const [searchTerm, setSearchTerm] = (0, react_1.useState)('');
    return (React.createElement(SearchContext.Provider, { value: { searchTerm, setSearchTerm } }, children));
}
exports.SearchProvider = SearchProvider;
