import { X,Image, Send, Smile } from "lucide-react"
import useChatStore from "../store/useChatStore.jsx"
import { useRef,useState } from "react"
import toast from 'react-hot-toast'
import EmojiPicker from 'emoji-picker-react'
import './../App.css'

const SendMessage = () => {

    const {sendmessage,showEmojiPicker, setShowEmojiPicker} = useChatStore()

    const [imagePre, setImagePre] = useState(null)
    const [text, setText] = useState('') 

    const fileInputRef = useRef(null)
    const inputRef = useRef(null)

    const handleSendMessage = async(e)=>{
        e.preventDefault()

        if(!text?.trim() && !imagePre) return;
        try{
            await sendmessage({
                text:text.trim(),
                image:imagePre
            })
            setImagePre(null)
            fileInputRef.current.value = ""
            setText('')

        }catch(err){
            toast.error(err.message)
        }
    }

    const removeImage = ()=>{
        setImagePre(null)
        if(fileInputRef.current) fileInputRef.current.value = ''
    }

    const handleImage = (e)=>{
        const file = e.target.files[0]
        
        if(!file?.type.startsWith('image/')){
            toast.error('please select the correct image format') 
            return
        } 

        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = ()=>{
            setImagePre(reader.result)
        }
    }

    const handleEmojiClicked = (emojiObject)=>{
        setText(text => text.concat(emojiObject.emoji))
        inputRef.current.focus()
    }

  return (
    <div className="w-full space-y-1 ">
        <div>
            {imagePre && (
                <div className="relative inline-block"> 
                    <img 
                        className="w-20 h-20 object-cover object-center rounded-xl max-sm:w-10 max-sm:h-10"
                        src={imagePre} 
                        alt="" 
                    />  
                    <button
                        type="button"
                        className="absolute -top-1 -right-1 rounded-full p-1 bg-black text-white cursor-pointer"
                        onClick={removeImage}
                    >
                        <X className="size-3 max-sm:size-1.5"/>
                    </button>
                </div>
            )}

        </div>
        <form className="w-full  bg-gray-600 flex h-[4vh] gap-2 justify-between items-center relative rounded-2xl mb-1 px-1.5" onSubmit={handleSendMessage}>
            <div>
                <button
                    type='button'
                    className="cursor-pointer flex items-center justify-center"
                    onClick={()=>setShowEmojiPicker(!showEmojiPicker)}
                >
                    <Smile className={`${showEmojiPicker ? 'text-white':''} size-5 max-sm:size-3`}/>
                </button>
                {
                    showEmojiPicker && (
                        <div className="absolute bottom-3 left-0  emoji-picker">
                            <EmojiPicker 
                                onEmojiClick={handleEmojiClicked}  
                                previewConfig={{ showPreview: false }}
                                searchDisabled={true}
                                style={{ width: "430px", height: "260px" }}
                            />
                        </div>
                    )
                }
            </div>
            <input 
                className="w-full outline-none border-none text-white py-0.5 max-sm:text-[12px]"
                type="text" 
                ref={inputRef}
                placeholder="Type something to send..."
                value={text}
                onChange={(e)=>setText(e.target.value)}
            />
            <div className="flex gap-1"> 
                <input 
                    type="file" 
                    accept="image/png, image/jpeg, image/jpg, image/gif, image/webp"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleImage}
                />

                <button
                    type="button"
                    className="cursor-pointer"
                    onClick={()=>fileInputRef.current?.click()}
                >
                    <Image className={` ${imagePre ? 'text-green-500' : ''} size-4 max-sm:size-3`}/>
                </button>

                <button
                    type="submit"
                    className={`${!text.trim() && !imagePre ? 'disabled cursor-not-allowed':'cursor-pointer'} `}
                    onClick={handleSendMessage}
                >
                    <Send className={`${imagePre || text ? 'text-blue-500' : ''} size-4 max-sm:size-3`}/>
                </button>
            </div>
        </form>
    </div>
  )
}

export default SendMessage