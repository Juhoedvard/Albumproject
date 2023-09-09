"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const client_1 = __importDefault(require("react-dom/client"));
const App_1 = __importDefault(require("./App"));
const reportWebVitals_1 = __importDefault(require("./reportWebVitals"));
require("./index.css");
require("flowbite");
const react_redux_1 = require("react-redux");
const store_1 = __importDefault(require("./store"));
const react_toastify_1 = require("react-toastify");
require("react-toastify/dist/ReactToastify.css");
const root = client_1.default.createRoot(document.getElementById('root'));
root.render(react_1.default.createElement(react_1.default.StrictMode, null,
    react_1.default.createElement(react_redux_1.Provider, { store: store_1.default },
        react_1.default.createElement(react_toastify_1.ToastContainer, { position: "bottom-center", autoClose: 2000, hideProgressBar: true, newestOnTop: true, closeOnClick: true }),
        react_1.default.createElement(App_1.default, null))));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
(0, reportWebVitals_1.default)();
