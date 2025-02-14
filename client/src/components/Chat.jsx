
import useChatStore from "../store/useChatStore.jsx"
import useAuthStore from "../store/useAuthStore.jsx"
import { useEffect, useRef,useState } from "react"
import ChatHeader from "./ChatHeader.jsx"
import SendMessage from "./SendMessage.jsx"
import defaultImg from "./../assets/user.png"
import { timeFormatType } from "./timeFormatType.jsx"
import './../App.css'
// import { useState} from "react"


const Chat = () => {

  const {messages,getMessages,selectedUser,setShowEmojiPicker,subscribeToMessages,unSubscribeFromMessages} = useChatStore()
  const {authUser} = useAuthStore()
  const messageEndRef = useRef(null)

  useEffect(()=>{
    getMessages(selectedUser._id)
    
    subscribeToMessages()

    return ()=> unSubscribeFromMessages()

  },[selectedUser._id,getMessages,subscribeToMessages,unSubscribeFromMessages])

  useEffect(()=>{
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  },[messages])

  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight);
    
    window.addEventListener("focus",handleResize)

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <div className={`w-full h-${windowHeight} flex flex-col justify-between"`}>
      <div className="">
        <ChatHeader /> 
      </div>
      <div className={`h-full overflow-y-scroll`} id="messagescroll">
        {/* max-sm:h-[23.4rem] */}
        <div className={`w-full h-${windowHeight} space-y-1 px-2 mt-1 max-sm:text-[10px]`} id="chatContainer" onClick={(e)=>{e.preventDefault();setShowEmojiPicker(false)}}>
          {
            messages.map(message => (
              message.senderId === authUser._id ? (
              <div
                key={message._id}
                className= "flex flex-col items-end" 
              >
                <div
                  className="flex gap-1"
                >
                  <div className="bg-blue-500 text-white max-w-[400px] rounded-md p-0.5 -space-y-2 overflow-x-hidden max-sm:max-w-[150px] max-sm:-space-y-1">
                    {
                      message.image && (
                        <div>
                          <img 
                            src={message.image}
                            className="max-w-[150px] max-h-[150px] rounded-md max-sm:max-w-[100px] max-sm:max-h-[100px]" 
                            alt="" 
                          />
                        </div>
                      )
                    }
                    <div className="text-wrap px-1 max-sm:px-0.5"><p>{message.text}</p></div>
                    <time className="text-nowrap text-[8px] px-1 max-sm:px-0.5 max-sm:text-[5px] text-black">
                      {timeFormatType(message.createdAt)}
                    </time>
                  </div>
                  <div className="min-w-3">
                    <img 
                      className="size-5 rounded-full object-cover object-center max-sm:size-3"
                      src={message.senderId === authUser._id 
                        ? authUser.profilePic || defaultImg 
                        : selectedUser.profilePic || defaultImg} 
                      alt="" />
                  </div>
                </div>
              </div>
              )
              :(
                <div
                key={message._id}
                className= "flex flex-col items-start"
                >
                <div
                  className="flex gap-1"
                >
                  <div className="min-w-3">
                    <img 
                      className="size-5 rounded-full object-cover object-center max-sm:size-3"
                      src={message.senderId === authUser._id 
                        ? authUser.profilePic || defaultImg 
                        : selectedUser.profilePic || defaultImg} 
                      alt="" />
                  </div>
                  <div className="bg-gray-600 text-white max-w-[400px] rounded-md p-0.5 -space-y-2 overflow-x-hidden max-sm:max-w-[150px] max-sm:-space-y-1">
                    {
                      message.image && (
                        <div>
                          <img 
                            src={message.image}
                            className="max-w-[150px] max-h-[150px] rounded-md max-sm:max-w-[100px] max-sm:max-h-[100px]" 
                            alt="" 
                          />
                        </div>
                      )
                    }
                    <div className="text-wrap  px-1 max-sm:px-0.5"><p>{message.text}</p></div>
                    <time className="text-nowrap px-1 max-sm:px-0.5 text-[8px] max-sm:text-[5px] text-black">
                      {timeFormatType(message.createdAt)}
                    </time>
                  </div>
                </div>
              </div>
              )
            ))
          }
          <div ref={messageEndRef}/>
        </div>
      </div>
      <SendMessage />
    </div>
  )
}

export default Chat