import React from "react";
import { Button, FileInput, Label, Textarea, Tooltip } from "flowbite-react";
import { ChangeEvent, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Album, addThumbnail, createAlbum } from "../../Features/album";
import { Photos, addPhotos, removePhoto } from "../../Features/photos";
import { useAppDispatch } from "../../store";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type { Photo } from "../../Features/album";
import CreatePhotoComponent from "../../components/CreatePhotoComponent";
import LoadingSpinner from "../../components/LoadingSpinner";
import {CiCircleRemove} from "react-icons/ci"

const CreateAlbum = () => {
  const {
    register,
    handleSubmit,
    watch,
  } = useForm<Album>();
  const title = watch('title');
  const description = watch('description');
  const navigate = useNavigate();
  const [thumbnail, setThumbnail] = useState<File>();
  const [photos, setPhotos] = useState<File[]>([]);
  const [addedPhotos, setAddedPhotos] = useState<string[]>([]);
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo[]>([]);
  const [photosLoaded, setPhotosLoaded] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [removeThesePhotos, setRemoveThesePhotos] = useState<string[]>([])
  const [preview, setPreview] = useState<boolean>(false)

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<Album> = async (data) => {
    if (thumbnail && selectedPhoto) {
      setLoading(true)
      await dispatch(createAlbum({ ...data, thumbnail: thumbnailUrl})).then(({payload}) => {
        const sendPhoto = selectedPhoto.map((p) => ({
          ...p,
          album: payload.id
        }
        ))
        dispatch(Photos(sendPhoto))
      })

      if(removeThesePhotos.length > 0)
      {
          await dispatch(removePhoto(removeThesePhotos))
      }
      setLoading(false)
      navigate('/');
    } else {
      toast.info('Add a thumbnail for your album');
      setLoading(false)
    }
  };

  const UploadThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0].size < 5000000) {
      setThumbnail(e.target.files[0]);
    }
    else{
      toast.info('Keep your files less than 5MB, please')
    }
  };

  const UploadPhotos = (e: ChangeEvent<HTMLInputElement>) => {
    if(photos.length > 2 ){
      toast.info('You can upload only 3 images when creating Album, you can upload more later')
      return
    }
    
    if (e.target.files && e.target.files.length < 4) {
      
      const newPhotos = [...photos];
      for (let i = 0; i < e.target.files.length; i++) {
        if(e.target.files[i].size > 5000000){
          toast.info('Keep you files less than 5MB, please')
        }
        else{
          newPhotos.push(e.target.files[i]);
        }
      }
      setPhotos(newPhotos);
    }
    else{
      toast.info('You can upload max 3 photos now. You will be able to add more photos later')
    }
  };

  const uploadSelectedPhotos = () => {
    setLoading(true)

    if (thumbnail && title) {
      dispatch(addThumbnail(thumbnail))
        .then((add) => {
          setThumbnailUrl(add.payload);
        })
        .catch((error) => {
          setLoading(false)
          throw Error(error)
        });
      if (photos) {
        dispatch(addPhotos(photos))
          .then((add) => {
            setAddedPhotos(add.payload);
            setPhotosLoaded(true)
          })
          .catch((error) => {
            setLoading(false)
              throw Error(error)
          });
      }
      setLoading(false)
      setPreview(true)
    } else {
      toast.error(!thumbnail ? 'Add a thumbnail' : !title && 'Add title to your album');
      setLoading(false)
    }

    
  };
  const SendPhotosAgain = () =>{

  }

  const CutPhoto = async (photo: string) => {
    const cutPhotos = [...removeThesePhotos]
    cutPhotos.push(photo)
    setRemoveThesePhotos(cutPhotos)
    const updatedPhotos = addedPhotos.filter((p) => p !== photo);
    setAddedPhotos(updatedPhotos);
    const updatedPhotoFiles = photos.filter((p) => p.name !== photo);
    setPhotos(updatedPhotoFiles);
    const newSelectedPhotos = selectedPhoto.filter((p) => p.photo !== photo)
    setSelectedPhoto(newSelectedPhotos)

  };
  const Reset = () =>{
    const removeFromS3 = [...addedPhotos]
    removeFromS3.push(thumbnailUrl)
    setRemoveThesePhotos(removeFromS3)
    setThumbnailUrl('')
    setAddedPhotos([])
    setLoading(false)
    setPreview(false)

  }
  const removePhotosS3 = async () => {
    if(removeThesePhotos.length > 0){
      setLoading(true)
      await dispatch(removePhoto(removeThesePhotos))
      setLoading(false)
      navigate('/')
    }
  }
  const unuploadFile = (p : File) => {  
    const removeOne = photos.filter((photo) => photo.name !== p.name)
    setPhotos(removeOne)
  }

    return(
            <main className="flex flex-col items-center justify-center gap-4 py-5 ">
              <h1 className="text-4xl lg:text-6xl font-medium italic">Create Album</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center gap-4 pt-4 w-full">

             { addedPhotos.length < 1 &&  <div className={`flex flex-col  pr-5 justify-center items-center  gap-4`}>
                    <div className="">
                    <div className="relative z-0 w-full mb-6 group">
                        <label  htmlFor="floating_title" className="block mb-2 text-sm font-medium text-white  dark:text-white">Album title</label>
                        <input {...register("title", {required:true})} type="text"  id="floating_title" className="bg-gray-50 border text-black border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Title " required />
                    </div>
                    <div className="max-w-md" id="textarea">
                        <div className="mb-2 block">
                            <Label
                                htmlFor="comment"
                                value="Description:"
                                color={'text-white'}
                            />
                        </div>
                    </div>
                        <Textarea {...register("description", {required:true})} rows={6} id="floating_title"   placeholder="Description " required  />
                        <Tooltip placement="top" style="light" content={<span>You can get pictures from Unsplash for free <a className="text-blue-500 hover:underline italic" href="https://unsplash.com/" target="_black">https://unsplash.com/</a></span>}
                            className="max-w-md"
                            id="fileUpload"
                            >
                            <div className="mb-2 block">
                                <Label
                                htmlFor="file"
                                value={thumbnail?.name ||"Upload file"}
                                color={'white'}
                                />
                            </div>
                            <FileInput
                                helperText="Upload you cover thumbnail"
                                id="file"
                                onChange={UploadThumbnail}
                                draggable={"true"}
                                max={"5000000"}
                                value={''}
                            />
                        </Tooltip>
                    <br></br>
                    <div className="flex flex-col gap-4">
                      <Tooltip placement="top" style="light" content={<span>You can get pictures from Unsplash for free. You can only upload 3 pictures, when creating Album <a className="text-blue-500 hover:underline italic" href="https://unsplash.com/" target="_black">https://unsplash.com/</a></span>}>
                        <div className="mb-2 block">
                            <Label
                            htmlFor="file"
                            value="Upload photos to your album"
                            color={'white'}
                            />
                          </div>
                        <FileInput
                              helperText="Upload you album photos"
                              id="file"
                              multiple
                              draggable={true}
                              max={"5000000"}
                              onChange={UploadPhotos}
                              value={''}   
                          />
                        </Tooltip>
                        <p>Added photos:</p>
                        {photos && (
                            photos.map((p, index) => {
                                return (
                                <div key={index}>
                                    <ul>
                                        <li className="flex gap-2 text-sm">{p.name} <Tooltip content="Remove photo"><CiCircleRemove size={20} onClick={() => unuploadFile(p)}/></Tooltip></li>
                                    </ul>
                                </div>)
                        }))}
                       {loading ? <div>
                        <LoadingSpinner loadingText=""/>
                       </div> :
                       <div className="flex w-full gap-2 justify-center">
                            <button type='button' onClick={removePhotosS3}className="w-1/3 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Cancel</button>
                            <button type='button' onClick={uploadSelectedPhotos} className="w-1/3 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Preview</button>
                        </div>}
                    </div>
                  </div>
                </div>}


              {preview &&
              <div className="flex flex-col items-center p-6">
                    <div className="flex justify-center gap-4">
                      <div className="border-b pb-4" >
                         <figure className="relative max-w-xs transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0 text-transparent hover:text-zinc-300">
                                <img className="rounded-lg" src={thumbnailUrl} alt="thumbnail" />
                        </figure>
                      </div>

                      <div className="flex flex-col gap-4">
                          <div className="flex ">
                            <h1 className="italic text-3xl font-medium ">{title}</h1>
                          </div>
                          <div className="flex flex-col gap-4">
                              <dt>Description: </dt>
                              <dd className="pl-2"> {description}</dd>
                          </div>
                      </div>
                    
                       
                    </div>
                        <div>
                            {addedPhotos === undefined ?
                            <div className="flex flex-col w-full justify-center items-center">
                              <span>Something went wrong uploading photos, please try again</span>
                              <Button color="light" onClick={SendPhotosAgain}>Try again</Button>
                            </div> : addedPhotos.length > 0 &&  (
                                <div className="grid grid-cols-1 md:grid-cols-3 justify-items-start pt-4">
                                    {addedPhotos.map((photo, index) => {
                                        return(
                                            <div key={index} className="flex flex-col w-80 pt-4 items-center ">
                                                <div>
                                                    <CreatePhotoComponent photo={photo}
                                                        CutPhoto={CutPhoto}
                                                        selectedPhoto= {selectedPhoto}
                                                        setSelectedPhoto= {setSelectedPhoto}
                                                        photosLoaded={photosLoaded}
                                                        index={index}
                                                                />
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                        <br></br>
                      {loading?
                         <div>
                              <LoadingSpinner loadingText="Creating album..."/>
                        </div>:
                         <div className="flex justify-center ">
                           <button type="button" onClick={Reset} className=" text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Cancel</button>
                           <button type="submit" className=" text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Add album</button>
                        </div>}
             </div>}
            </form>
        </main>
    )
}

export default CreateAlbum;