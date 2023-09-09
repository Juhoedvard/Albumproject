import { useState } from "react"
import ModalComponent from "./ModalComponent"
import { Photo } from "../Features/album"





const PhotoComponent = ({photo} : {photo: Photo}) => {

    const [openModal, setOpenModal] = useState<string |undefined>()

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

            />
        </div>
    )

}

export default PhotoComponent