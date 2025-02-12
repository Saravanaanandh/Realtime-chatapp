import { useState } from "react"
import useAuthStore from "../store/useAuthStore.jsx"
import { Eye, EyeOff, Lock, Mail, MessageSquare } from "lucide-react"
import toast from 'react-hot-toast'
import {Link} from 'react-router'

const LoginPage = () => {
  const {login} = useAuthStore()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ 
    email:"",
    password:""
  })

  const validatedForm = ()=>{ 
    if(!formData.email) return toast.error('email is required')
    if(formData.password.length<6) return toast.error('password length must be atleast 6 characters')
    if(!formData.password) return toast.error('password is required') 

    return true
  }

  const handleSubmit = (e)=>{
    e.preventDefault() 
    const success = validatedForm() 
    
    if(success === true) login(formData)  
  }
    return (
      <div className="min-h-dvh w-full bg-gray-900 flex items-center justify-center text-blue-500">
        <div className="h-full flex flex-col items-center gap-10">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-blue-950 rounded-full mx-auto flex items-center justify-center"> 
              <MessageSquare className="text-blue-300"/>
            </div>
            <h2>Login</h2>
            <p>Get start with your free account</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-5"> 
                
                <div className="pr-2 border-blue-300 border-b-[1px] w-auto flex items-center px-1"> 
                  <Mail className="size-3.5 text-blue-200"/>
                  <input
                  className="outline-none border-none px-2 py-0.5 text-white"
                  type="email" 
                  placeholder="email"
                  value={formData.email}
                  onChange={(e)=>setFormData({...formData,email:e.target.value})}
                  /> 
                </div> 
                <div className="pr-2 border-blue-300 border-b-[1px] w-auto flex items-center px-1"> 
                  <Lock className="size-3.5 text-blue-200"/>
                  <input
                  className="outline-none border-none px-2 py-0.5 text-white"
                  type={showPassword? "text":"password"} 
                  placeholder="password"
                  value={formData.password}
                  onChange={(e)=>setFormData({...formData,password:e.target.value})}
                  />
                  <div className="cursor-pointer" onClick={()=>{setShowPassword(!showPassword)}}>
                  {
                    showPassword ? 
                      <Eye className="size-3.5"/> : <EyeOff className="size-3.5"/>
                  }
                  </div>
                </div>  
              <button 
                className="mt-2 cursor-pointer w-60 border-[1px] rounded-[5px] py-1 text-amber-400 hover:bg-amber-300 hover:text-black transition-colors duration-200" 
                type="submit" 
                onClick={handleSubmit}
              >
                <span>Login</span> 
              </button>
            </div>
          </form>
          <div>
            <p>Create an Account?
            <Link to="/signup"><span className="underline"> signup</span></Link>
            </p>
          </div>
        </div>
      </div>
    )
  }
  
  export default LoginPage
  