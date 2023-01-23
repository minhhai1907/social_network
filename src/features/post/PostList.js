import LoadingButton from '@mui/lab/LoadingButton'
import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PostCard from './PostCard'
import { getPosts } from './postSlice'

function PostList({userId}) {
  const {postsById,postsCurrentPage,totalPosts,isLoading}=useSelector(state=>state.post)
  const posts=postsCurrentPage.map(postId=>postsById[postId])
  const [page,setPage]=useState(1)
  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(getPosts({userId,page}))
  },[userId,page,dispatch])
  
  return (
    <div>
      {posts.map((post)=><PostCard key={post._id} post={post}></PostCard>)}
     
        <Box sx={{
          display:"flex",
          justifyContent:"center"
        }}>
           {totalPosts?(
        <LoadingButton
        variant='outlined'
        loading={isLoading}
        onClick={()=>setPage(page+1)}
        disabled={!totalPosts||posts.length>=totalPosts}
        >
          Load more
        </LoadingButton>
        
      ):(
        <Typography variant='h6'>Not Post Yet</Typography>
      )}
      </Box>
    </div>
  )
}

export default PostList
