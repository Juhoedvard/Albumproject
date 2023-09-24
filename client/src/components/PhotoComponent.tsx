import React, { useEffect } from "react";
import { useState } from "react"
import ModalComponent from "./ModalComponent"
import { Photo, getPhotoLikes } from "../Features/photos"
import { useAppDispatch, useAppSelector } from "../store";





const PhotoComponent = ({photo, albumUser} : {photo: Photo, albumUser?: string}) => {

    const [openModal, setOpenModal] = useState<string |undefined>()
    const dispatch = useAppDispatch()
    const [likedUsers, setLikedUsers] = useState<number[]>([])
    const [userLiked, setUserLiked] = useState<boolean>(false)
    const { user } = useAppSelector((state) => state.user)
    useEffect(() => {
        if(photo.id !== undefined && photo.likes !== undefined && photo.likes > 0 && openModal !== undefined ){
          dispatch(getPhotoLikes(photo.id)).then((users) => {
            setLikedUsers(users.payload)
          })   
          }
        }, [openModal, userLiked])

    useEffect(() => {
            if(likedUsers && likedUsers.length > 0  && likedUsers.includes(user.id)){
              setUserLiked(true)
            }
            else{
              setUserLiked(false)
            }
          }, [likedUsers, getPhotoLikes])
      
    return(
        <div>
            <figure  className="relative  max-w-xs transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0 text-transparent hover:text-zinc-300">
                <img onClick={() => setOpenModal('dismissible')} className="rounded-lg" src={photo.photo} alt="thumbnail" />
            <figcaption className=" w-full absolute px-4 bottom-6 text-center ">
                <p>{photo.caption}</p>
            </figcaption>
            </figure>

        <ModalComponent openModal={openModal}
                            setOpenModal={setOpenModal}
                            photo = {photo.photo}
                            caption = {photo.caption}
                            likes = {photo.likes}
                            id = {photo.id}
                            albumUser = {albumUser}
                            userLiked={userLiked}
                            setUserLiked={setUserLiked}

            />
        </div>
    )

}

export default PhotoComponent