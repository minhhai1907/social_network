import { Box, Card, InputAdornment, Stack } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { FormProvider, FTextField } from '../../components/form'
import useAuth from '../../hooks/useAuth'
import {updateUserProfile} from "./userSlice"
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { LoadingButton } from '@mui/lab'


const SOCIAL_LINKS=[
  {
    value:"facebookLink",
    icon:<FacebookIcon sx={{fontSize:30}}/>
  },
  {
    value:"instagramLink",
    icon:<InstagramIcon sx={{fontSize:30}}/>
  },
  {
    value:"twitterLink",
    icon:<TwitterIcon sx={{fontSize:30}}/>
  },
  {
    value:"linkedinLink",
    icon:<LinkedInIcon sx={{fontSize:30}}/>
  },
]

function AccountSocialLinks() {
  const dispatch=useDispatch()
  const {user}=useAuth()
  const defaultValues={
    facebookLink:user?.facebookLink||"",
    instagramLink:user?.instagramLink||"",
    twitterLink:user?.twitterLink||"",
    linkedinLink:user?.linkedinLink||""
  }
  const methods=useForm({defaultValues})
  const{
    handleSubmit,
    formState:{isSubmitting}
  }=methods

  const onSubmit=async(data)=>{
    console.log(data)
    dispatch(updateUserProfile({userId:user._id,...data}))
  }
  return (
    <Card sx={{p:3,maxWidth:800,mx:"auto"}} >
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2} alignItems="flex-end">
        {SOCIAL_LINKS.map(link=>(
          <FTextField 
          key={link.value}
          name={link.value}
          InputProps={{
            startAdornment: <InputAdornment position="start">{link.icon}</InputAdornment>
          }}/>
        ))}
        <LoadingButton
        variant='contained'
        loading={isSubmitting}
        type="submit">
           Save change
        </LoadingButton>

      </Stack>
    </FormProvider>
    </Card>
  )
}

export default AccountSocialLinks
