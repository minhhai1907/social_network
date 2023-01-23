import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from '../../app/apiService'

const initialState={
    isLoading:false,
    error:null,
    usersById:{},
    currentPageUsers:[],
    totalPages:1
}

const slice=createSlice({
    name:"comment",
    initialState,
    reducers:{
        startLoading:(state)=>{
            state.isLoading=true
        },
        hasError:(state,action)=>{
            state.isLoading=false
            state.error=action.payload
        },
        getUserSuccess:(state,action)=>{
            state.isLoading=false
            state.error=null
            const {count,totalPages,users}=action.payload
            users.forEach(user=>state.usersById[user._id]=user)
            state.currentPageUsers=users.map(user=>user._id)
            state.totalPages=totalPages
            state.totalUsers=count
        },
        getFriendsSuccess:(state,action)=>{
            state.isLoading=false
            state.error=null
            const {count,totalPages,users}=action.payload
            users.forEach(user=>state.usersById[user._id]=user)
            state.currentPageUsers=users.map(user=>user._id)
            state.totalPages=totalPages
            state.totalUsers=count
        },
        getFriendsRequestSuccess:(state,action)=>{
            state.isLoading=false
            state.error=null
            const {count,totalPages,users}=action.payload
            users.forEach(user=>state.usersById[user._id]=user)
            state.currentPageUsers=users.map(user=>user._id)
            state.totalPages=totalPages
            state.totalUsers=count
        },
        getSendFriendsRequestSuccess:(state,action)=>{
            state.isLoading=false
            state.error=null
            const {count,totalPages,users}=action.payload
            users.forEach(user=>state.usersById[user._id]=user)
            state.currentPageUsers=users.map(user=>user._id)
            state.totalPages=totalPages
            state.totalUsers=count
        },
        makeFriendRequestSuccess:(state,action)=>{
            state.isLoading=false
            state.error=null
            console.log(action.payload)
            const {targetUserId,...data}=action.payload
            state.usersById[targetUserId].friendship=data
        },
        acceptFriendRequestSuccess:(state,action)=>{
            state.isLoading=false
            state.error=null
            const {targetUserId,...data}=action.payload
            state.usersById[targetUserId].friendship=data
        },
        declineFriendRequestSuccess:(state,action)=>{
            state.isLoading=false
            state.error=null
            const {targetUserId,...data}=action.payload
            state.usersById[targetUserId].friendship=data
        },
        removeFriendSuccess:(state,action)=>{
            state.isLoading=false
            state.error=null
            const {targetUserId}=action.payload
            state.usersById[targetUserId].friendship=null
        },
        cancleFriendRequestSuccess:(state,action)=>{
            state.isLoading=false
            state.error=null
            const {targetUserId}=action.payload
            state.usersById[targetUserId].friendship=null
        },
    }
})

export const getUsers=({name,page,limit})=>async(dispatch)=>{
    dispatch(slice.actions.startLoading())
    try {
        const params={name,page,limit}
        const response=await apiService.get("/users",{params})
        dispatch(slice.actions.getUserSuccess(response.data.data))
    } catch (error) {
        dispatch(slice.actions.hasError(error.message))
    }
}
export const getFriends=({filterName,page,limit})=>async(dispatch)=>{
    dispatch(slice.actions.startLoading())
    try {
        const params={page,limit}
        if(filterName) params.name=filterName
        const response=await apiService.get("/friends",{params})
        dispatch(slice.actions.getFriendsSuccess(response.data.data))
    } catch (error) {
        dispatch(slice.actions.hasError(error.message))
    }
}
export const getFriendsRequest=({filterName,page,limit})=>async(dispatch)=>{
    dispatch(slice.actions.startLoading())
    try {
        const params={page,limit}
        if(filterName) params.name=filterName
        const response=await apiService.get("/friends/requests/incoming",{params})
        console.log(response.data)
        dispatch(slice.actions.getFriendsRequestSuccess(response.data.data))
    } catch (error) {
        dispatch(slice.actions.hasError(error.message))
    }
}
export const getSendFriendsRequest=({name,page,limit})=>async(dispatch)=>{
    dispatch(slice.actions.startLoading())
    try {
        const params={name,page,limit}
        const response=await apiService.get("/friends/requests/ongoing",{params})
        dispatch(slice.actions.getSendFriendsRequestSuccess(response.data.data))
    } catch (error) {
        dispatch(slice.actions.hasError(error.message))
    }
}
export const makeFriendRequest=(targetUserId)=>async(dispatch)=>{
    dispatch(slice.actions.startLoading())
    try {
        const response=await apiService.post("/friends/requests",{
            to: targetUserId
        })
        dispatch(slice.actions.makeFriendRequestSuccess({targetUserId,...response.data.data}))
        toast.success("Send friend request success")
    } catch (error) {
        dispatch(slice.actions.hasError(error.message))
        toast.error("Request Error")
    }
}
export const acceptFriendRequest=(targetUserId)=>async(dispatch)=>{
    dispatch(slice.actions.startLoading())
    try {
        const response=await apiService.put(`/friends/requests/${targetUserId}`,{
            status:"accepted"
        })
        dispatch(slice.actions.acceptFriendRequestSuccess({targetUserId,...response.data.data}))
    } catch (error) {
        dispatch(slice.actions.hasError(error.message))
        toast.error("Request Error")
    }
}
export const declineFriendRequest=(targetUserId)=>async(dispatch)=>{
    dispatch(slice.actions.startLoading())
    try {
        const response=await apiService.put(`/friends/requests/${targetUserId}`,{
            status:"declined"
        })
        dispatch(slice.actions.declineFriendRequestSuccess({targetUserId,...response.data.data}))
    } catch (error) {
        dispatch(slice.actions.hasError(error.message))
        toast.error("Declined Request Error")
    }
}
export const removeFriend=(targetUserId)=>async(dispatch)=>{
    dispatch(slice.actions.startLoading())
    try {
        const response=await apiService.delete(`/friends/${targetUserId}`)
        dispatch(slice.actions.removeFriendSuccess({targetUserId,...response.data.data}))
        toast.success("Remove friend success")
    } catch (error) {
        dispatch(slice.actions.hasError(error.message))
        toast.error("Remove Friend Error")
    }
}
export const cancleFriendRequest=(targetUserId)=>async(dispatch)=>{
    dispatch(slice.actions.startLoading())
    try {
        const response=await apiService.delete(`/friends/requests/${targetUserId}`)
        dispatch(slice.actions.cancleFriendRequestSuccess({targetUserId,...response.data.data}))
    } catch (error) {
        dispatch(slice.actions.hasError(error.message))
        toast.error("Cancle Request Error")
    }
}

export default slice.reducer