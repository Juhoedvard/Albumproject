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
exports.AlbumSlice = exports.getPhotoLikes = exports.getAlbums = exports.Photos = exports.createAlbum = exports.LikePhoto = exports.addPhotos = exports.addThumbnail = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const config_1 = require("../config");
const react_toastify_1 = require("react-toastify");
exports.addThumbnail = (0, toolkit_1.createAsyncThunk)('album/add-thumbnail-s3', (thumbnail, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    const formData = new FormData();
    formData.append('thumbnail', thumbnail);
    try {
        const res = yield fetch(`${config_1.API_URL}/api/album/add-thumbnail-s3`, {
            method: 'POST',
            headers: {
                Accept: 'multipart/form-data',
            },
            credentials: 'include',
            body: formData
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
        console.log('maybe happening');
        return thunkAPI.rejectWithValue(error.response.data);
    }
}));
exports.addPhotos = (0, toolkit_1.createAsyncThunk)('album/add-photos-s3', (images, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
        formData.append(`photo`, images[i]);
    }
    try {
        const res = yield fetch(`${config_1.API_URL}/api/album/add-photos-s3`, {
            method: 'POST',
            headers: {
                Accept: 'multipart/form-data',
            },
            credentials: 'include',
            body: formData
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
        console.log('maybe happening');
        return thunkAPI.rejectWithValue(error.response.data);
    }
}));
exports.LikePhoto = (0, toolkit_1.createAsyncThunk)('album/likephoto', (id, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    const body = JSON.stringify({ id: id });
    console.log(body);
    try {
        const res = yield fetch(`${config_1.API_URL}/api/album/likephoto`, {
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
            dispatch((0, exports.getAlbums)());
            return data;
        }
        else {
            return thunkAPI.rejectWithValue(console.log(data));
        }
    }
    catch (error) {
        console.log('maybe happening');
        return thunkAPI.rejectWithValue(error.response.data);
    }
}));
exports.createAlbum = (0, toolkit_1.createAsyncThunk)('album/create-album', ({ title, description, thumbnail, photos }, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    const body = JSON.stringify({ title: title, description: description, thumbnail: thumbnail });
    try {
        const res = yield fetch(`${config_1.API_URL}/api/album/create-album`, {
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
            const { dispatch } = thunkAPI;
            const sendPhotos = photos.map((p) => (Object.assign(Object.assign({}, p), { albumID: data.id })));
            yield dispatch((0, exports.Photos)(sendPhotos));
            yield dispatch((0, exports.getAlbums)());
            return data;
        }
        else {
            return thunkAPI.rejectWithValue(data);
        }
    }
    catch (error) {
        console.log('maybe happening');
        return thunkAPI.rejectWithValue(error.response.data);
    }
}));
exports.Photos = (0, toolkit_1.createAsyncThunk)('album/photos', (photos, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    const body = JSON.stringify(photos);
    console.log(body);
    try {
        const res = yield fetch(`${config_1.API_URL}/api/album/add-photos`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body
        });
        const data = yield res.json();
        if (res.status === 20) {
            return data;
        }
        else {
            return thunkAPI.rejectWithValue(data);
        }
    }
    catch (error) {
        console.log('maybe happening');
        return thunkAPI.rejectWithValue(error.response.data);
    }
}));
exports.getAlbums = (0, toolkit_1.createAsyncThunk)('api/album/albums', (_, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch(`${config_1.API_URL}/api/album/albums`, {
            method: 'GET',
            headers: {
                Accepts: 'application/json',
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
exports.getPhotoLikes = (0, toolkit_1.createAsyncThunk)('api/album/getPhotoLikes', (id, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    const body = JSON.stringify(id);
    console.log(body);
    try {
        const res = yield fetch(`${config_1.API_URL}/api/album/getPhotoLikes/${id}`, {
            method: 'GET',
            headers: {
                Accepts: 'application/json',
            },
            credentials: 'include',
        });
        const data = yield res.json();
        console.log(data);
        if (res.status === 200) {
            return data;
        }
        else {
            console.log(thunkAPI.rejectWithValue(data));
            return thunkAPI.rejectWithValue(data);
        }
    }
    catch (err) {
        console.log(thunkAPI.rejectWithValue(err.response.data));
        return thunkAPI.rejectWithValue(err.response.data);
    }
}));
const initialState = {
    albums: [],
    albumphotos: [],
    loading: false
};
exports.AlbumSlice = (0, toolkit_1.createSlice)({
    name: 'Album',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(exports.createAlbum.pending, (state) => {
            state.loading = true;
        })
            .addCase(exports.createAlbum.fulfilled, (state, action) => {
            state.albums.push(action.payload);
            react_toastify_1.toast.success('Album created!');
            state.loading = false;
        })
            .addCase(exports.createAlbum.rejected, (state, action) => {
            state.loading = false;
        })
            .addCase(exports.addThumbnail.pending, (state) => {
            state.loading = true;
        })
            .addCase(exports.addThumbnail.fulfilled, (state, action) => {
            state.loading = false;
        })
            .addCase(exports.addThumbnail.rejected, (state, action) => {
            state.loading = false;
        })
            .addCase(exports.getAlbums.pending, (state) => {
            state.loading = true;
        })
            .addCase(exports.getAlbums.fulfilled, (state, action) => {
            state.albums = action.payload;
            state.loading = false;
        })
            .addCase(exports.getAlbums.rejected, (state, action) => {
            state.loading = false;
        })
            .addCase(exports.Photos.pending, (state) => {
            state.loading = true;
        })
            .addCase(exports.Photos.fulfilled, (state, action) => {
            state.loading = false;
        })
            .addCase(exports.Photos.rejected, (state, action) => {
            state.loading = false;
        })
            .addCase(exports.LikePhoto.pending, (state) => {
            state.loading = true;
        })
            .addCase(exports.LikePhoto.fulfilled, (state, action) => {
            state.loading = false;
        })
            .addCase(exports.LikePhoto.rejected, (state, action) => {
            state.loading = false;
        });
    }
});
exports.default = exports.AlbumSlice.reducer;
