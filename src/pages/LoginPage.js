import { Alert, Container, FormControlLabel, IconButton, InputAdornment, Link, Stack } from '@mui/material'
import React, { useState } from 'react'
import {useForm} from "react-hook-form"
import {FormProvider,FCheckbox,FTextField} from "../components/form"
import {Link as RouterLink, useLocation, useNavigate} from "react-router-dom"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoadingButton from "@mui/lab/LoadingButton"
import {yupResolver} from "@hookform/resolvers/yup"
import * as Yup from "yup"
import apiService from '../app/apiService'
import useAuth from '../hooks/useAuth'

const loginSchema=Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
})

const defaultValues={
  email:"",
  password:"",
  remember:true
}

function LoginPage() {
  const auth=useAuth()
  const location=useLocation();
  const navigate=useNavigate()
  const [showPassword,setShowPassword]=useState(true)
  const methods=useForm({
    resolver:yupResolver(loginSchema),
    defaultValues
  })
  const {
    setError,
    handleSubmit,
    formState:{errors,isSubmitting},
    reset
  }=methods

  const onSubmit=async(data)=>{
    const from=location.state?.from?.pathname||"/"
    const {email,password}=data
    try {
      await auth.login({email,password},()=>{
        navigate(from,{replace:true})
      })
    } catch (error) {
      reset()
      setError("responseError",error)
    }
  }

  return (
    <Container maxWidth="xs">
      
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {!!errors.responseError&&<Alert severity='error'>{errors.responseError.message}</Alert>}
          <Alert severity='info'>
            Don't have an account  {" "}
            <Link component={RouterLink} to="/register" variant='subtitle2' >Get started</Link>
          </Alert>
          <FTextField name="email" label="Email"/>
          <FTextField 
          name="password" 
          label="Password"
          type={showPassword ?'password':'text'}
          InputProps={{
            endAdornment:(
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={()=>setShowPassword((showPassword)=>!showPassword)}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
            
              />
        </Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{mb:2}}>
          <FCheckbox name="remember" label="Remember"/>
          <Link component={RouterLink} to="/" variant='subtitle2'>Forgot password?</Link>
        </Stack>
        <LoadingButton
        fullWidth
        type='large'
        variant='contained'
        loading={isSubmitting}>
          Submit
        </LoadingButton>
      </FormProvider>
    </Container>
  )
}

export default LoginPage
