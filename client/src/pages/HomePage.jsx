import useChatStore from "../store/useChatStore.jsx"
import Sidebar from "./../components/Sidebar.jsx"
import NoChat from "./../components/NoChat.jsx"
import Chat from "./../components/Chat.jsx"
import './../App.css'

const HomePage = () => {
 
  const {selectedUser} = useChatStore()
  
  
  return (
    <div className={`flex items-center justify-center w-full  h-full bg-gray-900 py-1 max-sm:fixed max-sm:top-[7vh]`} >
      <div  className={`max-w-[900px] h-full overflow-y-hidden flex flex-1 mx-1 bg-gray-800 rounded-2xl border-[1px] border-blue-400  rounded-bl-md rounded-tl-md`}>
        <div className="h-full overflow-y-scroll" id="sidebar">
          <div className="h-full max-sm:sticky max-sm:top-0" >
            <Sidebar />
          </div>
        </div>
        <div className="flex flex-1 h-full">
          {
            !selectedUser ? <NoChat/>:<Chat/>
          }
        </div>
      </div>
    </div>
  )
}

export default HomePage
