import React from 'react'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import { Chip } from '@mui/material';

function FriendStatus({currentUserId,targetUserId,friendship,sx}){
    if(currentUserId===targetUserId) return null;
    if(!friendship)return null;

    if(friendship.status==="accepted"){
        return(
            <Chip
            sx={{...sx}}
            icon={<CheckCircleOutlineIcon/>}
            label="friend"
            color="success"/>
        )
    };
    if(friendship.status==="declined"){
        return(
            <Chip
            sx={{...sx}}
            icon={<DoNotDisturbAltIcon/>}
            label="declined"
            color="error"/>
        )
    };
    if(friendship.status==="pending"){
        const {from,to}=friendship;
        if(from===currentUserId && to===targetUserId){
            return(
                <Chip
                sx={{...sx}}
                icon={<MarkEmailReadIcon/>}
                label="Request sent"
                color="warning"
                />
            )
        }else if(from===targetUserId&& to===currentUserId){
            return(
                <Chip
                sx={{...sx}}
                icon={<PauseCircleOutlineIcon/>}
                label="Waiting for response"
                color="warning"/>
            )
        }
    }
}
export default FriendStatus;