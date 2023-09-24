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
    userLoading: boolean,
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

if(process.env.REACT_APP_NODE_ENV === 'development'){
  baserUrl = process.env.REACT_APP_API_URL
}
else{
  baserUrl = process.env.REACT_APP_PRODUCTION_URL
}

///Register user 
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
      credentials:'include',

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

 ///Get logged in user
 export const getUser = createAsyncThunk('users/me', async(_, thunkAPI) => {
  try{
    const res = await fetch(`${baserUrl}/api/users/me`, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
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
  catch(err: any | typeof Error){
    return thunkAPI.rejectWithValue(err.response.data)
  }
 })

///Get user's profile (for UserProfile)
export const getProfile = createAsyncThunk('users/get-profile', async (id : string, thunkAPI)=> {
  try{
    const res = await fetch(`${baserUrl}/api/users/get-profile?id=${id}`, {
      method: 'GET',
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
  catch(err: any | typeof Error){
    return thunkAPI.rejectWithValue(err.response.data)
  }
 })

 ///Log in User
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
        credentials:'include',
        body
      })
      const data = await res.json()
      if(res.status === 200){
       const { dispatch} = thunkAPI
       await dispatch(getUser())


        return true
      }
      else {
        return thunkAPI.rejectWithValue(data)
      }}
    catch (error: any | typeof Error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
});

///Check for access cookie
export const verifyUser = createAsyncThunk(
  'users/verify',
  async (_, thunkAPI) => {
    try{
      const res = await fetch(`${baserUrl}/api/users/verify`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
        credentials:'include',

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

///Log out user
export const logoutUser = createAsyncThunk(
  'users/logout',
  async (_, thunkAPI) => {
    try {
      const res = await fetch(`${baserUrl}/api/users/logout`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
        credentials:'include',

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

/// Sending password reset link to email
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
        credentials:'include',

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

  ///Change forgotten password
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
          credentials:'include',
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
///Change existing password
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
          credentials:'include',
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
   userLoading: false,
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
      state.userLoading = true
    })
    .addCase(registerUser.fulfilled, (state, action) => {
      state.registered = true
      state.userLoading = false
      toast.success('Registered successfully')
    })
    .addCase(registerUser.rejected, (state, action) => {
    state.userLoading = false
    toast.error('Registration failed')
   })
   
   // Login user
    .addCase(loginUser.pending, (state, action) => {
    state.userLoading = true
  })
    .addCase(loginUser.fulfilled, (state, action) => {
    state.userLoading = false
    state.isAuthenticated = true
    toast.success('Logged in successfully')
  })
    .addCase(loginUser.rejected, (state, action) =>{
    state.userLoading = false
    toast.error('Login failed')
  })

  ///Get user
    .addCase(getUser.pending, (state, action) => {
    state.userLoading = true
  })
    .addCase(getUser.fulfilled, (state, action) => {
    state.userLoading = false
    state.user = action.payload
  })
    .addCase(getUser.rejected, (state, action) =>{
    state.userLoading = false
  })

  ///Get userprofile
  .addCase(getProfile.pending, (state, action) => {
    state.userLoading = true
  })
    .addCase(getProfile.fulfilled, (state, action) => {
    state.userprofile = action.payload
    state.userLoading = false

  })
    .addCase(getProfile.rejected, (state, action) =>{
    state.userLoading = false
  })

  ///Verify user
  .addCase(verifyUser.pending, (state, action) => {
    state.userLoading = true
  })
  .addCase(verifyUser.fulfilled, (state, action) => {
    state.userLoading = false
    state.isAuthenticated = true
  })
  .addCase(verifyUser.rejected, (state, action) => {
    state.isAuthenticated= false
    state.user = null
    state.userLoading = false
  })

  ///Logout user
  .addCase(logoutUser.pending, (state, action) => {
  state.userLoading = true
  })
  .addCase(logoutUser.fulfilled, (state, action) => {
  state.userLoading = false
  state.isAuthenticated = false
  state.user = null
  toast.success('Logged out successfully')
  })
  .addCase(logoutUser.rejected, (state, action) =>{
  state.userLoading = false
  toast.error('Logout failed')
  })

  ///Send email to reset password
  .addCase(sendPasswordEmail.pending, (state, action) => {
    state.userLoading = true
  })
  .addCase(sendPasswordEmail.fulfilled, (state, action) => {
    window.localStorage.setItem('passwordResetTime', Date.now().toString())
    state.userLoading = false
    toast.success('Email sent successfully')
  })
  .addCase(sendPasswordEmail.rejected, (state, action) => {
    state.userLoading = false
    toast.error('Email failed to send')
  })

  ///Change forgotten password
  .addCase(changeForgottenPassword.pending, (state, action) => {
    state.userLoading = true
  })
  .addCase(changeForgottenPassword.fulfilled, (state, action) => {
    state.userLoading = false
    toast.success('Password changed successfully')
  })
  .addCase(changeForgottenPassword.rejected, (state, action) => {
    state.userLoading = false
    toast.error('Password failed to change')
  })

  ///Change password
  .addCase(changePassword.pending, (state, action) => {
    state.userLoading = true
  })
  .addCase(changePassword.fulfilled, (state, action) => {
    state.userLoading = false
    toast.success('Password changed successfully')
  })
  .addCase(changePassword.rejected, (state, action) => {
    state.userLoading = false
    toast.error('Password failed to change')
  })
  }
})

export const { resetRegistered} = UserSlice.actions
export default UserSlice.reducer

