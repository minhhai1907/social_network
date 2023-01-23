import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import useAuth from "../../hooks/useAuth"
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup"
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from './userSlice';
import {FormProvider,FTextField, FUploadAvatar} from "../../components/form"
import { Box, Card, Grid, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';

const AccountSchema=Yup.object().shape({
  name:Yup.string().required("Name is required"),
})

function AccountGeneral() {
  const {user}=useAuth()
  const dispatch=useDispatch()
  const {isLoading}=useSelector(state=>state.user)
  const defaultValues={
    name:user?.name||"",
    email:user?.email||"",
    jobTitle:user?.jobTitle||"",
    company:user?.company||"",
    avatarUrl:user?.avatarUrl||"",
    coverUrl:user?.coverUrl||"",
    phoneNumber:user?.phoneNumber||"",
    address:user?.address||"",
    city:user?.city||"",
    country:user?.country||"",
    aboutMe:user?.aboutMe||"",
  }
  const methods=useForm({
    resolver:yupResolver(AccountSchema),
    defaultValues})
    const {
      setValue,
      handleSubmit,
      formState:{isSubmitting}
    }=methods

    const onSubmit=(data)=>{
      dispatch(updateUserProfile({userId:user._id,...data}))
    }
    const handleDrop=useCallback(
      (acceptedFiles)=>{
        const file=acceptedFiles[0];
        if(file){
          setValue(
            "avatarUrl",
            Object.assign(file,{
              preview:URL.createObjectURL(file),
            })
          )
        }
      },
      [setValue]
    )
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{py:10,px:3,textAlign:"center"}}> 
            <FUploadAvatar
            name="avatarUrl"
            accept="image/*"
            maxSize={3145728}
            onDrop={handleDrop}
            helperText={
              <Typography
              variant='caption'
              sx={{
                mt:2,
                mx:"auto",
                display:"block",
                textAlign:"center",
                color:"text.secondary"
              }}
              >
                Choosing your Avatar!!!
              </Typography>
            }/>
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <Card sx={{p:3}}>
              <Box
              sx={{
                my:2,
                display:"grid",
                columnGap:2,
                rowGap:3,
                gridTemplateColumns:{
                  xs:'repeat(1, 1fr)',
                  md:'repeat(2, 1fr)'
              }}}
             >
              <FTextField name="name" label="Name"/>
              <FTextField name="email" label="Email" disabled/>

              <FTextField name="jobTitle" label="Job Title"/>
              <FTextField name="company" label="Company"/>

              <FTextField name="city" label="City"/>
              <FTextField name="country" label="Country"/>
              </Box>
              <Stack spacing={2} alignItems="flex-end">
                <FTextField name="coverUrl" label="Home Profile cover Url"/>
                <FTextField 
                name="aboutMe"
                multiline
                rows={4}
                label="About Me"/>
                <LoadingButton
                variant='contained'
                type='submit'
                loading={isSubmitting||isLoading}>
                  Save Change
                </LoadingButton>
              </Stack>

              
            </Card>
          </Grid>
      </Grid>
    </FormProvider>
  )
}

export default AccountGeneral
