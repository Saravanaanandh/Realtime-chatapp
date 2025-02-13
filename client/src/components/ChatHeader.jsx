
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
                    className="size-5.5 rounded-full sm:size-6.5 md:size-7 object-cover object-center"
                    src={selectedUser.profilePic || defaultImg} 
                    alt="profile" 
                    /> 
                </div> 
                <div className="text-start text-[14px] text-white max-sm:text-[13px]">
                <p className='max-w-[15ch] overflow-hidden'>{selectedUser.username}</p>
                <p className={`text-[10px] max-sm:text-[7px] ${onlineUsers.includes(selectedUser._id)?"text-green-400":"text-gray-500"}`}>{onlineUsers.includes(selectedUser._id)?"online":"offline"}</p>
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