import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { User } from './user'


export type Photo = {
    caption: string,
    photo: string,
    album: string,
    likes?: number,
    id?: number,
    likedUsers? : User[]
  
}
export type PhotoState ={
    photos : Photo[]
    photosLoading: boolean
}



let baseUrl : string | undefined= ''

if(process.env.REACT_APP_NODE_ENV === 'development'){
  baseUrl = process.env.REACT_APP_API_URL
}
else{
  baseUrl = process.env.REACT_APP_PRODUCTION_URL
}

///Get album's photos
export const getAlbumPhotos = createAsyncThunk(
  'api/photos/getAlbumPhotos', async (id: number, thunkAPI) =>{
    try{
      const res = await fetch(`${baseUrl}/api/photos/getAlbumPhotos?id=${id}`, {
        method: 'GET',
        headers: {
          Accepts: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include'
    })
    const data = await res.json()
    if(res.status === 200) {
      return data
    }
    else{
      return thunkAPI.rejectWithValue(data)
    }
    }
    catch(err: any | typeof Error){
      (thunkAPI.rejectWithValue(err.response.data))
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }
)
///get photo likes
export const getPhotoLikes = createAsyncThunk(
    'api/album/getPhotoLikes',
    async (id: number, thunkAPI) => {
      try{
        const res = await fetch(`${baseUrl}/api/album/getPhotoLikes?id=${id}`, {
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
        return thunkAPI.rejectWithValue(data)
      }
      }
      catch(err: any | typeof Error){
        (thunkAPI.rejectWithValue(err.response.data))
        return thunkAPI.rejectWithValue(err.response.data)
      }
})

export const Photos = createAsyncThunk(
  'album/photos',
  async (images: Photo[],  thunkAPI) => {
      const body = JSON.stringify(images)
    try {
      const res = await fetch(`${baseUrl}/api/album/add-photos`, {
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
///Edit photo
export const editPhoto = createAsyncThunk(
'api/album/editPhoto', async({caption, id}: {caption: string, id:number}, thunkAPI) => {
    try{
      const res = await fetch(`${baseUrl}/api/album/editPhoto`, {
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
      ///Single photo removal from album
export const removePhotoFromAlbum = createAsyncThunk(
    'api/album/remove-photo-album', async(id:number, thunkAPI) =>{
      try{
        const res = await fetch(`${baseUrl}/api/album/remove-photo-album?id=${id}`, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'include',
  
        })
        const data = await res.json()
        console.log(data)
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
        const res = await fetch(`${baseUrl}/api/album/remove-photo-s3`, {
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
        const res = await fetch(`${baseUrl}/api/album/likephoto`,{
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
///Add album's photos to s3 bucket
export const addPhotos = createAsyncThunk(
    'album/add-photos-s3', async( images: File[], thunkAPI) => {
      const formData = new FormData()
      images.forEach((image) => {
        formData.append('photo', image)
      })
      try {
        const res = await fetch(`${baseUrl}/api/album/add-photos-s3`, {
            method: 'POST',
            headers: {
              Accept: 'multipart/form-data',
            },
            credentials: 'include',
            body: formData,
  
          })
          const data = await res.json()
          console.log(data)
          if(res.status === 200){
            return data
          }
          else if (res.status === 503){
            console.log('503 error, korjaa tähän')
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

  const initialState : PhotoState = {
    photos: [],
    photosLoading : false

}


export const PhotosSlice = createSlice({
    name: 'CurrentPhotos',
    initialState,
    reducers: {

    },
    extraReducers: builder => {

    builder

      .addCase(getAlbumPhotos.pending, (state) => {
        state.photos = []
        state.photosLoading = true
      })   
      .addCase(getAlbumPhotos.fulfilled, (state, action) => {
        state.photos = action.payload
        state.photosLoading = false
      })
      .addCase(getAlbumPhotos.rejected, (state) => {
        state.photosLoading = false
      })
      .addCase(Photos.pending, (state) => {
        state.photosLoading = true
      })
      .addCase(Photos.fulfilled, (state, action) => {
          const addedPhotos = [...state.photos]
          console.log(action.payload)
          addedPhotos.push(...action.payload)
          state.photos = addedPhotos
          state.photosLoading = false
      })
      .addCase(Photos.rejected, (state) => {
          state.photosLoading = false
      })
      .addCase(removePhoto.pending, (state) => {
        state.photosLoading = true
      })
      .addCase(removePhoto.rejected, (state) => {
        state.photosLoading = false
      })
      .addCase(removePhoto.fulfilled, (state) => {
        state.photosLoading = false
      })
      .addCase(removePhotoFromAlbum.pending, (state) => {
        state.photosLoading = true
      })
      .addCase(removePhotoFromAlbum.rejected, (state) => {
        state.photosLoading = false
      })
      .addCase(removePhotoFromAlbum.fulfilled, (state, action) => {
        const newPhotos = state.photos.filter((photo) => photo.id !== parseInt(action.payload))
        state.photos = newPhotos
        state.photosLoading = false

      })
      .addCase(editPhoto.pending, (state, action) => {
        state.photosLoading = true
      })
      .addCase(editPhoto.rejected, (state) => {
        state.photosLoading = false
      })
      .addCase(editPhoto.fulfilled, (state, action) => {
        const newPhotos = state.photos.filter((photo) => photo.id !== action.payload.id)
        newPhotos.push(action.payload)
        state.photos = newPhotos
        state.photosLoading = false

      })

}
})


export default PhotosSlice.reducer