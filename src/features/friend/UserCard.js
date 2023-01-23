import { Avatar, Box, Card, Link, Typography } from '@mui/material'
import React from 'react'
import {Link as RouterLink} from 'react-router-dom'
import EmailIcon from '@mui/icons-material/Email';
import ActionButton from './ActionButton';
import useAuth from '../../hooks/useAuth';

function UserCard({profile}) {
    const {user}=useAuth()
    const currentUserId=user._id
    const {_id:targetUserId,avatarUrl,name,email,friendship}=profile
    const actionBtn=(
        <ActionButton 
        currentUserId={currentUserId}
        targetUserId={targetUserId}
        friendship={friendship}/>
    )
  return (
    <Card sx={{display:"flex",alignItems:"center",p:3}}>
        <Avatar src={avatarUrl} alt={name} sx={{width:48,height:48}}/>
        <Box sx={{flexGrow:1,pl:2,pr:1,minWidth:0}}>
            <Link
            variant='subtitle'
            component={RouterLink}
            to={`/user/${targetUserId}`}
            fontWeight={600}
            color="primary"
            >
                {name}
            </Link>
            <Box sx={{display:"flex",alignItems:"center"}}>
                <EmailIcon
                sx={{
                    width:16,
                    height:16,
                    mr:0.5,
                    flexShrink:0
                }}/>
                <Typography variant='body2' color="text.secondary">{email}</Typography>
            </Box>
        </Box>
        {actionBtn}
    </Card>
  )
}

export default UserCard
