import React from 'react'
import { Avatar, Box, Card, CardHeader, IconButton, Link, Stack, Typography } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {fDate} from '../../utils/formatTime'
import {Link as RouteLink} from "react-router-dom"
import PostReactions from './PostReactions'
import CommentForm from "../comment/CommentForm"
import CommentList from "../comment/CommentList"

function PostCard({post}) {
  return (
    <Card sx={{my:1}} >
       <CardHeader
       disableTypography
        avatar={
          <Avatar src= {post?.author?.avatarUrl} alt={post?.author?.name}/>
        }
        action={
          <IconButton sx={{fontSize:30}}>
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Link
          variant='subtitle2'
          color="text.primary"
          sx={{fontWeight:600}}
          component={RouteLink}
          to={`/user/${post.author._id}`}>
          {post?.author.name}
          </Link>
        }
        subheader={
          <Typography
          variant='caption'
          sx={{display:"block",color:"text.secondary"}}>{fDate(post.createdAt)}</Typography>}
      />
      <Stack spacing={3} sx={{p:2}}>
        <Typography variant='subtitle'>{post.content}</Typography>
     
      {post.image&&(
        <Box sx={{
          height:300,
          borderRadius:2,
          overflow:"hidden",
          "& img":{
            width:1,height:1,objectFit:"cover"
          }
        }}>
          <img src={post.image} alt="image"/>
        </Box>
      )}
      <PostReactions post={post}/>
      <CommentList postId={post._id}/>
      <CommentForm postId={post._id}/>
       </Stack>
    </Card>
  )
}

export default PostCard
