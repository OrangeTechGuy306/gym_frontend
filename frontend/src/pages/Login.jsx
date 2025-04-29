import React, { useState } from 'react'
import {Input} from "antd"
import { Link, useNavigate } from 'react-router-dom'
import {Zoom} from "react-awesome-reveal"
import { toast } from 'sonner'
import axios from 'axios'
import { hosturl } from './Signup'

const LoginPage = () => {


    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)  
    
    
    const loginUser = async(e)=>{
        e.preventDefault()
        setLoading(true)
        try {
            if(!email || !password){
                toast.error("All fields are required")
                setTimeout(()=>{
                    setLoading(false)
                }, 1000)
            }else{
                const res = await axios.post(`${hosturl}/user`,{email, password})
                localStorage.setItem("pguy_token", res.data.message)
                toast.success("Login Successful")
                setTimeout(()=>{
                    setLoading(false)
                    navigate("/")
                }, 2000)
            }
            
        } catch (error) {
            toast.error(error.response.data.message ?? "client side error")
            setTimeout(()=>{
                setLoading(false)
            }, 1000)
        }
    }
    
  return (
    <>
    <div className='min-h-screen flex flex-wrap'>
        <div className='md:flex-1 w-[100%] flex justify-center items-center'>
            <Zoom>
                <form className=" flex flex-col gap-4 bg-grey shadow-xl p-5 w-[max-content] rounded-xl" onSubmit={loginUser}>
                    <div className=''>
                        <h1 className='text-2xl text-emerald-500'>Login</h1>
                        <small>Go hard on yourself</small>
                    </div>
                    <div className=' flex flex-col gap-1 w-[300px] md:w-[400px]'>
                        <label htmlFor="">Email</label>
                        <Input type='email' placeholder='Enter username' className='' onChange={(e)=>{setEmail(e.target.value)}}/>
                    </div>
                    <div className=' flex flex-col gap-1 w-[300px] md:w-[400px]'>
                        <label htmlFor="">Password</label>
                        <Input type='password' placeholder='Enter password' className='' onChange={(e)=>{setPassword(e.target.value)}}/>
                    </div>
                    <div className=' flex flex-col gap-1 w-[300px] md:w-[400px]'>
                        <input type="submit" className='cursor-pointer border-none bg-emerald-500 w-[max-content] py-2 px-5 rounded-md text-black font-bold' value={"Login"}/>
                    </div>
                    <div>
                        <span>Don't have an Account ? <Link to={"/signup"}>Sign Up</Link></span>
                    </div>
                </form>
            </Zoom>
        </div>
        <div className='md:flex-1 w-[100%] bg-[image:url(/assets/w1.jpeg)] bg-center bg-cover p-5 text-center flex justify-center items-center'>
        <Zoom>
            <h1 className='md:text-7xl playwrite text-2xl text-emerald-500'>Sweat is your body's  way of showing <br /> progress.</h1>
        </Zoom>
        </div>
    </div>
    <div className={loading ? 'fixed top-0 left-0 w-[100%] bg-opacity h-[100%] z-[483437]  flex justify-center items-center' : "hidden"}>
                <h1 className='text-xl md:text-3xl'>Loading...</h1>
        </div>
    </>
  )
}

export default LoginPage