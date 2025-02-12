import { useState } from "react"
import useAuthStore from "../store/useAuthStore.jsx"
import defaultImg from "./../assets/user.png"
import {Camera, LogOut, Mail, User2} from 'lucide-react'

const UpdateProfile = () => {

    const {updateProfile, authUser, logout} = useAuthStore()

    const [image,setImage] = useState(null)
    
    const handleUpdate = async (e)=>{ 
      const file = e.target.files[0]
      if(!file) return;

      const reader = new FileReader()
      reader.readAsDataURL(file) 
      reader.onload = async ()=>{ 
        const base64Img = reader.result
        setImage(base64Img)
        await updateProfile({profilePic:base64Img})
      } 

    }
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-900  text-blue-500 py-5 max-sm:text-[0.9rem]">
        <div className="max-w-[500px] h-full flex flex-1 mx-5 p-3 bg-gray-800 rounded-2xl flex-col md:px-10">  
          <div>
            <div className="text-center">
              <h2 className=" my-5 text-3xl underline max-sm:text-xl">Profile</h2>
              <p className=" text-gray-500 max-sm:text-sm">Your profile Information</p>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative inline-block my-8">
                <img 
                  className="size-25 rounded-full object-cover object-center outline-2 outline-blue-400 outline-offset-3 max-sm:size-20"
                  src={image || authUser.profilePic || defaultImg} 
                />  
                <label htmlFor="profilePic" className="absolute bottom-0 right-0 rounded-full bg-gray-400 p-1 cursor-pointer ">
                  <Camera className="size-5 text-base-200 max-sm:size-4"/>
                  <input 
                  className="hidden"
                    type="file" 
                    id="profilePic"
                    accept="image/*"
                    onChange={handleUpdate} 
                  />
                </label>
              </div>  
            </div>
            <p className="text-center text-gray-500 text-sm">click the camera icon to update your photo</p>
          </div>
          <div className="w-auto flex flex-col gap-5 my-5 items-center px-1 flex-wrap text-wrap">
            <div className="w-full flex item-center justify-start  h-6 border-b-[1px] border-gray-500  ">
                <User2 className="size-3.5 mt-1.5 ml-3 text-gray-500 max-sm:size-3  max-sm:ml-0"/><p className="pl-2">{authUser.username}</p>
            </div>
            <div className="w-full flex item-center justify-start h-6 border-b-[1px] border-gray-500  ">
                <Mail className="size-3.5 mt-1.5 ml-3 text-gray-500 max-sm:ml-0"/><p className="pl-2">{authUser.email}</p>
            </div>
          </div>

          <div className=" w-auto flex flex-col gap-3 my-8 flex-wrap">
            <h3 className="text-black text-l font-bold text-center">Account Information</h3>

            <div className="flex items-center justify-between px-5 border-b-[1px] border-gray-500 pb-2">
              <p>Member Since</p>
              <p>{authUser.createdAt.split("T")[0]}</p>
            </div>
            <div className="flex items-center justify-between px-5 border-b-[1px] border-gray-500 pb-2">
              <p>Account Status</p>
              <p  className="text-green-500">Active</p>
            </div>
          </div> 
          <div className="w-full flex justify-center my-10"> 
            <div className="flex items-center justify-center w-30 gap-2 cursor-pointer p-1 border-black border-2 rounded-md text-black hover:bg-blue-500 hover:shadow-sm hover:border-blue-400 shadow-blue-400 transition-all duration-200 ease-in-out max-sm:w-20 h-7" onClick={logout}> 
              <LogOut className="size-3 sm:size-4"/>
              <span className="">Logout</span>  
            </div> 
          </div>
        </div>
      </div>
    )
  }
  
  export default UpdateProfile
  