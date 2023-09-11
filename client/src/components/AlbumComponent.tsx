import React from "react";
import { Link } from "react-router-dom"
import type { Album } from "../Features/album"
import { useAppSelector } from "../store"
import {FiEdit} from 'react-icons/fi'


const AlbumComponent = ( {album }: {album : Album})  => {

    const {user} = useAppSelector((state) => state.user)
    let ownAlbums = false
    if(user){
         ownAlbums = user.id === album.user.id
    }


    return(
            <>
            {ownAlbums ?
                  <figure className="relative max-w-sm transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0 text-transparent hover:text-zinc-300">
                  <Link to={`/album/${album.id}`}>
                      <img className="rounded-lg" src={album.thumbnail} alt="thumbnail" />
                  </Link>
                  <figcaption className=" w-full absolute px-4 top-6 text-center ">
                      <p className="mx-auto text-xl">{album.title}</p>
                  </figcaption>
                  <figcaption className="flex w-full absolute px-4 top-6 items-end justify-end ">
                        <Link to={`/editAlbum/${album.id}`}><FiEdit size={30}/></Link>
                  </figcaption>
              </figure>
            :
                  <figure className="relative max-w-sm transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0 text-transparent hover:text-zinc-300">
                <Link to={`/album/${album.id}`}>
                    <img className="rounded-lg" src={album.thumbnail} alt="thumbnail" />
                </Link>
                <figcaption className=" w-full absolute px-4 top-6 text-center ">
                    <p className="mx-auto text-xl">{album.title} </p>
                </figcaption>
            </figure>
            }
            </>



    )


}

export default AlbumComponent