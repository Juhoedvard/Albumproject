import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Modal, Tooltip } from "flowbite-react"
import { useAppDispatch} from "../store"
import LoadingSpinner from "./LoadingSpinner"
import {CiCircleRemove} from "react-icons/ci"
import AlertModalComponent from "./AlertModalComponent";
import { editPhoto, removePhoto, removePhotoFromAlbum } from "../Features/photos";



const EditPhotoModal= ({openEditModal, setOpenEditModal, photo, caption, id} : {openEditModal: undefined | string, setOpenEditModal: Function, photo:string, caption: string, id: number}) => {
    const dispatch = useAppDispatch()
    const [confirmRemove, setConfirmRemove] = useState(false)
    const [openModal, setOPenModal] = useState<string | undefined>(undefined)
    const [loading, setLoading] = useState(false)
    const [newCaption, setNewCaption] = useState('')
    const Submit = async() => {
        
        setLoading(true)
        await dispatch(editPhoto({caption: newCaption, id: id}))
        setLoading(false)
        setOpenEditModal(undefined)
    }
    useEffect(() => {
        const CutPhoto = async () => {
             if(confirmRemove === true){
                setLoading(true)
                const removablePhoto : string[] = [] 
                removablePhoto.push(photo)
                await dispatch(removePhoto(removablePhoto))
                await dispatch(removePhotoFromAlbum(id))
                setLoading(false)
                setConfirmRemove(false)
                setOpenEditModal(undefined)
                }
            else{
                return
            }
        }
        CutPhoto()
    }, [confirmRemove])
    
    
  
    return(

    <Modal  dismissible show={openEditModal === 'dismissible'}  size={'md'}  onClose={() => setOpenEditModal(undefined)}>
        <Modal.Body className="flex flex-col w-full justify-center items-center">
        <div className="flex justify-center  relative z-0  mb-6 group ">
            <input onChange={(e: ChangeEvent<HTMLInputElement> ) => setNewCaption(e.target.value)}type="text" name="floating_caption" id="floating_last_name" className=" block py-2.5 px-0  text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="" required />
            <label htmlFor="floating_caption" className="peer-focus:font-medium absolute text-sm text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Change photo caption</label>
        </div>
        <figure  className="relative  max-w-xs transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0 text-transparent hover:text-zinc-300">
                    <img onClick={() => setOpenEditModal('dismissible')} className="rounded-lg" src={photo} alt="thumbnail" />

                <figcaption className=" w-full absolute px-4 bottom-6 text-center ">
                    <p>{caption}</p>
                </figcaption>
                <figcaption className="w-full absolute px-4 top-2 text-right">
                    <button type="button" onClick={() => setOPenModal('dismissible')}>
                        <Tooltip content="Remove photo from album" placement="left">
                             <CiCircleRemove size={20} />
                         </Tooltip>
                    </button> 
                </figcaption>
                </figure>
        </Modal.Body>
        <Modal.Footer className="flex w-full justify-center">
            {loading ? <LoadingSpinner loadingText="Loading..."/>
            : <>
                <Button color="dark">
                    Cancel
                </Button>
                <Button color="dark" onClick={Submit}>
                    Submit
                </Button>
             </>}
        </Modal.Footer>
        <AlertModalComponent openModal = {openModal}
                             setOpenModal = {setOPenModal}
                             setConfirmRemove = {setConfirmRemove}
                             modalheader="Are you sure you want to remove photo from album?"
                             /> 
    </Modal>

        )

}

export default EditPhotoModal