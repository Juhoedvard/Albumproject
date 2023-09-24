import { Button } from "flowbite-react"
import React from "react"
import {BiSad} from "react-icons/bi"
import { Link } from "react-router-dom";

const ErrorPage = () => {

    return(
        <div className="flex flex-col h-screen w-full justify-center items-center gap-4">
            <span className="flex gap-2">Something went wrong <BiSad/></span>
            <div>
                <Link to={"/"}><Button size='sm'color="dark">Return to the homepage</Button></Link>
            </div>

        </div>
    )
}

export default ErrorPage