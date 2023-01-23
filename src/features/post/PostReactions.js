import { IconButton, Stack, Typography } from '@mui/material'
import React from 'react'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useDispatch } from 'react-redux';
import {createPostReaction} from "./postSlice"

function PostReactions({post}) {
  const dispatch=useDispatch()
  const handleClick=(emoji)=>{
    dispatch(createPostReaction({emoji,postId:post._id}))
  }
  return (
   <Stack direction="row" alignItems="center">
    <IconButton sx={{ml:1,color:"primary.main"}} onClick={()=>handleClick("like")}>
      <ThumbUpIcon/>
    </IconButton>
    <Typography>{post?.reactions.like}</Typography>
    <IconButton sx={{ml:1,color:"error.main"}} onClick={()=>handleClick("dislike")}>
      <ThumbDownIcon/>
    </IconButton>
    <Typography>{post?.reactions.dislike}</Typography>
   </Stack>
  )
}

export default PostReactions
