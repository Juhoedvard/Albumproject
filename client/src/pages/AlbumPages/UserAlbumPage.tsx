import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom"
import { useAppSelector } from "../../store"
import { Album,} from "../../Features/album"
import AlbumComponent from "../../components/AlbumComponent"
import PhotoComponent from "../../components/PhotoComponent"
import LoadingSpinner from "../../components/LoadingSpinner"



/// seuraavaksi kuvien lisääminen ja UserProfile sivun luominen.
type RouteParams = {
    id: string
}

const UserAlbumPage = () =>{

    const {id} = useParams<RouteParams>()
    const navigate = useNavigate()
    const {albums, loading} = useAppSelector((state) => state.albums)
    const album : Album | undefined = albums.find((a) => a.id.toString() === id)
    const photos = album?.photos
    if(!album && !loading) {
        navigate('/')
    }
    if(loading) {
        return (
            <div className="flex h-screen w-full justify-center">
                    <LoadingSpinner loadingText="Loading album..."/>               
            </div>
        )
    }

    return(
        <div className="flex flex-col justify-center items-center">
            <div className="border-b m-2 p-4 w-1/4">
                <br></br>
                { album &&
                <div className="flex gap-4">
                    <div className="flex h-full w-full justify-end">
                        <AlbumComponent album = {album}/>
                    </div>
                    <div className="flex flex-col w-full h-full gap-4 ">
                        <div>
                           <h1 className="italic text-5xl font-medium "> {album.title}</h1>
                        </div>
                        <div className="flex flex-col gap-4">
                            <dt>Description: </dt>
                           <dd> {album.description}</dd>
                           <br></br>
                           <dt>From user: </dt>
                           <Link to={`/user/${album.user.id}`}> <dd className="italic">{album.user.first_name}</dd></Link>
                        </div>
                    </div>
                </div>
              }
            </div>
            <div className="grid grid-cols-3 md:grid-cols-3 gap-10 m-10 ">{photos &&
                photos.map((photo) => {
                    return(
                        <div key={photo.id} className="flex items-center gap-2">
                             <PhotoComponent photo = {photo}
                                             albumUser = {album.user.id}/>
                        </div>)}) 
                    }
                     
             </div>
        </div>
    )
}

export default UserAlbumPage