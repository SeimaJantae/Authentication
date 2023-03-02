import React from 'react'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './components/pages/LoginPage'
import ProfilePage from './components/pages/ProfilePage'
import RegisterPage from './components/pages/RegisterPage'

type Props = {}

export default function App({}: Props) {
  return (
    <>
    <Routes>
      <Route path ="/login" element ={<LoginPage/>}/>
      <Route path ="/register" element ={<RegisterPage/>}/>
      <Route path ="/profile" element ={<ProfilePage/>}/>
      <Route path ="/" element ={<Navigate to ="/login"/>}/>
      <Route path ="*" element ={<Navigate to ="/login"/>}/>
    </Routes>
    </>
  )
}       

const PageNotFound = () => {
  <div>
    <h1>404 - Page not found</h1>
    <Link to = "/">Go to home page</Link>
  </div>
}