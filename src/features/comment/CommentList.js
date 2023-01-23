import { Pagination, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { COMMENTS_PER_POST } from '../../app/config'
import CommentCard from './CommentCard'
import {getComments}  from "./commentSlice"

function CommentList({postId}) {
  const [page,setPage]=useState(1)
  const dispatch=useDispatch()
  const {
    commentsById,
    commentsByPost,
    currentPage,
    totalComments,
    isLoading}=useSelector(state=>({
      commentsById:state.comment.commentsById,
      commentsByPost:state.comment.commentsByPost[postId],
      currentPage:state.comment.currentPageByPost[postId]||1,
      totalComments:state.comment.totalCommentsByPost[postId],
      isLoading:state.comment.isLoading
    }),shallowEqual)
  useEffect(()=>{
    dispatch(getComments({postId,page}))
  },[page,postId,dispatch])
  const totalPages=Math.ceil(totalComments/COMMENTS_PER_POST)
  let renderComments;
  if(commentsByPost){
    const comments=commentsByPost.map(commentId=>commentsById[commentId])
    renderComments=(
      <Stack spacing={1.5}>
        {comments.map(comment=>(
          <CommentCard key={comment._id} comment={comment}/>
        ))}
      </Stack>
    )
  }
  return (
   <Stack spacing={1.5}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant='subtitle' color="text.secondary">
        {totalComments>1?
        `${totalComments} comments`
        :totalComments===1?
        `${totalComments} comment`
        :`no comment`}
        </Typography>
        {totalComments>COMMENTS_PER_POST&&
        <Pagination
        page={currentPage}
        count={totalPages}
        onChange={(e,page)=>dispatch(getComments({postId,page}))}/>
        } 
      </Stack>
      {renderComments}
   </Stack>
  )
}

export default CommentList
