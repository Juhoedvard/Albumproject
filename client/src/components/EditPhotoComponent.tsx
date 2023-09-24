import React, { useState } from "react"
import { Photo } from "../Features/photos"
import {AiFillEdit} from "react-icons/ai"
import { Tooltip } from "flowbite-react"
import EditPhotoModal from "./EditPhotoModal"


interface EditPhotoComponentProps {
    photo: Photo
  }
  
  const EditPhotoComponent: React.FC<EditPhotoComponentProps> = ({
      photo,

  }) => {
    console.log(photo)
    const [openEditModal, setOpenEditModal] = useState<string |undefined>()
    return(
        <div>
             <figure className= 'relative max-w-xs  filter grayscale text-transparent hover:text-zinc-300'>
                <img className="rounded-lg" src={photo.photo} alt="thumbnail" />
                <figcaption className="w-full absolute px-4 bottom-6 text-center">
                 <p>{photo.caption}</p>
                </figcaption>
              
                <figcaption className="w-full absolute px-4 top-2 text-right">
                    <button type="button" onClick={() => setOpenEditModal('dismissible')}>
                        <Tooltip content="Edit photo" placement="top">
                             <AiFillEdit size={20} />
                         </Tooltip>
                    </button> 
                </figcaption>
            </figure>
            {photo.id && <EditPhotoModal openEditModal={openEditModal}
                            setOpenEditModal={setOpenEditModal}
                            photo={photo.photo}
                            caption={photo.caption}
                            id={photo.id}
                            />}
        </div>
    )
  }


export default EditPhotoComponent