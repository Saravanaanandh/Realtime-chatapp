
import useChatStore from '../store/useChatStore.jsx'
import useAuthStore from '../store/useAuthStore.jsx'
import defaultImg from "./../assets/user.png"
import { X } from "lucide-react"

const ChatHeader = () => {

    const {selectedUser, setSelectedUser} = useChatStore()
    const {onlineUsers} = useAuthStore()
  return (
    <div> 
        <div className="h-auto flex justify-between items-center border-b-[1px] border-b-blue-400 px-2 py-1">
            <div className="flex gap-3 items-center justify-center max-sm:gap-1">
                <div className='min-w-6'>
                    <img 
                    className="size-6 rounded-full sm:size-7 md:size-8 object-cover object-center"
                    src={selectedUser.profilePic || defaultImg} 
                    alt="profile" 
                    /> 
                </div> 
                <div className="text-start text-white max-sm:text-[13px]">
                <p className='w-auto max-sm:max-w-[15ch] overflow-hidden'>{selectedUser.username}</p>
                <p className={`text-[12px] max-sm:text-[10px] ${onlineUsers.includes(selectedUser._id)?"text-green-400":"text-gray-500"}`}>{onlineUsers.includes(selectedUser._id)?"online":"offline"}</p>
                </div> 
            </div>
            <div className=" rounded-full bg-gray-600 p-0.5 cursor-pointer">
            <X 
                className="text-white size-4 max-sm:size-2.5"
                onClick={()=>setSelectedUser(null)}
            />
            </div>
      </div>
    </div>
  )
}

export default ChatHeader