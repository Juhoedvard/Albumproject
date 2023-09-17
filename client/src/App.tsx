import React from "react";
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/CredentialsPages/LoginPage';
import RegisterPage from './pages/CredentialsPages/RegisterPage';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';
import EditAlbum from './pages/AlbumPages/EditAlbum';
import { useAppDispatch} from './store';
import { useEffect } from 'react';
import LoadingSpinner from './components/LoadingSpinner';
import ResetPasswordPage from './pages/CredentialsPages/ResetPasswordPage';
import NewPasswordPage from './pages/CredentialsPages/NewPasswordPage';
import CreateAlbum from './pages/AlbumPages/CreateAlbum';
import UserAlbumPage from './pages/AlbumPages/UserAlbumPage';
import UserProfile from './pages/UserProfile';
import MyAlbumsPage from './pages/AlbumPages/MyAlbumsPage';
import ErrorPage from "./pages/ErrorPage";
import { verifyUser } from "./Features/user";
import { getAlbums } from './Features/album';
import { ProtectedRoutes }  from './hooks/AuthContextProvider';


const router = createBrowserRouter(


  createRoutesFromElements(
       <Route  path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<RegisterPage />} />
          <Route path ='reset-password' element={<ResetPasswordPage />} />
          <Route path="new-password/:token" element={<NewPasswordPage />} />
          <Route path="album/:id" element={<UserAlbumPage/>} />
          <Route path="user/:id" element ={<UserProfile/>} />
          <Route path="*" element={<ErrorPage/>}/>
          <Route element={<ProtectedRoutes/>}>
            <Route path="create-album" element={<CreateAlbum />} />
            <Route path="myalbums/:id" element={<MyAlbumsPage/>}/>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path="editAlbum/:id" element={<EditAlbum/>}/>
          </Route>
       </Route>
  )

)

function App() {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(verifyUser())
    dispatch(getAlbums())
  }, [])

  return (
      <RouterProvider
        router={router}
        fallbackElement={<LoadingSpinner loadingText="" />}
      />

  );
}

export default App;
