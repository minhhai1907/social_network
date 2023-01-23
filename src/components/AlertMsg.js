import React from 'react'
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function AlertMsg() {
  return (
    <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        />
  )
}

export default AlertMsg
