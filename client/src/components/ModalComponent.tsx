import React from "react";
import { Modal } from 'flowbite-react';
import {  useState } from 'react';
import {FcLike, FcLikePlaceholder} from 'react-icons/fc'
import { useAppDispatch, useAppSelector } from '../store';
import { LikePhoto, } from '../Features/photos';
import LoadingSpinner from "./LoadingSpinner";


/// Tähän joskus joku fiksumpi tapa
const  ModalComponent = ({openModal, setOpenModal, photo, caption, likes, id, albumUser, userLiked, setUserLiked }: {openModal: undefined | string, setOpenModal: Function, photo: string, caption?: string, likes?: number, id?: number, albumUser?: string, userLiked: boolean | undefined, setUserLiked: Function}) =>  {

  const dispatch = useAppDispatch()
  const {isAuthenticated, user } = useAppSelector((state) => state.user)
  const [currentLike, setCurrentLike] = useState<number>(likes || 0)
  const [likeLoading, setLikeLoading] = useState(false)
  const ownAlbum = albumUser === user?.id

  ///tarkistetaan onko käyttäjä tykännyt kuvasta
 
  ///Kuvan tykkäys
  const likePhoto =  (id: number, event: React.MouseEvent<HTMLButtonElement> ) => {
    event.preventDefault()
    setLikeLoading(true)
    setUserLiked(!userLiked)
    dispatch(LikePhoto(id)).then(() => {
      setCurrentLike((prevLike) => (userLiked ? Math.max(prevLike - 1, 0) : prevLike + 1));
      setLikeLoading(false)

    }).catch((err) =>{
      setUserLiked(!userLiked)
      setLikeLoading(false)
      throw Error(err)
    })
    }

  return (
      <Modal  dismissible show={openModal === 'dismissible'}  size={'md'}  onClose={() => setOpenModal(undefined)}>
      <Modal.Header  >{caption}</Modal.Header>
        <Modal.Body >
        <figure className="flex flex-growrelative text-transparent hover:text-zinc-300">
            <img className="rounded-lg" src={photo} alt="thumbnail" />
        </figure>
        </Modal.Body>
        <Modal.Footer >
         {likeLoading ? <div className="flex w-full justify-center"><LoadingSpinner loadingText=""/></div> : <div className='flex  w-full justify-center items-center gap-1'>
          <span className='text-black text-sm '> {currentLike} </span>
         {id && isAuthenticated && !ownAlbum ? <button  onClick={(event) => likePhoto(id, event)}>
           {userLiked ? <FcLike/> : <FcLikePlaceholder/>}
          </button> :  <span className='text-black text-sm'>likes</span>}
          </div>}
        </Modal.Footer>
      </Modal>

  )
}

export default ModalComponent