import { getAlbums } from "../Features/album"
import { useAppDispatch } from "../store"
import { Button } from "flowbite-react"



const ErrorAlbums = () => {

    const dispatch = useAppDispatch()


    return(
        <div className="flex flex-col h-screen w-full justify-center items-center gap-2">
            <h1>Something went wrong </h1>
            <div className="flex justify-center items-center">
                <Button color='dark' onClick={() => dispatch(getAlbums())}>Try again!  </Button>
            </div>
        </div>
    )
}

export default ErrorAlbums