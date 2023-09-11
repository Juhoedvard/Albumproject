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
  albumID: string,
  likes?: number,
  id?: number,
  likedUsers? : User[]

}
export type AlbumState = {
    albums: Album[],
    albumphotos: Photo[],
    loading: boolean
}
let api_Url: string | undefined= ''


if(process.env.REACT_APP_NODE_ENV === 'development'){
    api_Url = process.env.REACT_APP_API_URL
}


export const addThumbnail = createAsyncThunk(
  'album/add-thumbnail-s3',
  async( thumbnail : File, thunkAPI) => {
    const formData = new FormData()
    formData.append('thumbnail', thumbnail)
    try {
      const res = await fetch(`${api_Url}/api/album/add-thumbnail-s3`, {
          method: 'POST',
          headers: {
            Accept: 'multipart/form-data',
          },

          body: formData,
          credentials: 'include'
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
export const addPhotos = createAsyncThunk(
  'album/add-photos-s3', async( images: File[], thunkAPI) => {
    const formData = new FormData()
    for (let i = 0; i <images.length; i++){
      formData.append(`photo`, images[i])
    }

    try {
      const res = await fetch(`${api_Url}/api/album/add-photos-s3`, {
          method: 'POST',
          headers: {
            Accept: 'multipart/form-data',
          },

          body: formData,
         credentials: 'include'
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

export const LikePhoto = createAsyncThunk(
  'album/likephoto', async (id: number, thunkAPI ) => {
    const body = JSON.stringify({id : id})
    try{
      const res = await fetch(`${api_Url}/api/album/likephoto`,{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body,
        credentials: 'include'
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
export const createAlbum = createAsyncThunk(
    'album/create-album',
    async ({title, description, thumbnail, photos} : Album,  thunkAPI) => {
        const body = JSON.stringify({title: title, description: description, thumbnail: thumbnail})
      try {
        const res = await fetch(`${api_Url}/api/album/create-album`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },

            body,
            credentials: 'include'
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
export const Photos = createAsyncThunk(
  'album/photos',
  async (photos: Photo[],  thunkAPI) => {
      const body = JSON.stringify(photos)
    try {
      const res = await fetch(`${api_Url}/api/album/add-photos`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body,
          credentials: 'include'
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

export const getAlbums = createAsyncThunk(
  'api/album/albums',
  async (_, thunkAPI) => {
    try{
      const res = await fetch(`${api_Url}/api/album/albums`, {
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

export const getPhotoLikes = createAsyncThunk(
  'api/album/getPhotoLikes',
  async (id: number, thunkAPI) => {
    const body = JSON.stringify(id)
    try{
      const res = await fetch(`${api_Url}/api/album/getPhotoLikes/${id}`, {
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
    .addCase(createAlbum.pending, (state) => {
        state.loading = true
    })
    .addCase(createAlbum.fulfilled, (state, action) => {
        state.albums.push(action.payload)
        toast.success('Album created!')
        state.loading = false
    })
    .addCase(createAlbum.rejected, (state,action) => {
        state.loading = false
    })
    .addCase(addThumbnail.pending, (state) => {
      state.loading = true
    })
    .addCase(addThumbnail.fulfilled, (state, action) => {
      state.loading = false
    })
    .addCase(addThumbnail.rejected, (state,action) => {
        state.loading = false
    })
    .addCase(getAlbums.pending, (state) => {
      state.loading = true
    })
    .addCase(getAlbums.fulfilled, (state, action) => {
        state.albums = action.payload
        state.loading = false
    })
    .addCase(getAlbums.rejected, (state,action) => {
        state.loading = false
    })
    .addCase(Photos.pending, (state) => {
      state.loading = true
    })
    .addCase(Photos.fulfilled, (state, action) => {
        state.loading = false
    })
    .addCase(Photos.rejected, (state,action) => {
        state.loading = false
    })
    .addCase(LikePhoto.pending, (state) => {
        state.loading = true
    })
    .addCase(LikePhoto.fulfilled, (state, action) => {
        state.loading = false
    })
    .addCase(LikePhoto.rejected, (state,action) => {
        state.loading = false
    })
    }
})


export default AlbumSlice.reducer