import { ThumbDownAltOutlined, ThumbDownAltRounded, ThumbUpAltOutlined, ThumbUpAltRounded } from '@mui/icons-material'
import { IconButton, Stack, Typography } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import {createCommentReaction} from './commentSlice'

function CommentReaction({comment}) {
    const dispatch=useDispatch()
    const handleClick=(emoji)=>{
        dispatch(createCommentReaction({emoji,commentId:comment._id}))
    }
  return (
   <Stack  direction="row" alignItems="center">
    <IconButton sx={{color:"primary.main"}} onClick={()=>handleClick("like")}>
        <ThumbUpAltRounded/>
    </IconButton>
    <Typography>{comment?.reactions.like}</Typography>
    <IconButton sx={{color:"error.main"}} onClick={()=>handleClick("dislike")}>
        <ThumbDownAltRounded/>
    </IconButton>
    <Typography>{comment?.reactions.dislike}</Typography>
   </Stack>
  )
}

export default CommentReaction
