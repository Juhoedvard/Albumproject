"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetRegistered = exports.UserSlice = exports.changePassword = exports.changeForgottenPassword = exports.sendPasswordEmail = exports.logoutUser = exports.verifyUser = exports.loginUser = exports.getProfile = exports.registerUser = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const config_1 = require("../config");
const react_toastify_1 = require("react-toastify");
exports.registerUser = (0, toolkit_1.createAsyncThunk)('users/register', ({ first_name, last_name, email, password }, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    const body = JSON.stringify({ first_name, last_name, email, password });
    try {
        const res = yield fetch(`${config_1.API_URL}/api/users/register`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body
        });
        const data = yield res.json();
        if (res.status === 201) {
            return data;
        }
        else {
            return thunkAPI.rejectWithValue(data);
        }
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
}));
const getUser = (0, toolkit_1.createAsyncThunk)('users/me', (_, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch(`${config_1.API_URL}/api/users/me`, {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            },
            credentials: 'include',
        });
        const data = yield res.json();
        if (res.status === 200) {
            return data;
        }
        else {
            return thunkAPI.rejectWithValue(data);
        }
    }
    catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
}));
exports.getProfile = (0, toolkit_1.createAsyncThunk)('users/get-profile', (id, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('yritetään');
        const res = yield fetch(`${config_1.API_URL}/api/users/get-profile?id=${id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
            credentials: 'include',
        });
        const data = yield res.json();
        if (res.status === 200) {
            return data;
        }
        else {
            return thunkAPI.rejectWithValue(data);
        }
    }
    catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
}));
exports.loginUser = (0, toolkit_1.createAsyncThunk)('users/login', ({ email, password }, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    const body = JSON.stringify({ email, password });
    try {
        const res = yield fetch(`${config_1.API_URL}/api/users/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body
        });
        const data = yield res.json();
        if (res.status === 200) {
            const { dispatch } = thunkAPI;
            dispatch(getUser());
            return data;
        }
        else {
            return thunkAPI.rejectWithValue(data);
        }
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
}));
exports.verifyUser = (0, toolkit_1.createAsyncThunk)('users/verify', (_, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch(`${config_1.API_URL}/api/users/verify`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
            credentials: 'include', /// IMPORTANT
        });
        const data = yield res.json();
        if (res.status === 200) {
            const { dispatch } = thunkAPI;
            dispatch(getUser());
            return data;
        }
        else {
            return thunkAPI.rejectWithValue(data);
        }
    }
    catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
}));
exports.logoutUser = (0, toolkit_1.createAsyncThunk)('users/logout', (_, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch(`${config_1.API_URL}/api/users/logout`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
            credentials: 'include',
        });
        const data = yield res.json();
        if (res.status === 200) {
            return data;
        }
        else {
            return thunkAPI.rejectWithValue(data);
        }
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
}));
exports.sendPasswordEmail = (0, toolkit_1.createAsyncThunk)('users/send-password', (email, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    const body = JSON.stringify({ email });
    try {
        console.log('trying');
        const res = yield fetch(`${config_1.API_URL}/api/users/send-password`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body
        });
        const data = yield res.json();
        if (res.status === 200) {
            return data;
        }
        else {
            return thunkAPI.rejectWithValue(data);
        }
    }
    catch (error) {
        console.log(error.response.data, 'error');
        console.log('rejected');
        return thunkAPI.rejectWithValue(error.response.data);
    }
}));
exports.changeForgottenPassword = (0, toolkit_1.createAsyncThunk)('users/forgotten-password', ({ password, token }, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    const body = JSON.stringify({ password, token });
    try {
        const res = yield fetch(`${config_1.API_URL}/api/users/forgotten-password`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body
        });
        const data = yield res.json();
        if (res.status === 200) {
            return data;
        }
        else {
            return thunkAPI.rejectWithValue(data);
        }
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
}));
exports.changePassword = (0, toolkit_1.createAsyncThunk)('users/change-password', ({ password, email }, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    const body = JSON.stringify({ password, email });
    try {
        const res = yield fetch(`${config_1.API_URL}/api/users/change-password`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body
        });
        const data = yield res.json();
        if (res.status === 200) {
            console.log(data);
            return data;
        }
        else {
            return thunkAPI.rejectWithValue(data);
        }
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
}));
const initialState = {
    isAuthenticated: false,
    user: null,
    loading: false,
    registered: false,
    userprofile: null
};
exports.UserSlice = (0, toolkit_1.createSlice)({
    name: 'User',
    initialState,
    reducers: {
        resetRegistered: (state) => {
            state.registered = false;
        },
    },
    extraReducers: builder => {
        builder
            /// Register user
            .addCase(exports.registerUser.pending, (state, action) => {
            state.loading = true;
        })
            .addCase(exports.registerUser.fulfilled, (state, action) => {
            state.registered = true;
            state.loading = false;
            react_toastify_1.toast.success('Registered successfully');
        })
            .addCase(exports.registerUser.rejected, (state, action) => {
            state.loading = false;
            react_toastify_1.toast.error('Registration failed');
        })
            // Login user
            .addCase(exports.loginUser.pending, (state, action) => {
            state.loading = true;
        })
            .addCase(exports.loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            react_toastify_1.toast.success('Logged in successfully');
        })
            .addCase(exports.loginUser.rejected, (state, action) => {
            state.loading = false;
            react_toastify_1.toast.error('Login failed');
        })
            ///Get user
            .addCase(getUser.pending, (state, action) => {
            state.loading = true;
        })
            .addCase(getUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        })
            .addCase(getUser.rejected, (state, action) => {
            state.loading = false;
        })
            ///Get userprofile
            .addCase(exports.getProfile.pending, (state, action) => {
            state.loading = true;
        })
            .addCase(exports.getProfile.fulfilled, (state, action) => {
            state.userprofile = action.payload;
            state.loading = false;
        })
            .addCase(exports.getProfile.rejected, (state, action) => {
            state.loading = false;
        })
            ///Verify user
            .addCase(exports.verifyUser.pending, (state, action) => {
            state.loading = true;
        })
            .addCase(exports.verifyUser.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
        })
            .addCase(exports.verifyUser.rejected, (state, action) => {
            state.loading = false;
        })
            ///Logout user
            .addCase(exports.logoutUser.pending, (state, action) => {
            state.loading = true;
        })
            .addCase(exports.logoutUser.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            react_toastify_1.toast.success('Logged out successfully');
        })
            .addCase(exports.logoutUser.rejected, (state, action) => {
            state.loading = false;
            react_toastify_1.toast.error('Logout failed');
        })
            ///Send email to reset password
            .addCase(exports.sendPasswordEmail.pending, (state, action) => {
            state.loading = true;
        })
            .addCase(exports.sendPasswordEmail.fulfilled, (state, action) => {
            window.localStorage.setItem('passwordResetTime', Date.now().toString());
            state.loading = false;
            react_toastify_1.toast.success('Email sent successfully');
        })
            .addCase(exports.sendPasswordEmail.rejected, (state, action) => {
            state.loading = false;
            react_toastify_1.toast.error('Email failed to send');
        })
            ///Change forgotten password
            .addCase(exports.changeForgottenPassword.pending, (state, action) => {
            state.loading = true;
        })
            .addCase(exports.changeForgottenPassword.fulfilled, (state, action) => {
            state.loading = false;
            react_toastify_1.toast.success('Password changed successfully');
        })
            .addCase(exports.changeForgottenPassword.rejected, (state, action) => {
            state.loading = false;
            react_toastify_1.toast.error('Password failed to change');
        })
            ///Change password
            .addCase(exports.changePassword.pending, (state, action) => {
            state.loading = true;
        })
            .addCase(exports.changePassword.fulfilled, (state, action) => {
            state.loading = false;
            react_toastify_1.toast.success('Password changed successfully');
        })
            .addCase(exports.changePassword.rejected, (state, action) => {
            state.loading = false;
            react_toastify_1.toast.error('Password failed to change');
        });
    }
});
exports.resetRegistered = exports.UserSlice.actions.resetRegistered;
exports.default = exports.UserSlice.reducer;
