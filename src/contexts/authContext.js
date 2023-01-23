import {createContext, useEffect, useReducer} from "react"
import { useDispatch, useSelector } from "react-redux"
import apiService from "../app/apiService"
import {isValidToken} from "../utils/jwt"

const LOGIN_SUCCESS="AUTH.LOGIN"
const INITIALIZE="AUTH.INITTIALIZE"
const REGISTER_SUCCESS="AUTH.REGISTER"
const LOG_OUT="AUTH.LOGOUT"
const UPDATE="AUTH.UPDATE"

const initialState={
    isInitialized:false,
    isAuthenticated:false,
    user:null
}

const AuthContext=createContext({...initialState})

const loginReducer=(state,action)=>{
    switch (action.type) {
        case INITIALIZE:
            const {isAuthenticated,user}=action.payload
            return {
                ...state,
                isAuthenticated,
                isInitialized:true,
                user
            }
        case LOGIN_SUCCESS:
            return {...state,isAuthenticated:true,user:action.payload.user}
        case REGISTER_SUCCESS:
            return {...state,isAuthenticated:true,user:action.payload.user}    
        case LOG_OUT:
            return {...state,isAuthenticated:false,user:null}
        case UPDATE:
            const {
                name,
                avatarUrl,
                coverUrl,
                aboutMe,
                city,
                country,
                company,
                jobTitle,
                facebookLink,
                instagramLink,
                linkedinLink,
                twitterLink,
                friendCount,
                postCount,
            }=action.payload
            return {...state,
                user:{
                ...state.user,
                name,
                avatarUrl,
                coverUrl,
                aboutMe,
                city,
                country,
                company,
                jobTitle,
                facebookLink,
                instagramLink,
                linkedinLink,
                twitterLink,
                friendCount,
                postCount,}}
        default:
            return state
    }
}

const setSession=(accessToken)=>{
    if(accessToken){
        window.localStorage.setItem("accessToken",accessToken)
        apiService.defaults.headers.common.Authorization=`Bearer ${accessToken}`
    }else{
        window.localStorage.removeItem("accessToken")
        delete apiService.defaults.headers.common.Authorization
    }

}

function AuthProvider({children}){
    const [state,dispatch]=useReducer(loginReducer,initialState)
    const updatedUser=useSelector(state=>state.user.updatedUser)
    useEffect(()=>{
        const initialize=async()=>{
            try {
                const accessToken=window.localStorage.getItem("accessToken")
                if(accessToken&&isValidToken(accessToken)){
                    setSession(accessToken)
                    const response=await apiService.get("users/me")
                    const {user}=response.data.data
                    dispatch({type:INITIALIZE,payload:{user,isAuthenticated:true}})
                }else{
                    setSession(null)
                    dispatch({type:INITIALIZE,payload:{user:null,isAuthenticated:false}})
                }
            
            } catch (error) {
                    setSession(null)
                    dispatch({type:INITIALIZE,payload:{user:null,isAuthenticated:false}})
            }         
    }
            initialize()
        },[])
    useEffect(()=>{
        if(updatedUser) dispatch({type:UPDATE,payload:updatedUser})
    },[updatedUser])
    const login=async({email,password},callback)=>{
      
            const res=await apiService.post("auth/login",{email,password})
            const {user,accessToken}=res.data.data
            setSession(accessToken)
            dispatch({type:LOGIN_SUCCESS,payload:{user}})
        
        callback()
    }
    const register=async({name,email,password},callback)=>{
      
            const res=await apiService.post("users/",{name,email,password})
            const {user,accessToken}=res.data.data
            setSession(accessToken)
            dispatch({type:REGISTER_SUCCESS,payload:{user}})
        
        callback()
    }
    const logout=(callback)=>{
        setSession(null)
        dispatch({type:LOG_OUT})
        callback()
    }
    return (
    <AuthContext.Provider value={{...state,login,register,logout}}>
        {children}
    </AuthContext.Provider>
    )
}

export  {AuthContext,AuthProvider}