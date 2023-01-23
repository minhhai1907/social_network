import React from 'react'
import {Grid} from "@mui/material"
import ProfileScoreCard from "./ProfileScoreCard"
import ProfileAbout from "./ProfileAbout"
import ProfileSocialInfo from "./ProfileSocialInfo"
import PostForm from "../post/PostForm"
import PostList from "../post/PostList"
import useAuth from '../../hooks/useAuth'



function Profile({profile}) {
  const {user}=useAuth()

  return (
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}  >
          <ProfileScoreCard profile={profile}/>
          <ProfileAbout profile={profile}/>
          <ProfileSocialInfo profile={profile}/>
        </Grid>
        <Grid item xs={12} md={8} >
          {profile._id===user._id&&<PostForm/>}
          <PostList userId={profile._id}/>
        </Grid>

      </Grid>
   
  )
}

export default Profile
