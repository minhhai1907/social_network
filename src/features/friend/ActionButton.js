import { Button, Stack } from '@mui/material';
import React from 'react'
import { useDispatch } from 'react-redux'
import { 
    acceptFriendRequest, 
    cancleFriendRequest, 
    removeFriend, 
    makeFriendRequest,
    declineFriendRequest 
} from "./friendSlice"

function ActionButton({targetUserId,currentUserId,friendship,sx}) {
    const dispatch=useDispatch();
    if(targetUserId===currentUserId) return null;
    const btnSendRequest=(
        <Button
        sx={{fontSize:"0.6rem",...sx}}
        size="small"
        variant='contained'
        onClick={()=>dispatch(makeFriendRequest(targetUserId))}>
            Send Request
        </Button>
    );

    if(!friendship) return btnSendRequest;

    const btnUnFriend=(
        <Button
        sx={{fontSize:"0.6rem",...sx}}
        size="small"
        variant='contained'
        color='error'
        onClick={()=>dispatch(removeFriend(targetUserId))}>
           Unfriend
        </Button>
    );
    const btnResend=(
        <Button
        sx={{fontSize:"0.6rem",...sx}}
        size="small"
        variant='contained'
        onClick={()=>dispatch(makeFriendRequest(targetUserId))}>
           {friendship.from===currentUserId ? "Resend" : "Send" } Request
        </Button>
    );
    const btnCancelRequest=(
        <Button
        sx={{fontSize:"0.6rem",...sx}}
        size="small"
        variant='contained'
        color='error'
        onClick={()=>dispatch(cancleFriendRequest(targetUserId))}>
           Cancel Request
        </Button>
    );
    const btnGroupReact=(
        <Stack direction="row" spacing={1}>
        <Button
        sx={{fontSize:"0.6rem",...sx}}
        size="small"
        variant='contained'
        color='success'
        onClick={()=>dispatch(acceptFriendRequest(targetUserId))}>
           Accept
        </Button>
        <Button
        sx={{fontSize:"0.6rem",...sx}}
        size="small"
        variant='contained'
        color='error'
        onClick={()=>dispatch(declineFriendRequest(targetUserId))}>
           Decline
        </Button>
        </Stack>
    );
    if(friendship.status==="accepted"){

        return btnUnFriend;
    };
    if(friendship.status==="declined"){
        return btnResend
    };
    if(friendship.status==="pending"){
        const {from,to}=friendship;
        if(from===currentUserId&& to===targetUserId){
            return btnCancelRequest
        }else if(from===targetUserId&& to ===currentUserId){
            return btnGroupReact
        }
    }
    
  return btnSendRequest;
    

}

export default ActionButton
