"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const user_1 = require("../Features/user");
const store_1 = require("../store");
const flowbite_react_1 = require("flowbite-react");
const hi_1 = require("react-icons/hi");
const bi_1 = require("react-icons/bi");
const md_1 = require("react-icons/md");
const DropdownItem_1 = require("flowbite-react/lib/esm/components/Dropdown/DropdownItem");
const SearchContextProvider_1 = require("../hooks/SearchContextProvider");
const react_1 = require("react");
const LogInModal_1 = __importDefault(require("./LogInModal"));
const NavBar = () => {
    const dispatch = (0, store_1.useAppDispatch)();
    const { user } = (0, store_1.useAppSelector)((state) => state.user);
    const { searchTerm, setSearchTerm } = (0, SearchContextProvider_1.useSearch)();
    const [openModal, setOpenModal] = (0, react_1.useState)();
    return (React.createElement("nav", { className: "border-gray-400 dark:bg-gray-900  mx-auto  text-white border-b" },
        React.createElement("div", { className: "max-w-screen-xl flex flex-wrap items-center justify-between mx-auto md:order-1 p-4" },
            React.createElement("div", { className: "items-center justify-between hidden w-full md:flex md:w-auto ", id: "navbar-search" },
                React.createElement("ul", { className: "flex flex-col p-4 md:p-0 mt-4 font-medium border  rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700" },
                    React.createElement("li", null,
                        React.createElement(react_router_dom_1.NavLink, { to: '/', className: "block py-2 pl-3 pr-4  rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" }, "Home")),
                    React.createElement("li", null,
                        React.createElement(react_router_dom_1.NavLink, { to: '/Dashboard', className: "block py-2 pl-3 pr-4  rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" }, "Dashboard")))),
            React.createElement("div", { className: "flex md:order-2 w-3/5 items-center justify-center" },
                React.createElement("button", { type: "button", "data-collapse-toggle": "navbar-search", "aria-controls": "navbar-search", "aria-expanded": "false", className: "md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1" },
                    React.createElement("svg", { className: "w-5 h-5", "aria-hidden": "true", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 20 20" },
                        React.createElement("path", { stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" })),
                    React.createElement("span", { className: "sr-only" }, "Search")),
                React.createElement("div", { className: "relative w-full hidden md:block" },
                    React.createElement("div", { className: "absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none" },
                        React.createElement("svg", { className: "w-4 h-4 text-gray-500 dark:text-gray-400", "aria-hidden": "true", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 20 20" },
                            React.createElement("path", { stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" })),
                        React.createElement("span", { className: "sr-only" }, "Search icon")),
                    React.createElement("input", { type: "text", id: "search-navbar", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "block w-full p-2 pl-10 text-sm text-black border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500", placeholder: "Search for a album..." })),
                React.createElement("button", { "data-collapse-toggle": "navbar-search", type: "button", className: "inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600", "aria-controls": "navbar-search", "aria-expanded": "false" },
                    React.createElement("span", { className: "sr-only" }, "Open main menu"),
                    React.createElement("svg", { className: "w-5 h-5", "aria-hidden": "true", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 17 14" },
                        React.createElement("path", { stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M1 1h15M1 7h15M1 13h15" })))),
            React.createElement("div", { className: "flex md:order-3" }, user ?
                React.createElement(flowbite_react_1.Dropdown, { color: 'bg-neutral-700', label: user.first_name },
                    React.createElement(flowbite_react_1.Dropdown.Header, null,
                        React.createElement("span", { className: "block text-sm " },
                            user.first_name,
                            " ",
                            user.last_name),
                        React.createElement("span", { className: "block truncate text-sm font-medium" }, user.email)),
                    React.createElement(DropdownItem_1.DropdownItem, { icon: hi_1.HiViewGrid, as: react_router_dom_1.Link, to: '/dashboard' }, "Dashboard"),
                    React.createElement(DropdownItem_1.DropdownItem, { icon: bi_1.BiPhotoAlbum, as: react_router_dom_1.Link, to: '/create-album' }, "Create a album"),
                    React.createElement(DropdownItem_1.DropdownItem, { icon: md_1.MdPhotoAlbum, as: react_router_dom_1.Link, to: `/myalbums/${user.id}` }, "My albums"),
                    React.createElement(flowbite_react_1.Dropdown.Divider, null),
                    React.createElement(DropdownItem_1.DropdownItem, { icon: hi_1.HiLogout, onClick: () => dispatch((0, user_1.logoutUser)()) }, "Sign out"))
                :
                    React.createElement("button", { onClick: () => setOpenModal('dismissible'), className: "flex flex-col justify-center items-center " },
                        React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "w-6 h-6" },
                            React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" })),
                        React.createElement("span", { className: " font-medium" }, "Login"))),
            React.createElement(LogInModal_1.default, { setOpenModal: setOpenModal, openModal: openModal }))));
};
exports.default = NavBar;
