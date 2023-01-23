import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import BlankLayout from '../layouts/BlankLayout'
import HomePage from '../pages/HomePage'
import AccountPage from '../pages/AccountPage'
import UserProfilePage from '../pages/UserProfilePage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import NotFoundPage from '../pages/NotFoundPage'
import AuthRequire from './AuthRequire'
import FriendList from '../features/friend/FriendList'
import FriendRequests from '../features/friend/FriendRequests'
import AddFriend from '../features/friend/AddFriend'

function Router() {
  return (
    <Routes>
        <Route path='/' element={<AuthRequire><MainLayout/></AuthRequire>}>
            <Route index element={<HomePage/>}/>
            <Route path='friends' element={<FriendList/>}/>
            <Route path='friends/requests' element={<FriendRequests/>}/>
            <Route path='friends/addFriend' element={<AddFriend/>}/>
            <Route path='account' element={<AccountPage/>}/>
            <Route path='user/:userId' element={<UserProfilePage/>}/>
        </Route>
        <Route element={<BlankLayout/>}>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/register' element={<RegisterPage/>}/>
            <Route path='*' element={<NotFoundPage/>}/>
        </Route>
    </Routes>
    
  )
}

export default Router
