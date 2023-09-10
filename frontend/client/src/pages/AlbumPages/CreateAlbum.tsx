import { FileInput, Label, Textarea } from "flowbite-react";
import { ChangeEvent, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Album, addPhotos, addThumbnail, createAlbum } from "../../Features/album";
import { useAppDispatch } from "../../store";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type { Photo } from "../../Features/album";
import EditPhotoComponent from "../../components/CreatePhotoComponent";

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

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<Album> = async (data) => {
    if (thumbnail && selectedPhoto) {
      await dispatch(createAlbum({ ...data, thumbnail: thumbnailUrl, photos: selectedPhoto }));
      navigate('/');
    } else {
      toast.info('Add a thumbnail for your album');
    }
  };

  const UploadThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setThumbnail(e.target.files[0]);
    }
  };

  const UploadPhotos = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newPhotos = [...photos];
      for (let i = 0; i < e.target.files.length; i++) {
        newPhotos.push(e.target.files[i]);
      }
      setPhotos(newPhotos);
    }
  };
  const uploadSelectedPhotos = () => {
    if (thumbnail) {
      dispatch(addThumbnail(thumbnail))
        .then((add) => {
          setThumbnailUrl(add.payload);
        })
        .catch((error) => {
          throw Error(error)
        });
      if (photos) {
        dispatch(addPhotos(photos))
          .then((add) => {
            setAddedPhotos(add.payload);
            setPhotosLoaded(true)
          })
          .catch((error) => {
              throw Error(error)
          });
      }
    } else {
      toast.error('Add a thumbnail');
    }
  };

  const removePhoto = (photo: string) => {
    const updatedPhotos = addedPhotos.filter((p) => p !== photo);
    setAddedPhotos(updatedPhotos);
    const updatedPhotoFiles = photos.filter((p) => p.name !== photo);
    setPhotos(updatedPhotoFiles);
  };

    return(
            <main className="flex flex-col items-center justify-center gap-4 py-5 ">
             <br></br>
           {!thumbnailUrl &&  <h1 className="text-2xl font-medium italic">Create Album</h1>}
             <br></br>
             <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center items-center gap-4 w-full">

                <div className={`flex flex-col w-1/3 pr-5 justify-center items-center  gap-4 ${!thumbnailUrl ? "" : "border-r"}`}>
                    <div className="">
                    {thumbnailUrl &&

                     <div>
                         <h1 className="text-2xl font-medium italic">Create Album</h1>
                         <br></br>
                    </div>}
                    <div className="relative z-0 w-full mb-6 group">
                        <input {...register("title", {required:true})} type="text"  id="floating_title" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label  htmlFor="floating_title" className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Album title</label>
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
                        <div
                            className="max-w-md"
                            id="fileUpload"
                            >
                            <div className="mb-2 block">
                                <Label
                                htmlFor="file"
                                value="Upload file"
                                color={'white'}
                                />
                            </div>
                            <FileInput
                                helperText="Upload you cover thumbnail"
                                id="file"
                                onChange={UploadThumbnail}
                            />
                        </div>
                    <div className="flex flex-col gap-4">
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
                            onChange={UploadPhotos}
                        />
                        <p>Added photos:</p>
                        {photos && (
                            photos.map((p, index) => {
                                return (
                                <div key={index}>
                                    <ul>
                                        <li className="text-sm">{p.name}</li>
                                    </ul>
                                </div>)
                        }))}
                        <div className="flex w-full gap-2 justify-center">
                            <button type='button' onClick={() => navigate('/')}className="w-1/3 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Cancel</button>
                            <button type='button' onClick={uploadSelectedPhotos} className="w-1/3 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Preview</button>
                        </div>
                    </div>
                  </div>
                </div>

              {thumbnailUrl  &&
              <div className="flex flex-col w-2/3 h-full">

                    <div className="flex w-full items-center justify-center gap-4">
                        <figure className="relative max-w-xs transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0 text-transparent hover:text-zinc-300">

                                <img className="rounded-lg" src={thumbnailUrl} alt="thumbnail" />
                        </figure>
                        <div className="flex h-full flex-col  gap-4 ">
                        <div className="flex  justify-start items-start">
                           <h1 className="italic text-5xl font-medium ">{title}</h1>
                        </div>
                        <div className="flex flex-col gap-4">
                            <dt>Description: </dt>
                           <dd> {description}</dd>

                        </div>
                    </div>
                    </div>
                        <div>
                            {addedPhotos.length > 0 && (
                                <div className="grid grid-cols-3 md:grid-cols-3 m-10 justify-items-start   ">
                                    {addedPhotos.map((photo, index) => {
                                        return(
                                            <div key={index} className="flex flex-col w-80  items-center ">
                                                <div>
                                                    <EditPhotoComponent photo={photo}
                                                        removePhoto={removePhoto}
                                                        selectedPhoto= {selectedPhoto}
                                                        setSelectedPhoto= {setSelectedPhoto}
                                                        photosLoaded={photosLoaded}
                                                        index={index}
                                                                />
                                                </div>
                                                <br></br>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                        <br></br>
                        <div className="flex justify-center ">
                            <button type="submit" className="w-1/5 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Add album</button>
                        </div>
             </div>}
            </form>
        </main>
    )
}

export default CreateAlbum;