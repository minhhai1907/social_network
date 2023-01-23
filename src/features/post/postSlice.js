import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { cloudinaryUpload } from "../../utils/cloudinary";


const initialState={
    isLoading:false,
    error:null,
    postsById:{},
    postsCurrentPage:[],
    totalPosts:0
}

const slice=createSlice({
    name:"post",
    initialState,
    reducers:{
        startLoading:(state)=>{
            state.isLoading=true
        },
        hasError:(state,action)=>{
            state.isLoading=false
            state.error=action.payload
        },
        createPostSuccess:(state,action)=>{
            state.isLoading=false
            state.error=null
            const newPost=action.payload.data
            if(state.postsCurrentPage.length%2===0){
                state.postsCurrentPage.pop()
            }
            state.postsById[newPost._id]=newPost
            state.postsCurrentPage.unshift(newPost._id)
        },
        getPostsSuccess:(state,action)=>{
            state.isLoading=false
            state.error=null
            const {posts,count}=action.payload.data
            posts.forEach(post=>{
                state.postsById[post._id]=post
                if(!state.postsCurrentPage.includes(post._id)){
                    state.postsCurrentPage.push(post._id)
                }
            })
            state.totalPosts=count
        },
        createPostReactionSuccess:(state,action)=>{
            state.isLoading=false
            state.error=null
            const {postId,reactions}=action.payload
            state.postsById[postId].reactions=reactions
        },
        resetPosts:(state,action)=>{
            state.postsById={}
            state.postsCurrentPage=[]
        }
    }
})
export const createPost=({content,image})=>async(dispatch)=>{
    dispatch(slice.actions.startLoading())
    try {
        const imgUrl= await cloudinaryUpload(image)
        const response=await apiService.post("/posts",{content,image:imgUrl})
        dispatch(slice.actions.createPostSuccess(response.data))
    } catch (error) {
        dispatch(slice.actions.hasError(error.message))
    }
}
export const getPosts=({userId,page,limit=2})=>async(dispatch)=>{
    dispatch(slice.actions.startLoading())
    try {
        const params={page,limit}
        const response=await apiService.get(`/posts/user/${userId}`,{
            params
        })
        if(page===1) dispatch(slice.actions.resetPosts())
        dispatch(slice.actions.getPostsSuccess(response.data))
    } catch (error) {
        dispatch(slice.actions.hasError(error.message))
    }
}
export const createPostReaction=({postId,emoji})=>async (dispatch)=>{
    dispatch(slice.actions.startLoading())
    try {
        const response=await apiService.post("reactions/",{
            targetType:"Post",
            targetId:postId,
            emoji
        })
        dispatch(slice.actions.createPostReactionSuccess({postId,reactions:response.data.data}))
    } catch (error) {
        dispatch(slice.actions.hasError(error.message))
    }
}
export default slice.reducer