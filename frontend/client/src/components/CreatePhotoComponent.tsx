import React from "react";
import { CiCircleRemove } from 'react-icons/ci';
import { ChangeEvent, useState } from 'react';
import { Photo } from '../Features/album';
import { toast } from 'react-toastify';


interface EditPhotoComponentProps {
  photo: string;
  removePhoto?: Function;
  photosLoaded?: boolean
  index: number,
  selectedPhoto: Photo[],
  setSelectedPhoto: Function

}

const EditPhotoComponent: React.FC<EditPhotoComponentProps> = ({
    photo,
    removePhoto,
    photosLoaded,
    index,
    selectedPhoto,
    setSelectedPhoto

}) => {

  const [isSelected, setIsSelected] = useState(false)
  const [caption, setCaption] =  useState<string[]>([]);
  const [selectedPhotoIndexes, setSelectedPhotoIndexes] = useState<{ [key: string]: boolean }>({});
  const [selectedPhotoEffects, setSelectedPhotoEffects] = useState<{ [key: string]: boolean }>({});


  const finalPhoto = (photo: string) => {
    if (!caption) {
      return toast.error('Set caption for photo');
    }
    const temporaryPhoto: Photo = {
      caption: caption[index],
      photo: photo,
      albumID: '',
    };
    const isSelected = selectedPhotoIndexes[photo];

    let newSelectedPhotos: Photo[] = [...selectedPhoto]
    if(isSelected) {
        newSelectedPhotos = newSelectedPhotos.filter((selected) => selected.photo !== photo )
    }
    else{
        newSelectedPhotos.push(temporaryPhoto)
    }
    setSelectedPhoto(newSelectedPhotos);

    setSelectedPhotoEffects({ ...selectedPhotoEffects, [photo]: !isSelected });

  };

  const handleCaptionChange = (index: number, value: string) => {
    const newCaptions = [...caption];
    newCaptions[index] = value;
    setCaption(newCaptions);
  };



  const toggleSelected = () => {
    setIsSelected(!isSelected);
    if (setSelectedPhotoEffects) {
      setSelectedPhotoEffects((prevSelectedPhotoEffects) => ({
        ...prevSelectedPhotoEffects,
        [photo]: !isSelected,
      }));
    }
    if(finalPhoto && !isSelected && index !== undefined){
        finalPhoto(photo)
    }
  };

  return (
    <div>
          <div className="flex justify-center  relative z-0  mb-6 group ">
            <input onChange={(e: ChangeEvent<HTMLInputElement> ) => handleCaptionChange(index, e.target.value)}type="text" name="floating_caption" id="floating_last_name" className=" w-2/3 block py-2.5 px-0  text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="floating_caption" className="peer-focus:font-medium absolute text-sm text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Add photo caption</label>
        </div>
      <figure
        className={
          isSelected
            ? 'relative max-w-xs transition ease-in-out scale-105 delay-100 translate-y-1'
            : 'relative max-w-xs  filter grayscale text-transparent hover:text-zinc-300'
        }
      >
        <img className="rounded-lg" src={photo} alt="thumbnail" />
        <figcaption className="w-full absolute px-4 bottom-6 text-center">
          {caption && <p>{caption}</p>}
        </figcaption>
        {removePhoto && (
          <figcaption className="w-full absolute px-4 top-2 text-right">
            <button type="button" onClick={() => removePhoto(photo)}>
              <CiCircleRemove size={30} />
            </button>
          </figcaption>
        )}
      </figure>
      <br></br>
      <div className='flex w-full justify-center items-center'>
        {photosLoaded && (
          <button
            type="button"
            onClick={toggleSelected}
            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            {!isSelected ? 'Add photo' : 'Remove photo'}
          </button>
        )}
      </div>
    </div>
  );
};

export default EditPhotoComponent;