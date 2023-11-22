import React from "react";
import { Link, useParams } from "react-router-dom"
import { useAppSelector } from "../../store"
import LoadingSpinner from "../../components/LoadingSpinner"
import AlbumComponent from "../../components/AlbumComponent"
import { Album } from "../../Features/album"
import {AiOutlineUpload} from 'react-icons/ai'


const MyAlbumsPage = () => {


    const {id} = useParams()

    const {albums, loading} = useAppSelector((state) =>state.albums)
    const {user} = useAppSelector((state) => state.user)
    const myAlbums = albums.filter((album) => album.user.id.toString() === id)


    if(!albums && !loading){
        return(
            <div>Something went wrong fetching data</div>
        )
    }
    return(
        <div className="flex flex-col justify-center items-center pt-4 px-4">
         {user &&
            <div className="flex gap-4" >
                <h1 className="font-extrabold text-xl md:text-3xl italic">
                    {user.first_name} {user.last_name} albums:
                </h1>
                <div >
                  <Link to={'/create-album'} className="flex items-center gap-2"> <AiOutlineUpload/>Add a new album</Link>
                </div>
            </div>
            }
            <br></br>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">{loading ?
                <LoadingSpinner loadingText="Loading albums..."/>
             :
                myAlbums?.map((album : Album, index) => {
                    return(
                        <div key={index}>
                            <AlbumComponent
                                album = {album}
                            />
                        </div>
                    )
                })
           } </div>
        </div>
    )
}


export default MyAlbumsPage