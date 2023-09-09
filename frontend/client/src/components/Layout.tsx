
import { Outlet } from "react-router-dom"
import NavBar from "./Navbar"
import { SearchProvider } from "../hooks/SearchContextProvider"
const Layout = () => {

    return(
        <>
        <SearchProvider>
            <NavBar />
            <br></br>
            <main className="grid min-h-full w-full mx-auto">
                <Outlet />
            </main>
        </SearchProvider>
        </>
    )
}


export default Layout