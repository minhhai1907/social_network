import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";


const initialState={
    isLoading:false,
    error:null,
    commentsById:{},
    commentsByPost:{},
    currentPageByPost:{},
    totalCommentsByPost:{}
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
        createCommentSuccess:(state,action)=>{
            state.isLoading=false
            state.error=null
            state.comments=action.payload
        },
        getCommentSuccess:(state,action)=>{
            state.isLoading=false
            state.error=null
            const {postId,comments,page,count}=action.payload
            comments.forEach(comment=>state.commentsById[comment._id]=comment)
            state.commentsByPost[postId]=comments
            .map(comment=>comment._id)
            .reverse()
            state.totalCommentsByPost[postId]=count
            state.currentPageByPost[postId]=page
        },
        createCommentReactionSuccess:(state,action)=>{
            state.isLoading=false
            state.error=null
            const {commentId,reactions}=action.payload
            state.commentsById[commentId].reactions=reactions
        }   
    }
})
export const createComment=({postId,content})=>async (dispatch)=>{
    dispatch(slice.actions.startLoading())
    try {
        const response=await apiService.post("comments/",{postId,content})
        dispatch(slice.actions.createCommentSuccess(response.data))
        dispatch(getComments({postId}))
    } catch (error) {
        dispatch(slice.actions.hasError(error.message))
    }
}
export const getComments=({postId,page,limit=3})=>async (dispatch)=>{
    dispatch(slice.actions.startLoading())
    try {
        const params={page,limit}
        const response=await apiService.get(`posts/${postId}/comments/`,{params})
        dispatch(slice.actions.getCommentSuccess(
            {...response.data.data,postId,page}))
    } catch (error) {
        dispatch(slice.actions.hasError(error.message))
    }
}
export const createCommentReaction=({commentId,emoji})=>async(dispatch)=>{
    dispatch(slice.actions.startLoading())
    try {
        const response=await apiService.post("reactions/",{
            targetType:"Comment",
            targetId:commentId,
            emoji
        })
        dispatch(slice.actions.createCommentReactionSuccess({
            commentId,reactions:response.data.data
        }))
    } catch (error) {
        dispatch(slice.actions.hasError(error.message))
    }
}

export default slice.reducer