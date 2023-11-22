import React, { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import AlbumComponent from "../../components/AlbumComponent"
import { useAppDispatch, useAppSelector } from "../../store"
import {RiDeleteBinLine} from 'react-icons/ri'
import { Button, FileInput, Tooltip } from "flowbite-react";
import AlertModalComponent from "../../components/AlertModalComponent";
import { Photo, removeAlbum } from "../../Features/album";
import { Photos, addPhotos, getAlbumPhotos } from "../../Features/photos";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner"
import EditPhotoComponent from "../../components/EditPhotoComponent";
import {BsArrowLeft} from "react-icons/bs"
import {AiOutlineUpload} from "react-icons/ai"
import {CiCircleRemove} from "react-icons/ci"
import { toast } from "react-toastify";
import CreatePhotoComponent from "../../components/CreatePhotoComponent";

const EditAlbum = () => {

    const {id} = useParams()
    const {albums, loading} = useAppSelector((state) => state.albums)
    const {photos, photosLoading} = useAppSelector((state) =>state.photos)
    const dispatch = useAppDispatch()
    const [confirmRemove, setConfirmRemove] = useState(false)
    const [openModal, setOpenModal] = useState<string |undefined>()
    const [addMore, setAddMore] = useState(false)
    const [photo, setPhoto] = useState<File[]>([]);
    const [selectedPhoto, setSelectedPhoto] = useState<Photo[]>([]);
    const [photosAddedS3, setPhotosAddedS3] = useState<string[]>([])
    const [addPhotosLoading, setAddPhotosLoading] = useState(false)
    const [RemovePhotos, setRemoveThesePhotos] = useState<File[]>([])
    const [photosLoaded, setPhotosLoaded] = useState(false)
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

    useEffect(() => {
        if(id) {
            dispatch(getAlbumPhotos(parseInt(id)))
        }
    }, [id])
    

    const Submit = async () => {
        if(selectedPhoto && id){

            const sendPhoto = selectedPhoto.map((p) => ({
                ...p,
                album: id
              }
              ))
            await dispatch(Photos(sendPhoto))
            setSelectedPhoto([])
            setPhotosAddedS3([])
            setAddMore(!addMore)
            setPhoto([])
            
        }
    }
    const UploadPhotos = (e: ChangeEvent<HTMLInputElement>) => {
        if(photo.length > 2 ){
          toast.info('You can upload only 3 images when creating Album, you can upload more later')
          return
        }
        
        if (e.target.files && e.target.files.length < 4) {
          
          const newPhotos = [...photo];
          for (let i = 0; i < e.target.files.length; i++) {
            if(e.target.files[i].size > 5000000){
              toast.info('Keep you files less than 5MB, please')
            }
            else{
              newPhotos.push(e.target.files[i]);
            }
          }
          setPhoto(newPhotos);

        }
        else{
          toast.info('You can upload max 3 photos now. You will be able to add more photos later')
        }
      }
    const uploadToS3 = () => {
        if (photos) {
            setAddPhotosLoading(true)
            dispatch(addPhotos(photo)).then((photoURLs) => {
                if(photoURLs.meta.requestStatus === "fulfilled" && album !== undefined){
                    setPhotosAddedS3(photoURLs.payload)
                    setAddPhotosLoading(false)
                    setPhotosLoaded(true)
                }
                    
            })
            setAddPhotosLoading(false)
            
          }
    }
    const unuploadFile = (p : File) => {  
        const removeOne = photo.filter((photo) => photo.name !== p.name)
        setPhoto(removeOne)
      }
    
      const Reset = () =>{
        const removeFromS3 = [...photo]
        setRemoveThesePhotos(removeFromS3)
        setPhoto([])
        setAddMore(!addMore)
        setPhotosAddedS3([])
    
      }
    const album = albums && id && albums.find((album) => album?.id.toString() === id)
    
return(
    <>
    {loading ?  <div className="flex justify-center">
            <LoadingSpinner loadingText = { confirmRemove === false ? "Loading album..." : "Removing Album"}/>
        </div>
        :
        <div className="flex flex-col justify-center items-center">
                <div className="flex w-2/3 justify-start">
                    <Tooltip content="Return to previous page" >
                    <BsArrowLeft size={30} onClick={() => navigate(-1)}/>
                    </Tooltip>
                </div>
            <div className="border-b p-4">
                { album &&
                <div className="flex gap-4">
                    <div className="flex">
                        <AlbumComponent album = {album}/>
                    </div>
                    <div className="flex flex-col w-full h-full gap-4 ">
                        <div className="flex">
                        <h1 className="italic text-2xl md:text-4xl font-medium "> {album.title} </h1>
                        <div className="flex w-full justify-end">
                            <Tooltip  content={'remove album'} >
                                <RiDeleteBinLine size={20} onClick={() => setOpenModal('dismissible')}/>
                            </Tooltip>
                        </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <dt>Description: </dt>
                            <dd className="px-2">{album.description}</dd>
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
            <div className="flex flex-col">
                {!addMore && 
                <div className="flex justify-end py-4">
                    <Tooltip content="Add photos">
                    <AiOutlineUpload size={30} onClick={() => setAddMore(!addMore)}/>
                    </Tooltip>
                    </div>}
                {photosLoading && !addMore ?
                    <div> <LoadingSpinner loadingText="Loading photos..."/></div>
                    : !addMore && photos && <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 justify-items-start   ">
                        {photos.map((photo) => {
                            return(
                                <div key={photo.id}>
                                        <EditPhotoComponent photo={photo}/>
                                    </div>
                            )
                        })}
                    </div>}
            </div>
            <br></br>
            </div>}
            {addMore && photosAddedS3.length <1 ?  <div className="flex flex-col justify-center items-center gap-4">
                <br></br>
                <div className="flex justify-center w-1/3 gap-4">
                <Tooltip className="" placement="top" style="light" content={<span>You can get pictures from Unsplash for free. You can only upload 3 pictures, when creating Album <a className="text-blue-500 hover:underline italic" href="https://unsplash.com/" target="_black">https://unsplash.com/</a></span>}>
                      <FileInput onChange={UploadPhotos} id="file" value="" multiple={true}/>
                </Tooltip>
                    <ul>
                        {photo && photo.map((photo, index) => {
                            return(
                                <li className="flex gap-2 items-center" key={index}> {photo.name}  <Tooltip content="Remove photo"><CiCircleRemove size={20} onClick={() => unuploadFile(photo)}/></Tooltip></li>
                            )
                        })}
                    </ul>
                </div> 
            {addPhotosLoading ?<div className="flex justify-center"> <LoadingSpinner loadingText="Adding photos..."/></div> :
            <div className="flex gap-2">
                <Button color="dark" onClick={() => setAddMore(!addMore)}>Cancel</Button>
                <Button color="dark" onClick={uploadToS3}>Preview photos</Button>
            </div>}
                    
            </div> : photosAddedS3 && addMore &&
            <div className="flex flex-col justify-center items-center ">
                <div className="grid grid-cols-3 md:grid-cols-3 m-10 justify-items-start gap-2">
                    {photosAddedS3.map((photo, index) => {
                                                    return(
                                                        <div key={index}>
                                                            <div>
                                                                <CreatePhotoComponent photo={photo}
                                                                                    index={index}
                                                                                    selectedPhoto= {selectedPhoto}
                                                                                    setSelectedPhoto= {setSelectedPhoto}
                                                                                    photosLoaded={photosLoaded}
                                                                            />
                                                            </div>
                                                            <br></br>
                                                        </div>
                                                    )
                                                })}
            </div>
            {photosLoading && addMore ? <LoadingSpinner loadingText="Adding photos..."/> : <div className="flex gap-2">
                    <Button color="dark" onClick={Reset}>Cancel</Button>
                    <Button color="dark" onClick={Submit}>Add photos</Button>
                </div>}
     </div>}
    
    
    </>
)
}

export default EditAlbum