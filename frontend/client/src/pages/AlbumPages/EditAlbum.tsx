import React from "react";
import { useParams } from "react-router-dom"
import AlbumComponent from "../../components/AlbumComponent"
import { useAppSelector } from "../../store"
import EditPhotoComponent from "../../components/CreatePhotoComponent"



const EditAlbum = () => {

    const {id} = useParams()
    const {albums} = useAppSelector((state) => state.albums)
    const album = albums.find((album) => album.id.toString() === id)
    const editPhoto = (photo: string) => {

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
                    <div className="flex flex-col gap-2">
                        <dt>Description: </dt>
                        <dd>{album.description}</dd>
                    </div>

                </div>
            </div>
            }
        </div>
    <div className="grid grid-cols-3 md:grid-cols-3 m-10 gap-4 justify-items-start   ">
            {album?.photos.map((photo, index) => {
                return(
                    <div key={index}>

                        </div>


                )
            })}
     </div>
    </div>
)
}

export default EditAlbum