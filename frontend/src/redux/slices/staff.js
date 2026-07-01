import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = `http://localhost:3000`

const initialState = {
    list:[],
    error:null,
    loading:false
}
const staffSlice= createSlice({
    name:"staff",
    initialState,
    reducers:{},
    extraReducers:()=>{}
})

export const addStaff = createAsyncThunk("staff/addStaff",async(staffData,{rejectWithValue})=>{
    try{
        const response = await axios.post(`${API}/admin/addStaff`,staffData,{
            withCredentials:true});
            console.log(response.data);
    }catch(err){
        return rejectWithValue(err);
    }
})