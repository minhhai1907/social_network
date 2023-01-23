import { Box, Card, Container, Stack, TablePagination, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SearchInput from '../../components/SearchInput'
import {getUsers} from "./friendSlice"
import UserTable from './UserTable'

function AddFriend() {
  const [searchQuenry,setSearchQuery]=useState("")
  const [currentPage,setCurrentPage]=useState(0)
  const [rowsPerPage,setRowsPerPage]=useState(5)
  const dispatch=useDispatch()
  const {usersById,currentPageUsers,totalUsers}=useSelector(state=>state.friend)
  const users=currentPageUsers.map(userId=>usersById[userId])

  const handleChangePage = (event, newPage) => {
    console.log(newPage)
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };
  const handleSubmit =(filterName)=>{
    setSearchQuery(filterName)
  }
  useEffect(()=>{
    dispatch(getUsers({name:searchQuenry,page:currentPage+1,limit:rowsPerPage}))
  },[dispatch,currentPage,rowsPerPage,searchQuenry])
  return (
   <Container>
      <Typography variant='h4'> Add Friends</Typography>
      <Card>
      <Stack>
        <Stack direction={{xs:"column",md:"row"}} alignItems="center">
          <SearchInput handleSubmit={handleSubmit}/>
          <Typography>
              {totalUsers>1?`${totalUsers} users found`
              :totalUsers===1?`${totalUsers} user found`
              :`No user found`}
          </Typography>
          <Box sx={{flexGrow:1}}/>
          <TablePagination
            sx={{
              "& .MuiTablePagination-selectLabel,.MuiTablePagination-select,.MuiTablePagination-selectIcon":
              {
                display:{xs:"none",md:"block"}
              }
            }}
            component="div"
            count={totalUsers?totalUsers:0}
            page={currentPage}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5,10,25]}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Stack>
        <UserTable users={users}/>
      </Stack>
    </Card>
   </Container>
  )
}

export default AddFriend
