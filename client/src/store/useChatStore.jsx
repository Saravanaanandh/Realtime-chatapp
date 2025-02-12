import {create} from 'zustand'
import axiosInstance from '../lib/axios.jsx'
import toast from 'react-hot-toast'
import useAuthStore from './useAuthStore.jsx'

const useChatStore = create((set,get)=>({

    selectedUser:null,
    users:[],
    messages:[],
    onlineUsers:[],
    isUsersLoading:false,
    isMessageLoading:false,
    showEmojiPicker:false,


    setShowEmojiPicker:(bool)=>{ 
        set({showEmojiPicker:bool})
    },

    getUsers:async()=>{
        set({isUsersLoading:true})
        try{
            const res = await axiosInstance.get('/message/users') 
            set({users:res.data})  
        }catch(err){
            toast.error(err.response.data.message)
        }
        finally{
            set({isUsersLoading:false}) 
        }
    },

    setSelectedUser:(userId)=>{
        set({selectedUser:userId})
    },

    getMessages:async(userId)=>{
        set({isMessageLoading:true})
        try{  
            const res = await axiosInstance.get(`/message/${userId}`)
            set({messages:res.data})
        }catch(err){
            toast.error(err.response.data.message)
        }finally{
            set({isMessageLoading:false})
        }
    },

    sendmessage:async (data)=>{
        try{
            const {selectedUser,messages} = get()
            const res = await axiosInstance.post(`/message/${selectedUser._id}`,data)
            set({messages:[...messages,res.data]})
        }catch(err){
            toast.error(err.response.data.message)
        }
    },
    subscribeToMessages:()=>{
        const {selectedUser} = get() 
        if(!selectedUser) return;

        const socket = useAuthStore.getState().socket
        socket.on("newMessage",(message)=>{

            if(message.senderId !== selectedUser._id) return;

            set({messages:[...get().messages, message]})
        })
    },
    unSubscribeFromMessages:()=>{
        const socket = useAuthStore.getState().socket
        socket.off("newMessage") 
    }
}))

export default useChatStore