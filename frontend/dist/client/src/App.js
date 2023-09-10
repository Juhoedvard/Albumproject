"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const HomePage_1 = __importDefault(require("./pages/HomePage"));
const LoginPage_1 = __importDefault(require("./pages/CredentialsPages/LoginPage"));
const RegisterPage_1 = __importDefault(require("./pages/CredentialsPages/RegisterPage"));
const Dashboard_1 = __importDefault(require("./pages/Dashboard"));
const Layout_1 = __importDefault(require("./components/Layout"));
const EditAlbum_1 = __importDefault(require("./pages/AlbumPages/EditAlbum"));
const store_1 = require("./store");
const react_2 = require("react");
const user_1 = require("./Features/user");
const LoadingSpinner_1 = __importDefault(require("./components/LoadingSpinner"));
const ResetPasswordPage_1 = __importDefault(require("./pages/CredentialsPages/ResetPasswordPage"));
const NewPasswordPage_1 = __importDefault(require("./pages/CredentialsPages/NewPasswordPage"));
const CreateAlbum_1 = __importDefault(require("./pages/AlbumPages/CreateAlbum"));
const UserAlbumPage_1 = __importDefault(require("./pages/AlbumPages/UserAlbumPage"));
const UserProfile_1 = __importDefault(require("./pages/UserProfile"));
const MyAlbumsPage_1 = __importDefault(require("./pages/AlbumPages/MyAlbumsPage"));
const album_1 = require("./Features/album");
const AuthContextProvider_1 = require("./hooks/AuthContextProvider");
const router = (0, react_router_dom_1.createBrowserRouter)((0, react_router_dom_1.createRoutesFromElements)(react_1.default.createElement(react_router_dom_1.Route, { path: '/', element: react_1.default.createElement(Layout_1.default, null) },
    react_1.default.createElement(react_router_dom_1.Route, { index: true, element: react_1.default.createElement(HomePage_1.default, null) }),
    react_1.default.createElement(react_router_dom_1.Route, { path: 'login', element: react_1.default.createElement(LoginPage_1.default, null) }),
    react_1.default.createElement(react_router_dom_1.Route, { path: 'register', element: react_1.default.createElement(RegisterPage_1.default, null) }),
    react_1.default.createElement(react_router_dom_1.Route, { path: 'reset-password', element: react_1.default.createElement(ResetPasswordPage_1.default, null) }),
    react_1.default.createElement(react_router_dom_1.Route, { path: "new-password/:token", element: react_1.default.createElement(NewPasswordPage_1.default, null) }),
    react_1.default.createElement(react_router_dom_1.Route, { path: "album/:id", element: react_1.default.createElement(UserAlbumPage_1.default, null) }),
    react_1.default.createElement(react_router_dom_1.Route, { path: "user/:id", element: react_1.default.createElement(UserProfile_1.default, null) }),
    react_1.default.createElement(react_router_dom_1.Route, { element: react_1.default.createElement(AuthContextProvider_1.ProtectedRoutes, null) },
        react_1.default.createElement(react_router_dom_1.Route, { path: "create-album", element: react_1.default.createElement(CreateAlbum_1.default, null) }),
        react_1.default.createElement(react_router_dom_1.Route, { path: "myalbums/:id", element: react_1.default.createElement(MyAlbumsPage_1.default, null) }),
        react_1.default.createElement(react_router_dom_1.Route, { path: 'dashboard', element: react_1.default.createElement(Dashboard_1.default, null) }),
        react_1.default.createElement(react_router_dom_1.Route, { path: "editAlbum/:id", element: react_1.default.createElement(EditAlbum_1.default, null) })))));
function App() {
    const dispatch = (0, store_1.useAppDispatch)();
    (0, react_2.useEffect)(() => {
        dispatch((0, user_1.verifyUser)());
        dispatch((0, user_1.getUser)());
        dispatch((0, album_1.getAlbums)());
    }, []);
    return (react_1.default.createElement(react_router_dom_1.RouterProvider, { router: router, fallbackElement: react_1.default.createElement(LoadingSpinner_1.default, null) }));
}
exports.default = App;
