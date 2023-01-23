import { Box, Card, CardHeader, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import React from 'react'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

const IconStyle=styled(Box)(({theme})=>({
  width:20,
  height:20,
  marginRight:theme.spacing(2),
  marginTop:1,
  flexShrink:0,
}))


function ProfileSocialInfo({profile}) {
  const {facebookLink,instagramLink,linkedinLink,twitterLink}=profile

  const SOCIALS=[
    {
      value:"linkedin",
      icon: <IconStyle color="#0077b5"><LinkedInIcon/></IconStyle>,
      href:linkedinLink
    },
    {
      value:"facebook",
      icon: <IconStyle color="#4267B2"><FacebookIcon/></IconStyle>,
      href:facebookLink
    },
    {
      value:"instagram",
      icon: <IconStyle color="#E1306C"><InstagramIcon/></IconStyle>,
      href:instagramLink
    },
    {
      value:"twitter",
      icon: <IconStyle color="#1DA1F2"><TwitterIcon/></IconStyle>,
      href:twitterLink
    },
  ]
  return (
    <Card sx={{my:2}}>
      <CardHeader title="Social"/>
      <Stack spacing={3} sx={{p:2}}>
        {SOCIALS.map((link)=>(
          <Stack key={link.value} direction="row" alignItems="center">
            {link.icon}
            <Typography component="span" variant='subtitle2' color="text.primary">{link.href}</Typography>
          </Stack>
        ))}
      </Stack>
    </Card>
  )
}

export default ProfileSocialInfo
