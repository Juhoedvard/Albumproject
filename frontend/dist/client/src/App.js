"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const HomePage_1 = __importDefault(require("./pages/HomePage"));
const LoginPage_1 = __importDefault(require("./pages/CredentialsPages/LoginPage"));
const RegisterPage_1 = __importDefault(require("./pages/CredentialsPages/RegisterPage"));
const Dashboard_1 = __importDefault(require("./pages/Dashboard"));
const Layout_1 = __importDefault(require("./components/Layout"));
const EditAlbum_1 = __importDefault(require("./pages/AlbumPages/EditAlbum"));
const store_1 = require("./store");
const react_1 = require("react");
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
const router = (0, react_router_dom_1.createBrowserRouter)((0, react_router_dom_1.createRoutesFromElements)(React.createElement(react_router_dom_1.Route, { path: '/', element: React.createElement(Layout_1.default, null) },
    React.createElement(react_router_dom_1.Route, { index: true, element: React.createElement(HomePage_1.default, null) }),
    React.createElement(react_router_dom_1.Route, { path: 'login', element: React.createElement(LoginPage_1.default, null) }),
    React.createElement(react_router_dom_1.Route, { path: 'register', element: React.createElement(RegisterPage_1.default, null) }),
    React.createElement(react_router_dom_1.Route, { path: 'reset-password', element: React.createElement(ResetPasswordPage_1.default, null) }),
    React.createElement(react_router_dom_1.Route, { path: "new-password/:token", element: React.createElement(NewPasswordPage_1.default, null) }),
    React.createElement(react_router_dom_1.Route, { path: "album/:id", element: React.createElement(UserAlbumPage_1.default, null) }),
    React.createElement(react_router_dom_1.Route, { path: "user/:id", element: React.createElement(UserProfile_1.default, null) }),
    React.createElement(react_router_dom_1.Route, { element: React.createElement(AuthContextProvider_1.ProtectedRoutes, null) },
        React.createElement(react_router_dom_1.Route, { path: "create-album", element: React.createElement(CreateAlbum_1.default, null) }),
        React.createElement(react_router_dom_1.Route, { path: "myalbums/:id", element: React.createElement(MyAlbumsPage_1.default, null) }),
        React.createElement(react_router_dom_1.Route, { path: 'dashboard', element: React.createElement(Dashboard_1.default, null) }),
        React.createElement(react_router_dom_1.Route, { path: "editAlbum/:id", element: React.createElement(EditAlbum_1.default, null) })))));
function App() {
    const dispatch = (0, store_1.useAppDispatch)();
    (0, react_1.useEffect)(() => {
        dispatch((0, user_1.verifyUser)());
        dispatch((0, album_1.getAlbums)());
    }, []);
    return (React.createElement(react_router_dom_1.RouterProvider, { router: router, fallbackElement: React.createElement(LoadingSpinner_1.default, null) }));
}
exports.default = App;
