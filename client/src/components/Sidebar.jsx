import { User2 } from "lucide-react" 
import useChatStore from "../store/useChatStore.jsx"
import { useEffect,useState } from "react"
import defaultImg from "./../assets/user.png"
import useAuthStore from "../store/useAuthStore.jsx"

const Sidebar = () => {

  const { selectedUser, setSelectedUser, users, getUsers} = useChatStore()
  const {onlineUsers} = useAuthStore()
  const [showOnlyOnline, setShowOnlyOnline] = useState(false)
 
  const filteredUsers = showOnlyOnline ? users.filter(user => onlineUsers.includes(user._id)) : users
    useEffect(()=>{
        getUsers()
    },[getUsers])

  return (
    <div className="min-w-8 h-full sm:w-40 md:w-50 flex flex-col gap-3 bg-gray-900 rounded-tl-md rounded-bl-md">
        <div className="flex ml-4 mt-4 text-blue-400 max-sm:ml-3 items-center "> 
            <User2 className="size-4 md:size-5"/><span className="hidden sm:block sm:text-[12px] md:block">&nbsp;Users</span>
        </div> 
        <div className="ml-5 flex gap-2 items-center justify-center max-sm:ml-0.5 max-sm:gap-0.5 max-md:gap-1">
            <input 
                type="checkbox" 
                checked={showOnlyOnline}
                onChange={()=> onlineUsers.length - 1 > 0 ? setShowOnlyOnline(!showOnlyOnline):setShowOnlyOnline(false)}
                className="w-3 h-3 cursor-pointer appearance-none border-2 border-green-500 rounded-full checked:bg-green-400 checked:border-green-500 focus:ring-1"
            /> 
            <span className={`${onlineUsers.length - 1 > 0 ? "text-green-400":"text-gray-400"}`}>{onlineUsers.length - 1 > 0 ? onlineUsers.length - 1: ""}<span className="max-sm:hidden text-white text-[14px]"> {onlineUsers.length -1 === 0 ? "No Person online" :  onlineUsers.length -1 === 1 ? "Person online": "Persons online" }</span></span>
        </div>
        <div> 
            {
                filteredUsers.map((user) =>(
                    <button
                        key={user._id}  
                        className={` w-full flex items-center gap-3 px-3 py-1 flex-start transition-colors duration-400 max-sm:px-1 ${selectedUser?._id === user._id? 'bg-gray-800 rounded-bl-md rounded-tl-md':""}`}
                        onClick={()=>setSelectedUser(user)}
                    >
                        <div className="relative inline-block">
                            <img 
                                className={`size-8 object-center object-cover rounded-full sm:size-9 md:size-10`}
                                src={user.profilePic || defaultImg} 
                                alt="profile" 
                            />
                            <div className={` ${ onlineUsers.includes(user._id) ? "absolute top-0 right-0 size-1.5 rounded-full bg-green-400": ""}`}></div>
                        </div>
                        <div className="hidden sm:block">
                            <div className="flex flex-col justify-center items-start ">
                                <p className="text-white text-[14px]">{user.username}</p>
                                <p className={`${onlineUsers.includes(user._id) ? "text-green-400" :"text-gray-500"} text-[12px]`}>{onlineUsers.includes(user._id) ? "online" : "offline"}</p> 
                            </div>
                        </div>
                    </button>
                ))
            }
        </div>
    </div>
  )
}

export default Sidebar
