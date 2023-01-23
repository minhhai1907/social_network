import React, { useState } from 'react'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Profile from '../features/user/Profile';
import FriendList from '../features/friend/FriendList';
import FriendRequests from '../features/friend/FriendRequests';
import AddFriend from '../features/friend/AddFriend';
import useAuth from '../hooks/useAuth';
import { Box, Card, Container, Tab, Tabs } from '@mui/material';
import { capitalCase } from 'change-case';
import ProfileCover from "../features/user/ProfileCover"
import { styled } from '@mui/system';

const TabsWrapperStyle=styled("div")(({theme})=>({
  zIndex:9,
  position:"absolute",
  width:"100%",
  bottom:0,
  display:"flex",
  backgroundColor:"#fff",
  [theme.breakpoints.up("sm")]:{
    justifyContent:"center",
  },
  [theme.breakpoints.up("md")]:{
    justifyContent:"flex-end",
    paddingRight:theme.spacing(3),
  },
}))


function HomePage() {
  const {user}=useAuth()
  const [currentTab,setCurrentTab]=useState("profile")
  const TABS_VALUES=[
    {
      id:1,
      value:"profile",
      icon:<AccountBoxIcon sx={{fontSize:24}}/>,
      component:<Profile profile={user}/>
    },
    {
      id:2,
      value:"friends",
      icon:<PeopleAltIcon sx={{fontSize:24}}/>,
      component:<FriendList/>
    },
    {
      id:3,
      value:"requests",
      icon:<ContactMailIcon sx={{fontSize:24}}/>,
      component:<FriendRequests/>
    },
    {
      id:4,
      value:"add_friends",
      icon:<PersonAddIcon sx={{fontSize:24}}/>,
      component:<AddFriend/>
    },
  ]
  return (
    <Container>
      <Card sx={{
        height:280,
        position:"relative",
        mb:3
      }}>
        <ProfileCover profile={user}/>
        <TabsWrapperStyle>
      <Tabs
      variant="scrollable"
      scrollButtons
      value={currentTab}
      onChange={(e,value)=>setCurrentTab(value)}>
        {TABS_VALUES.map((tab)=>
        <Tab
        key={tab.value}
        disableRipple
        value={tab.value}
        label={capitalCase(tab.value) }
        icon={tab.icon}
        />
        )}
      </Tabs>
      </TabsWrapperStyle>
      </Card>
      {TABS_VALUES.map((tab)=>{
        const isMatch=tab.value===currentTab
        return (isMatch&&<Box>{tab.component}</Box>)
      })}
    </Container>
  )
}

export default HomePage
