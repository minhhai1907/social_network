import { Send } from '@mui/icons-material'
import { Avatar, IconButton, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { FTextField } from '../../components/form'
import useAuth from "../../hooks/useAuth"
import {createComment} from "./commentSlice"

function CommentForm({postId}) {
  const {user}=useAuth()
  const dispatch=useDispatch()
  const [content,setContent]=useState("")
  const handleSubmit=(e)=>{
    e.preventDefault()
    dispatch(createComment({postId,content}))
    setContent("")
  }
  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="row" alignItems="center">
        <Avatar src={user.avatarUrl} alt={user.name}/>
        <TextField 
        size='small'
        value={content}
        fullWidth
        placeholder="Write something..."
        onChange={(e)=>setContent(e.target.value)}
        sx={{
          ml:2,
          mr:1,
          "& fieldset":{
            borderWidth:`1px important`,
            borderColor:(theme)=>
              `${theme.palette.grey[500_32]} !important`
            
          }
        }}/>
        <IconButton type='submit' >
        <Send sx={{fontSize:30}} />
      </IconButton>
      </Stack>
      
    </form>
  )
}

export default CommentForm
