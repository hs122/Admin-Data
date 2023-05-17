import React from 'react'

const ErrorHandling = ({error}) => {
  return (
    <div className='error__Handling'>
      <p>Sorry, there was an error:</p>
      <p>Status: {error.status}</p>
      <p>Message: {error.message}</p></div>
  )
}

export default ErrorHandling