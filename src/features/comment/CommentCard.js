import { Avatar, Box, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import { fDate } from '../../utils/formatTime'
import CommentReaction from './CommentReaction'

function CommentCard({comment}) {
  return (
    <Stack direction="row" spacing={1.5}>
        <Avatar src={comment.author.avatarUrl} alt={comment.author.name}/>
        <Paper sx={{flexGrow:1,p:1.5,bgcolor:"background.neutral"}}>
            <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{mb:0.5}}
            >
                <Typography variant='subtitle2' sx={{fontWeight:600}}>{comment.author.name}</Typography>
                <Typography variant='caption' sx={{color:"text.disabled"}}>{fDate(comment.createdAt)}</Typography>
            </Stack>
            <Typography variant='body2' sx={{color:"text.secondary"}}>{comment.content}</Typography>
            <Box sx={{ display:"flex",justifyContent:"flex-end"}}>
                <CommentReaction comment={comment}/>
            </Box>
        </Paper>
    </Stack>
  )
}

export default CommentCard
