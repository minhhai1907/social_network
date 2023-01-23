import {configureStore} from "@reduxjs/toolkit"
import commentReducer from "../features/comment/commentSlice"
import postReducer from "../features/post/postSlice"
import userReducer from "../features/user/userSlice"
import friendReducer from "../features/friend/friendSlice"


const rootReducer={
    comment:commentReducer,
    friend:friendReducer,
    user:userReducer,
    post:postReducer
}

const store=configureStore({reducer:rootReducer})

export default store