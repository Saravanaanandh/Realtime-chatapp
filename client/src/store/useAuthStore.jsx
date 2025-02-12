import {create} from 'zustand'
import axiosInstance from './../lib/axios.jsx'
import toast from 'react-hot-toast' 
import { io } from 'socket.io-client'

const BASE_URL =  import.meta.env.MODE === "development"?"http://localhost:5000":"/"

const useAuthStore = create((set,get)=>({

    authUser:null,

    isSigningUp:false,
    isLoggingIn:false,
    isLoggingOut:false,
    isupdatingProfile:false,
    isCheckAuth:true,
    socket:null,
    onlineUsers:[],

    checkAuth: async()=>{
        try{ 
            const res = await axiosInstance.get("/auth/check")
            set({authUser:res?.data})
            get().connected()
        }catch(err){
            console.log(`Error : ${err.message}`)
            set({authUser:null})
        }finally{
            set({isCheckAuth:false}) 
        }
    },

    signup:async(data)=>{
        set({isSigningUp:true})
        try{
            const res = await axiosInstance.post('/auth/signup',data)
            set({authUser:res.data}) 
            toast.success("signup successfully!")
            get().connected()
        }catch(err){
            toast.error(err.response.data.message)
        }finally{
        set({isSigningUp:false})
        }
    },

    login:async(data)=>{
        set({isLoggingIn:true})
        try{
            const res = await axiosInstance.post("/auth/login",data)
            set({authUser:res.data})
            toast.success("logged In")
            get().connected()
        }catch(err){
            toast.error(err.response.data.message)
        }finally{
            set({isLoggingIn:false})
        }
    },

    logout:async()=>{
        set({isLoggingOut:true})
        try{ 
            await axiosInstance.delete("/auth/logout")
            set({authUser:null})
            toast.success('logout successfully')
            get().disconnected()
        }catch(err){
            toast.error(err.message)
        }finally{
            set({isLoggingOut:false})
        }
    },
    updateProfile:async(data)=>{ 
        set({isupdatingProfile:true})
        try{ 
            const res = await axiosInstance.put("/auth/update-profile",data)
            set({authUser:res.data})
            toast.success('profile picture updated')
        }catch(err){ 
            toast.error(err.response.data.message)
        }finally{
            set({isupdatingProfile:false})
        }
    },

    connected:()=>{
        const {authUser} = get()
        if(!authUser || get().socket?.connected) return;

        const socket = io(BASE_URL,{
            query:{
                userId:get().authUser._id
            }
        })
        socket.connect()
        set({socket:socket})

        socket.on("getOnlineUsers",(userIds)=>{
            set({onlineUsers:userIds})
        })
    },

    disconnected:()=>{
        if(get().socket?.connected){
            get().socket.disconnect()
        }
    }

}))

export default useAuthStore