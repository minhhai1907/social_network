import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { cloudinaryUpload } from "../../utils/cloudinary";


const initialState={
    isLoading:false,
    error:null,
    selectedUser:{},

}

const slice=createSlice({
    name:"user",
    initialState,
    reducers:{
        startLoading:(state)=>{
            state.isLoading=true
        },
        hasError:(state,action)=>{
            state.isLoading=false
            state.error=action.payload
        },
        getSingleUserSuccess:(state,action)=>{
            state.isLoading=false
            state.error=null
            state.selectedUser=action.payload
        },
        updateUserProfileSuccess:(state,action)=>{
            state.isLoading=false
            state.error=null
            state.updatedUser=action.payload
        }
    }
})

export const getSingleUser=(targetUserId)=>async(dispatch)=>{
    dispatch(slice.actions.startLoading())
    try {
        const response=await apiService.get(`/users/${targetUserId}`)
        dispatch(slice.actions.getSingleUserSuccess(response.data.data))
    } catch (error) {
        dispatch(slice.actions.hasError(error.message))
    }
}
export const updateUserProfile=({
    userId,
    name,
    avatarUrl,
    coverUrl,
    aboutMe,
    city,
    country,
    company,
    jobTitle,
    facebookLink,
    instagramLink,
    linkedinLink,
    twitterLink,
})=>async(dispatch)=>{
    dispatch(slice.actions.startLoading())
    try {
        const data={
                    name,
                    avatarUrl,
                    coverUrl,
                    aboutMe,
                    city,
                    country,
                    company,
                    jobTitle,
                    facebookLink,
                    instagramLink,
                    linkedinLink,
                    twitterLink,
                        }
        if(avatarUrl instanceof File){
            const imageUrl=await cloudinaryUpload(avatarUrl)
            data.avatarUrl=imageUrl
        }
        const response=await apiService.put(`/users/${userId}`,data)
        dispatch(slice.actions.updateUserProfileSuccess(response.data.data))
    } catch (error) {
        dispatch(slice.actions.hasError(error.message))
    }
}
export default slice.reducer