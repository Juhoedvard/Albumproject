import React from "react";
import { Modal } from 'flowbite-react';
import { useEffect, useState } from 'react';
import {FcLike, FcLikePlaceholder} from 'react-icons/fc'
import { useAppDispatch, useAppSelector } from '../store';
import { LikePhoto, getPhotoLikes } from '../Features/album';


/// Tähän joskus joku fiksumpi tapa
const  ModalComponent = ({openModal, setOpenModal, photo, caption, likes, id, albumUser }: {openModal: undefined | string, setOpenModal: Function, photo: string, caption?: string, likes?: number, id?: number, albumUser: string}) =>  {

  const dispatch = useAppDispatch()
  const {isAuthenticated, user } = useAppSelector((state) => state.user)
  const [loaded, setLoaded] = useState(false)
  const [userLiked, setUserLiked] = useState<boolean>(false)
  const [currentLike, setCurrentLike] = useState<number>(likes || 0)
  const ownAlbum = albumUser === user?.id

  ///tarkistetaan onko käyttäjä tykännyt kuvasta
  useEffect(() => {
    if(id !== undefined && likes !== undefined && likes > 0 && !loaded){
      dispatch(getPhotoLikes(id)).then((users)=>{
        setLoaded(true)
        if(users.payload && user){
          setCurrentLike(users.payload.length)
          const likedUsers = users.payload
          const checklikes = likedUsers.includes(user.id)
          setUserLiked(checklikes)
        }
      })
   }
  }, [dispatch, loaded, user])


  ///Kuvan tykkäys
  const likePhoto =  (id: number, event: React.MouseEvent<HTMLButtonElement> ) => {
    event.preventDefault()
    dispatch(LikePhoto(id)).then(() => {
      setCurrentLike((prevLike) => (userLiked ? Math.max(prevLike - 1, 0) : prevLike + 1));
      setUserLiked(!userLiked)
    }).catch((err) =>{
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
          <div className='flex  w-full justify-center items-center gap-1'>
          <span className='text-black text-sm '> {currentLike} </span>
         {id && isAuthenticated && !ownAlbum ? <button disabled={userLiked === true ||loaded === false} onClick={(event) => likePhoto(id, event)}>
           {userLiked ? <FcLike/> : <FcLikePlaceholder/>}
          </button> :    <span className='text-black text-sm'>likes</span>}
          </div>
        </Modal.Footer>
      </Modal>

  )
}

export default ModalComponent