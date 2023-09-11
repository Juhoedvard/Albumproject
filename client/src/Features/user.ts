import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import { Album } from './album';


export type User = {
  first_name: string,
  last_name: string,
  description?: string
  email: string,
  id: string
  albums: Album[]
}
export type UserState = {
    isAuthenticated: boolean,
    user: User | any,
    loading: boolean,
    registered: boolean,
    userprofile: User | any
}
export type RegisterUser = {
  first_name: string,
  last_name: string,
  email: string,
  password: string,
}
export type LoginUser = {
  email: string,
  password: string,
}

let baserUrl : string | undefined= ''

if(process.env.NODE_ENV !== 'production'){
  baserUrl = process.env.REACT_APP_API_URL
}
else{
  baserUrl = process.env.REACT_APP_PRODUCTION_URL
}

 export const registerUser = createAsyncThunk(
  'users/register',
  async ({first_name, last_name, email, password}: RegisterUser, thunkAPI) => {
    const body = JSON.stringify({first_name, last_name, email, password})
  try {
    const res = await fetch(`${baserUrl}/api/users/register`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },

      body
    })
    const data = await res.json()
    if(res.status === 201) {
      return data;
    }
    else {
      return thunkAPI.rejectWithValue(data)
    }
  }
  catch (error: any | typeof Error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
  }
 )

 export const getUser = createAsyncThunk('users/me', async(_, thunkAPI) => {
  ('lets get user')
  try{
    const res = await fetch(`${baserUrl}/api/users/me`, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      },


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
    return thunkAPI.rejectWithValue(err.response.data)
  }
 })
 export const getProfile = createAsyncThunk('users/get-profile', async (id : string, thunkAPI)=> {

  try{
    const res = await fetch(`${baserUrl}/api/users/get-profile?id=${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },

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
    return thunkAPI.rejectWithValue(err.response.data)
  }
 })
 export const loginUser = createAsyncThunk(
  'users/login',
  async ({email, password}: LoginUser, thunkAPI) => {
    const body = JSON.stringify({email, password})
    try {
      const res = await fetch(`${baserUrl}/api/users/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body
      })
      const data = await res.json()
      if(res.status === 200){
        const { dispatch} = thunkAPI
       await dispatch(getUser())

        return data
      }
      else {
        return thunkAPI.rejectWithValue(data)
      }}
    catch (error: any | typeof Error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
});

export const verifyUser = createAsyncThunk(
  'users/verify',
  async (_, thunkAPI) => {
    try{
      const res = await fetch(`${baserUrl}/api/users/verify`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },

      })
      const data = await res.json()

      if(res.status === 200) {
        const { dispatch} = thunkAPI
        await dispatch(getUser())
        return data
      }
      else{
        return thunkAPI.rejectWithValue(data)
      }
    }
    catch(err: any | typeof Error){
      return thunkAPI.rejectWithValue(err.response.data)
    }
  });

export const logoutUser = createAsyncThunk(
  'users/logout',
  async (_, thunkAPI) => {
    try {
      const res = await fetch(`${baserUrl}/api/users/logout`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },

      })
      const data = await res.json()

      if(res.status === 200){
        return data
      }
      else {
        return thunkAPI.rejectWithValue(data)
      }}
    catch (error: any | typeof Error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
});

export const sendPasswordEmail = createAsyncThunk(
  'users/send-password',
  async (email: string, thunkAPI) => {

    const body = JSON.stringify({email})

    try {
      const res = await fetch(`${baserUrl}/api/users/send-password`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },

        body
      })
      const data = await res.json()
      if(res.status === 200){
        return data
      }
      else {
        return thunkAPI.rejectWithValue(data)
      }
    }
    catch (error: any | typeof Error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  });
  export const changeForgottenPassword = createAsyncThunk(
    'users/forgotten-password',
    async ({password, token}: {password: string, token: string}, thunkAPI) => {
      const body = JSON.stringify({password, token})
      try {
        const res = await fetch(`${baserUrl}/api/users/forgotten-password`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body
        })
        const data = await res.json()
        if(res.status === 200){
          return data
        }
        else {
          return thunkAPI.rejectWithValue(data)
        }
      }
      catch (error: any | typeof Error) {
        return thunkAPI.rejectWithValue(error.response.data)
      }
    });

  export const changePassword = createAsyncThunk(
    'users/change-password',
    async ({password, email}: {password: string, email: string}, thunkAPI) => {
      const body = JSON.stringify({password, email})
      try {
        const res = await fetch(`${baserUrl}/api/users/change-password`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body
        })
        const data = await res.json()
        if(res.status === 200){
          return data
        }
        else {
          return thunkAPI.rejectWithValue(data)
        }
      }
      catch (error: any | typeof Error) {
        return thunkAPI.rejectWithValue(error.response.data)
      }
    })

 const initialState: UserState = {
   isAuthenticated: false,
   user: null,
   loading: false,
   registered: false,
   userprofile: null
 }

export const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    resetRegistered: (state) => {
      state.registered = false
    },

  },
  extraReducers: builder => {
    builder
    /// Register user
    .addCase(registerUser.pending, (state, action) => {
      state.loading = true
    })
    .addCase(registerUser.fulfilled, (state, action) => {
      state.registered = true
      state.loading = false
      toast.success('Registered successfully')
    })
    .addCase(registerUser.rejected, (state, action) => {
    state.loading = false
    toast.error('Registration failed')
   })
   // Login user
    .addCase(loginUser.pending, (state, action) => {
    state.loading = true
  })
    .addCase(loginUser.fulfilled, (state, action) => {
    state.loading = false
    state.isAuthenticated = true
    toast.success('Logged in successfully')
  })
    .addCase(loginUser.rejected, (state, action) =>{
    state.loading = false
    toast.error('Login failed')
  })
  ///Get user
    .addCase(getUser.pending, (state, action) => {
    state.loading = true
  })
    .addCase(getUser.fulfilled, (state, action) => {
    state.loading = false
    state.user = action.payload
  })
    .addCase(getUser.rejected, (state, action) =>{
    state.loading = false
  })
  ///Get userprofile
  .addCase(getProfile.pending, (state, action) => {
    state.loading = true
  })
    .addCase(getProfile.fulfilled, (state, action) => {
    state.userprofile = action.payload
    state.loading = false

  })
    .addCase(getProfile.rejected, (state, action) =>{
    state.loading = false
  })
  ///Verify user
  .addCase(verifyUser.pending, (state, action) => {
    state.loading = true
  })
  .addCase(verifyUser.fulfilled, (state, action) => {
    state.loading = false
    state.isAuthenticated = true
  })
  .addCase(verifyUser.rejected, (state, action) => {
    state.loading = false
  })
  ///Logout user
  .addCase(logoutUser.pending, (state, action) => {
  state.loading = true
    })
  .addCase(logoutUser.fulfilled, (state, action) => {
  state.loading = false
  state.isAuthenticated = false
  state.user = null
  toast.success('Logged out successfully')
  })
  .addCase(logoutUser.rejected, (state, action) =>{
  state.loading = false
  toast.error('Logout failed')
  })
  ///Send email to reset password
  .addCase(sendPasswordEmail.pending, (state, action) => {
    state.loading = true
  })
  .addCase(sendPasswordEmail.fulfilled, (state, action) => {
    window.localStorage.setItem('passwordResetTime', Date.now().toString())
    state.loading = false
    toast.success('Email sent successfully')
  })
  .addCase(sendPasswordEmail.rejected, (state, action) => {
    state.loading = false
    toast.error('Email failed to send')
  })
  ///Change forgotten password
  .addCase(changeForgottenPassword.pending, (state, action) => {
    state.loading = true
  })
  .addCase(changeForgottenPassword.fulfilled, (state, action) => {
    state.loading = false
    toast.success('Password changed successfully')
  })
  .addCase(changeForgottenPassword.rejected, (state, action) => {
    state.loading = false
    toast.error('Password failed to change')
  })

  ///Change password
  .addCase(changePassword.pending, (state, action) => {
    state.loading = true
  })
  .addCase(changePassword.fulfilled, (state, action) => {
    state.loading = false
    toast.success('Password changed successfully')
  })
  .addCase(changePassword.rejected, (state, action) => {
    state.loading = false
    toast.error('Password failed to change')
  })
  }
})

export const { resetRegistered} = UserSlice.actions
export default UserSlice.reducer