import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx' 
import HomePage from './pages/HomePage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import UpdateProfile from './pages/UpdateProfile.jsx'
import useAuthStore from './store/useAuthStore.jsx'
import { useEffect } from 'react'
import {Loader} from 'lucide-react'
import { Toaster } from 'react-hot-toast'
import './App.css'

function App() { 
  const {authUser,checkAuth,isCheckAuth} = useAuthStore()

  useEffect(()=>{
    checkAuth()
  },[checkAuth])

  if(isCheckAuth && !authUser){
    return (
      <div className=' flex items-center justify-center h-full bg-black text-white'>
        <Loader className='size-10 animate-spin'/>
      </div>
    )
  }
  return (
    <div className='poppins-regular h-svh flex flex-col bg-gray-900'> 
      <Navbar/> 
      <Routes>
        <Route path='/' element={authUser ? <HomePage/> : <Navigate to='/login'/>}/>
        <Route path='/signup' element={!authUser ?<SignUpPage/>: <Navigate to='/'/>}/>
        <Route path='/login' element={!authUser ?<LoginPage/>: <Navigate to='/'/>}/>
        <Route path='/settings' element={<SettingsPage/>}/>
        <Route path='/update-profile' element={authUser ?<UpdateProfile/> : <Navigate to='/login'/>}/>
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
