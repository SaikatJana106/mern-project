import React,{Children, createContext, useEffect, useState  }from 'react'
export const buycontext=createContext(null)
const BuyContext = ({Children}) => {
   
  return (
    <>

      <buycontext.Provider>
        {Children}
      </buycontext.Provider>
    </>
  )
}

export default BuyContext
