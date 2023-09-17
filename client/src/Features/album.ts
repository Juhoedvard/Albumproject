import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { User } from './user';
import { toast } from 'react-toastify';



 export type Album = {
    title: string;
    description: string;
    thumbnail: string;
    id: number,
    photos: Photo[]
    user: User,
    likes?: number
}

export type Photo = {
  caption: string,
  photo: string,
  album: string,
  likes?: number,
  id?: number,
  likedUsers? : User[]

}
export type AlbumState = {
    albums: Album[],
    albumphotos: Photo[],
    loading: boolean
}

let baserUrl : string | undefined= ''

if(process.env.REACT_APP_NODE_ENV === 'development'){
  baserUrl = process.env.REACT_APP_API_URL
}
else{
  baserUrl = process.env.REACT_APP_PRODUCTION_URL
}

///Add albumcover to s3 bucket
export const addThumbnail = createAsyncThunk(
  'album/add-thumbnail-s3',
  async( thumbnail : File, thunkAPI) => {
    const formData = new FormData()
    formData.append('thumbnail', thumbnail)
    try {
      const res = await fetch(`${baserUrl}/api/album/add-thumbnail-s3`, {
          method: 'POST',
          headers: {
            Accept: 'multipart/form-data',
          },
          credentials: 'include',
          body: formData,

        })
        const data = await res.json()
        if(res.status === 200){
          return data
        }
        else {
          return thunkAPI.rejectWithValue(data)
        }
    }
    catch(error: any | typeof Error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }

)
///Add album's photos to s3 bucket
export const addPhotos = createAsyncThunk(
  'album/add-photos-s3', async( images: File[], thunkAPI) => {
    const formData = new FormData()
    console.log(images)
    for (let i = 0; i <images.length; i++){
      formData.append(`photo`, images[i])
    }
    try {
      const res = await fetch(`${baserUrl}/api/album/add-photos-s3`, {
          method: 'POST',
          headers: {
            Accept: 'multipart/form-data',
          },
          credentials: 'include',
          body: formData,

        })
        const data = await res.json()

        if(res.status === 200){
          console.log(data)
          return data
        }
        else {
          console.log(thunkAPI.rejectWithValue(data))
          return thunkAPI.rejectWithValue(data)
        }
    }
    catch(error: any | typeof Error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }

  }
)
/// Album removal
export const removeAlbum = createAsyncThunk(
  'api/album/remove-album', async (albumID: string, thunkAPI) => {
    try{
      const res = await fetch(`${baserUrl}/api/album/removealbum?albumID=${albumID}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
        },
        credentials:'include',
      })
      const data = await res.json()
      if(res.status === 200) {
        return data
      }
      else{
        return thunkAPI.rejectWithValue(data)
      }
    }
    catch(error) {

    }
  }
)
///Single photo removal from album
export const removePhotoFromAlbum = createAsyncThunk(
  'api/album/remove-photo-album', async(id:number, thunkAPI) =>{
    try{
      const res = await fetch(`${baserUrl}/api/album/remove-photo-album?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include',

      })
      const data = await res.json()

      if(res.status === 200){
        return data
      }
    }
    catch(error: any | typeof Error){
      return thunkAPI.rejectWithValue(error.response.data)
    }

  }
)
///Single or multiple photos removal from S3 bucket
export const removePhoto = createAsyncThunk(
  '/api/album/remove-photo-s3', async (photoURLs: string[], thunkAPI) => {
    
    try {
      const res = await fetch(`${baserUrl}/api/album/remove-photo-s3`, {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({photoURLs: photoURLs})

        })
        const data = await res.json()

        if(res.status === 200){
          return data
        }
        else {
          return thunkAPI.rejectWithValue(data)
        }
    }
    catch(error: any | typeof Error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

///Like photo
export const LikePhoto = createAsyncThunk(
  'album/likephoto', async (id: number, thunkAPI ) => {
    const body = JSON.stringify({id : id})
    try{
      const res = await fetch(`${baserUrl}/api/album/likephoto`,{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body,

      })
      const data = await res.json()
          if(res.status === 200){
            const { dispatch} = thunkAPI
            dispatch(getAlbums())
            return data
          }
          else {
            return thunkAPI.rejectWithValue((data))
          }
      }
      catch(error: any | typeof Error) {
        return thunkAPI.rejectWithValue(error.response.data)
      }
    })

///Create album
export const createAlbum = createAsyncThunk(
    'album/create-album',
    async ({title, description, thumbnail, photos} : Album,  thunkAPI) => {
        const body = JSON.stringify({title: title, description: description, thumbnail: thumbnail})
      try {
        const res = await fetch(`${baserUrl}/api/album/create-album`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            credentials: 'include',
            body,

          })
          const data = await res.json()
          if(res.status === 201){
            const { dispatch} = thunkAPI
            const sendPhotos = photos.map((p) => ({
              ...p,
              albumID: data.id
            }
            ))
            await dispatch(Photos(sendPhotos))
            await dispatch(getAlbums())
            return data
          }
          else {
            return thunkAPI.rejectWithValue(data)
          }
      }
      catch(error: any | typeof Error) {
        return thunkAPI.rejectWithValue(error.response.data)
      }
    }
)
///Add photos to album
export const Photos = createAsyncThunk(
  'album/photos',
  async (photos: Photo[],  thunkAPI) => {
      const body = JSON.stringify(photos)
    try {
      const res = await fetch(`${baserUrl}/api/album/add-photos`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body,

        })
        const data = await res.json()
        if(res.status === 20){
          return data
        }
        else {
          return thunkAPI.rejectWithValue(data)
        }
    }
    catch(error: any | typeof Error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
///Edit photo
export const editPhoto = createAsyncThunk(
'api/album/editPhoto', async({caption, id}: {caption: string, id:number}, thunkAPI) => {
    try{
      const res = await fetch(`${baserUrl}/api/album/editPhoto`, {
        method: 'PUT',
        headers: {
          Accepts: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({caption: caption, id:id}),
        credentials:'include',
      })
      const data = await res.json()

      if(res.status=== 200){
        return data
      }
    }
    catch(err:  any | typeof Error){
      return thunkAPI.rejectWithValue(err.request.data)

    }
})
///Get albums from database (includes photos)
export const getAlbums = createAsyncThunk(
  'api/album/albums',
  async (_, thunkAPI) => {
    try{
      const res = await fetch(`${baserUrl}/api/album/albums`, {
        method: 'GET',
        headers: {
          Accepts: 'application/json',
        },
        credentials:'include',


    })
    const data = await res.json()
    if(res.status === 200) {
      return data
    }
    else{
      (thunkAPI.rejectWithValue(data))
      return thunkAPI.rejectWithValue(data)
    }
    }
    catch(err: any | typeof Error){
      (thunkAPI.rejectWithValue(err.response.data))
      return thunkAPI.rejectWithValue(err.response.data)
    }
   })

///Get users who liked photos
export const getPhotoLikes = createAsyncThunk(
  'api/album/getPhotoLikes',
  async (id: number, thunkAPI) => {
    try{
      const res = await fetch(`${baserUrl}/api/album/getPhotoLikes?id=${id}`, {
        method: 'GET',
        headers: {
          Accepts: 'application/json',
        },
        credentials: 'include'
    })
    const data = await res.json()
    if(res.status === 200) {
      return data
    }
    else{
      (thunkAPI.rejectWithValue(data))
      return thunkAPI.rejectWithValue(data)
    }
    }
    catch(err: any | typeof Error){
      (thunkAPI.rejectWithValue(err.response.data))
      return thunkAPI.rejectWithValue(err.response.data)
    }
   })

const initialState : AlbumState = {
    albums: [],
    albumphotos : [],
    loading : false

}

export const AlbumSlice = createSlice({
    name: 'Album',
    initialState,
    reducers: {

    },
    extraReducers: builder => {

    builder
    ///Album cases: 
    .addCase(createAlbum.pending, (state) => {
        state.loading = true
    })
    .addCase(createAlbum.fulfilled, (state) => {
        toast.success('Album created!')
        state.loading = false
    })
    .addCase(createAlbum.rejected, (state,action) => {
        state.loading = false
    })
    .addCase(addThumbnail.pending, (state) => {
      state.loading = true
    })
    .addCase(addThumbnail.fulfilled, (state) => {
      state.loading = false
    })
    .addCase(addThumbnail.rejected, (state) => {
        state.loading = false
    })
    .addCase(getAlbums.pending, (state) => {
      state.loading = true
    })
    .addCase(getAlbums.fulfilled, (state, action) => {
        state.albums = action.payload
        state.loading = false
    })
    .addCase(getAlbums.rejected, (state) => {
        state.loading = false
    })
    .addCase(removeAlbum.pending, (state) => {
      state.loading = true
    })
    .addCase(removeAlbum.fulfilled, (state, action) => {
      state.loading = false
      state.albums = action.payload
    })
    .addCase(removeAlbum.rejected, (state) => {
      state.loading = false
    })

    ///Photo cases: 
    .addCase(Photos.pending, (state) => {
      state.loading = true
    })
    .addCase(Photos.fulfilled, (state) => {
        state.loading = false
    })
    .addCase(Photos.rejected, (state) => {
        state.loading = false
    })
    .addCase(LikePhoto.pending, (state) => {
        state.loading = true
    })
    .addCase(LikePhoto.fulfilled, (state) => {
        state.loading = false
    })
    .addCase(LikePhoto.rejected, (state) => {
        state.loading = false
    })
    .addCase(removePhoto.pending, (state) => {
      state.loading = true
    })
    .addCase(removePhoto.rejected, (state) => {
      state.loading = false
    })
    .addCase(removePhoto.fulfilled, (state) => {
      state.loading = false
    })
    .addCase(removePhotoFromAlbum.pending, (state) => {
      state.loading = true
    })
    .addCase(removePhotoFromAlbum.rejected, (state) => {
      state.loading = false
    })
    .addCase(removePhotoFromAlbum.fulfilled, (state, action) => {
      state.loading = true
      state.albums = action.payload
    })
    .addCase(editPhoto.pending, (state) => {
      state.loading = true
    })
    .addCase(editPhoto.rejected, (state) => {
      state.loading = false
    })
    .addCase(editPhoto.fulfilled, (state, action) => {
      state.loading = false
      state.albums = action.payload
    })
    }
})


export default AlbumSlice.reducer