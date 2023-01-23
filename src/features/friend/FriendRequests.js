import { Box, Card, Container, Grid, Pagination, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SearchInput from "../../components/SearchInput"
import {getFriendsRequest} from "./friendSlice"
import UserCard from './UserCard'

function FriendRequest() {
  const [filterName,setFilterName]=useState("")
  const [page,setPage]=useState(1)
  
  const dispatch=useDispatch()
  const {currentPageUsers,usersById,totalUsers,totalPages}=useSelector(state=>state.friend)
  const users=currentPageUsers.map(userId=>usersById[userId])
  const handleSubmit=(searchQuery)=>{
    setFilterName(searchQuery)
  }
  const handlePageChange=(e,newPage)=>{
      setPage(newPage)
  }

  useEffect(()=>{
      dispatch(getFriendsRequest({page,filterName}))
  },[page,filterName,dispatch])
  return (
    <Container>
      <Typography variant='h4' sx={{mb:2}}>Friend Requests</Typography>
      <Card sx={{p:3}}>
      <Stack spacing={2}>
        <Stack direction={{xs:"column",md:"row"}} alignItems="center">
          <SearchInput handleSubmit={handleSubmit}/>
          <Box sx={{flexGrow:1}}/>
          <Typography variant='subtitle' sx={{ml:1}}>
            {totalUsers>1?`${totalUsers} requests found`
            :totalUsers===1?`${totalUsers} request found`
            :` No request found`}
            </Typography>
       
          <Pagination 
          count={totalPages} 
          page={page} 
          onChange={handlePageChange} />
        </Stack>
       </Stack>
      <Grid container spacing={3} my={1}>
       {users.map((user)=>(
        <Grid item xs={12} md={4}>
        <UserCard key={user._id} profile={user}/>
        </Grid>
       ))}
       </Grid>
       </Card>
    </Container>
  )
}

export default FriendRequest
