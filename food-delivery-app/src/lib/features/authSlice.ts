import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login } from "./authService";

export const loginUser = createAsyncThunk('auth/login', async (value: { email: string, password: string, }, thunkAPI) => {
    try {
        return login(value);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})
export interface authState {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    message: string;
    data: any;
}
const initialState : authState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
    data: [],
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(loginUser.pending, (state)=>{
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
            state.data = [];
        })
        builder.addCase(loginUser.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = action.payload?.message || action.payload?.errror || 'success';
            state.data = action.payload;
        })
        builder.addCase(loginUser.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = 'error';
            state.data = action.payload;
        })
    }
})

export default authSlice.reducer;