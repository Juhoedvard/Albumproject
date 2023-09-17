import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import AlbumComponent from "../../components/AlbumComponent"
import { useAppDispatch, useAppSelector } from "../../store"
import {RiDeleteBinLine} from 'react-icons/ri'
import { Tooltip } from "flowbite-react";
import AlertModalComponent from "../../components/AlertModalComponent";
import { removeAlbum } from "../../Features/album";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner"
import EditPhotoComponent from "../../components/EditPhotoComponent";


const EditAlbum = () => {

    const {id} = useParams()
    const {albums, loading} = useAppSelector((state) => state.albums)
    const dispatch = useAppDispatch()
    const [confirmRemove, setConfirmRemove] = useState(false)
    const [openModal, setOpenModal] = useState<string |undefined>()
    const navigate = useNavigate()

    useEffect(() => {
        const AlbumRemove = () =>{
            if(confirmRemove === true && id){
                dispatch(removeAlbum(id)).then(() => {
                    setConfirmRemove(false)
                    navigate('/')
                })
            }
    }
    AlbumRemove()
    }, [confirmRemove])

    if(loading) {
        return(
        <div className="flex h-screen w-full justify-center">
            <LoadingSpinner loadingText = { confirmRemove === false ? "Loading album..." : "Removing Album"}/>
        </div>
        )
    }
    const album = albums.find((album) => album.id.toString() === id)

return(
    <>
    <div className="flex flex-col justify-center items-center">
        <div className="border-b m-2 p-4 w-1/4">
            <br></br>
            { album &&
            <div className="flex gap-4">
                <div className="flex h-full w-full justify-end">
                    <AlbumComponent album = {album}/>
                </div>
                <div className="flex flex-col w-full h-full gap-4 ">

                    <div className="flex">
                       <h1 className="italic text-5xl font-medium "> {album.title} </h1>
                       <div className="flex w-full justify-end">
                        <Tooltip  content={'remove album'} >
                             <RiDeleteBinLine size={20} onClick={() => setOpenModal('dismissible')}/>
                        </Tooltip>
                       </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <dt>Description: </dt>
                        <dd>{album.description}</dd>
                    </div>

                </div>
            </div>
            }
              <AlertModalComponent openModal={openModal}
                            setOpenModal={setOpenModal}
                            setConfirmRemove={setConfirmRemove}
                            modalheader="Are you sure you want to remove album?"

            />
        </div>
    <div className="grid grid-cols-3 md:grid-cols-3 m-10 gap-4 justify-items-start   ">
            {album?.photos.map((photo, index) => {
                return(
                    <div key={index}>
                            <EditPhotoComponent photo={photo}/>
                        </div>
                )
            })}
         </div>
     </div>
    </>
)
}

export default EditAlbum