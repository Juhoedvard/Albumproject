import React from "react";
import { Outlet } from "react-router-dom"
import NavBar from "./Navbar"
import { SearchProvider } from "../hooks/SearchContextProvider"
const Layout = () => {

    return(
        <>
        <SearchProvider>
            <NavBar />
            <main className="grid min-h-full w-full mx-auto z-10 py-4">
                <Outlet />
            </main>
        </SearchProvider>
        </>
    )
}


export default Layout