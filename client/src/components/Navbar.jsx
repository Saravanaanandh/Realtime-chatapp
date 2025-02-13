import { LogOut, MessageSquare, Settings, User2Icon } from "lucide-react"
import useAuthStore from "../store/useAuthStore.jsx"
import {Link} from 'react-router'

const Navbar = () => {
  const {authUser,logout} = useAuthStore()
 
  return (
    <div className="flex items-center justify-between px-8 py-4 bg-gray-900 max-sm:px-4 max-sm:py-2 text-blue-400 border-b-2 shadow-sm shadow-blue-400/40 z-20">
      <Link to={'/'}>
        <div className="flex items-center gap-2 cursor-pointer">
          <MessageSquare className="max-sm:size-[16px]"/>
          <p className="max-sm:hidden text-[14px]">Chat With Friends</p>
        </div>
      </Link>
      <div className="flex gap-4">
        <Link to={'/settings'}>
          <div className="flex items-center gap-2 cursor-pointer">
            <Settings className=" animate-[spin_2.5s_linear_infinite] max-sm:size-[16px]"/>
            <span className="max-sm:hidden text-[14px]">Settings</span>
          </div>
        </Link>

        {
          authUser && 
          <>
            <div className="flex gap-2">
              <Link to={'/update-profile'}>
                <div className="flex items-center gap-2 cursor-pointer">
                    <User2Icon className=" max-sm:size-[16px]"/>
                    <span className="max-sm:hidden text-[14px]">Proflile</span>
                </div>
              </Link>
              <div className="flex items-center gap-2 cursor-pointer " onClick={logout}>
                <LogOut className=" max-sm:size-[16px]"/>
                <span className="max-sm:hidden text-[14px]">Logout</span>
              </div> 
            </div>
          </>
        }
      </div>
    </div>
  )
}

export default Navbar
