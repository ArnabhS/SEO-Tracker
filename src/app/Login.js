'use client'

import React from 'react'
import {signIn} from "next-auth/react"

const Login = () => {
  return (
    <div className='bg-white mt-8 max-w-md border border-blue-100 border-b-4 mx-auto rounded-xl p-4 py-6 text-center'>
        <h1 className='text-3xl text-semibold'>Login to your Account</h1>
    <button
    onClick={()=> signIn('google')}
    className='bg-indigo-500 text-white px-6 py-2 rounded-xl border border-indigo-700 border-b-4 inline-flex gap-2 items-center my-6'>
    <img className="w-4 invert" src="https://www.svgrepo.com/show/50809/google.svg" alt=""/>
        Login With google
        </button>
    </div>
  )
}

export default Login