import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { User } from './user';




 export type Album = {
    title: string;
    description: string;
    thumbnail: string;
    id: number,
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

///Create album
export const createAlbum = createAsyncThunk(
    'album/create-album',
    async ({title, description, thumbnail} : Album,  thunkAPI) => {
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


const initialState : AlbumState = {
    albums: [],
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
    .addCase(createAlbum.fulfilled, (state, action) => {
        const newAlbums = [...state.albums]
        newAlbums.push(action.payload)
        state.albums = newAlbums
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
   
    }
})


export default AlbumSlice.reducer