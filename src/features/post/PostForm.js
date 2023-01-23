import React, { useCallback } from 'react'
import {yupResolver} from "@hookform/resolvers/yup"
import * as Yup from "yup"
import { useForm } from 'react-hook-form'
import { alpha, Box, Card, Stack } from '@mui/material'
import {FormProvider,FTextField, FUploadImage} from "../../components/form"
import LoadingButton from "@mui/lab/LoadingButton"
import { createPost } from './postSlice'
import { useDispatch, useSelector } from 'react-redux'


const postSchema=Yup.object().shape({
  content:Yup.string().required("content required")
})
const defaultValues={
  content:"",
  image:""
}

function PostForm() {
  const dispatch=useDispatch()
  const {isLoading}=useSelector((state)=>state.post)
  const methods=useForm({
    resolver:yupResolver(postSchema),
    defaultValues
})
const {
  setValue,
  handleSubmit,
  formState:{isSubmitting},
  reset
}=methods

// const handleChange=(e)=>{
//   console.log()
//   const flie=fileInput.current.files[0]
//   setValue("image",flie)
// }
const handleDrop=useCallback(
  (acceptedFiles)=>{
    const file=acceptedFiles[0];
    if(file){
      setValue(
        "image",
        Object.assign(file,{
          preview:URL.createObjectURL(file),
        })
      )
    }
  },
  [setValue]
)

const onSubmit=(data)=>{
  const {content,image}=data
  dispatch(createPost({content,image})).then(()=>reset())
}
  return (
    <Card sx={{p:3,my:2}}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <FTextField 
          name="content" 
          fullWidth
          multiline
          rows={4}
          placeholder="Share what are you thinking!!!"
          sx={{
            "& fieldset": {
              borderWidth: `1px !important`,
              borderColor: alpha("#919EAB", 0.32),
            },
          }}/>
          {/* <FTextField 
          name="image"
          fullWidth /> */}
          {/* <input type="file" ref={fileInput} onChange={handleChange} /> */}
          <FUploadImage
          name="image"
          accept="image/*"
          maxSize={3145728}
          onDrop={handleDrop}
          />

          <Box sx={{
            display:"flex",
            justifyContent:"flex-end"
          }}>
            <LoadingButton
            size='small'
            loading={isSubmitting||isLoading}
            variant="contained"
            type='submit'>
            Post
            </LoadingButton>
          </Box>
        </Stack>
      </FormProvider>
    </Card>
  )
}

export default PostForm
