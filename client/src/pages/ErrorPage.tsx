import { Button } from "flowbite-react"
import React from "react"
import {BiSad} from "react-icons/bi"

const ErrorPage = () => {

    return(
        <div className="flex flex-col h-screen w-full justify-center">
            <span>Soomething went wrong <BiSad/></span>
            <div>
                <Button color="light">Return to the homepage</Button>
            </div>

        </div>
    )
}

export default ErrorPage