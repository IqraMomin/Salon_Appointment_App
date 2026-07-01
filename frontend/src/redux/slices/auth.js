import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const API = `http://localhost:3000`

const initialState = {
    user:null,
    isLoggedIn :false,
    error:null,
    loading:false,
    message:null
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(signUp.pending,(state,action)=>{
            state.loading = true;
        })
        .addCase(signUp.fulfilled,(state,action)=>{
            state.loading = false;
            state.message = action.payload;
        })
        .addCase(signUp.rejected,(state,action)=>{
            state.loading = false;
            state.message = action.payload;
        })
        .addCase(login.pending,(state,action)=>{
            state.loading = true;
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.loading = false;
            state.user = action.payload;
            state.isLoggedIn = true;
        })
        .addCase(login.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export const signUp = createAsyncThunk("auth/signUp",async(userData,{rejectWithValue})=>{
    try{
        const response = await axios.post(`${API}/users/signup`,userData);
        console.log(response.data.message);
        return response.data.message;
    }catch(err){
        return rejectWithValue(err);
    }
})

export const login = createAsyncThunk("auth/login",async(userData,{rejectWithValue})=>{
    try{
        const response = await axios.post(`${API}/users/login`,userData,{
            withCredentials:true
        });
        console.log(response.data);
        return response.data;
    }catch(err){
        return rejectWithValue(err);
    }
})

export const authActions = authSlice.actions;
export default authSlice.reducer