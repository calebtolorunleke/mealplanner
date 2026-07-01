import React, { useContext } from 'react'

const useAuth = () => {
  const context = useContext(AuthContext)
  return (
    <div>useAuth</div>
  )
}

export default useAuth