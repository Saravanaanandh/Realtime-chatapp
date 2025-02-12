import { MessageSquare } from "lucide-react"

const NoChat = () => {
  return (
    <div className="w-full h-full flex items-center justify-center"> 
       <div className="flex flex-col items-center justify-center gap-5 text-blue-500 max-sm:text-[12px]">
          <div className="w-10 h-10 rounded-full bg-gray-800 p-2 border-[1px] animate-bounce max-sm:w-7 max-sm:h-7 flex items-center justify-center">
            <MessageSquare className="size-5 max-sm:size-3.5"/> 
          </div>
          <div className="text-center">
            <p className="font-bold">Welcome to chatty App</p>
            <p className="text-gray-600">click the user from the sidebar to start conversation...</p>
          </div>
       </div>
    </div>
  )
}

export default NoChat
