import { Box, Card, CardHeader, Link, Stack, Typography } from '@mui/material'
import React from 'react'
import PinDropIcon from '@mui/icons-material/PinDrop';
import EmailIcon from '@mui/icons-material/Email';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import {styled} from "@mui/material/styles"

const IconStyle=styled(Box)(({theme})=>({
  width:20,
  height:20,
  marginRight:theme.spacing(2),
  marginTop:1,
  flexShrink:0,
}))

function ProfileAbout({profile}) {
  const {aboutMe,email,country,city,jobTitle}=profile
  return (
    <Card>
      <CardHeader title="About" variant="h6" />
      <Stack spacing={2} sx={{p:3}}>
        <Typography variant='body2'>{aboutMe}</Typography>
        <Stack direction="row" alignItems="center">
          <IconStyle><PinDropIcon/></IconStyle>
          <Typography variant='body2'>
          <Link component="span" variant='subtitle2' color="text.primary">{city} {country}</Link>
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center">
          <IconStyle><EmailIcon/></IconStyle>
          <Typography variant='body2'>
          {email}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center">
          <IconStyle><BusinessCenterIcon/></IconStyle>
          <Typography variant='body2'>
          <Link component="span" variant='subtitle2' color="text.primary">{jobTitle}</Link>
          </Typography>
        </Stack>
      </Stack>
    </Card>
  )
}

export default ProfileAbout
