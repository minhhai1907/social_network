import React, { useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import {getSingleUser} from "../features/user/userSlice"
import { Card, Container } from '@mui/material'
import LoadingScreen from "../components/LoadingScreen"
import ProfileCover from '../features/user/ProfileCover'
import Profile from '../features/user/Profile'

function UserProfilePage() {
  const dispatch=useDispatch()
  const {isLoading,selectedUser}=useSelector(state=>state.user,shallowEqual)
  const params=useParams()
  const targetUserId=params.userId

  useEffect(()=>{
    dispatch(getSingleUser(targetUserId))
  },[dispatch,targetUserId])
  return (
    <Container>
      {isLoading?(<LoadingScreen/>):(
      <>
      <Card sx={{
        height:280,
        position:"relative",
        mb:3
      }}>
        {selectedUser&&<ProfileCover profile={selectedUser}/>}
      </Card>
      {selectedUser&&<Profile profile={selectedUser}/>}
      </>
      )}
    </Container>
  )
}

export default UserProfilePage
