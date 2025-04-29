import { Input, Select } from 'antd'
import React, { useState } from 'react'
import { Zoom } from 'react-awesome-reveal'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from "sonner"
import axios from "axios"


export const hosturl = import.meta.env.VITE_HOST_URL

const Signup = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [fullname, setFullname] = useState("")
    const [gender, setGender] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)


    const newUser = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            if (email.trim() === "" || fullname.trim() === "" || gender.trim() === "" || password.trim() === "") {
                toast.error("please fill in all fields")
                setTimeout(()=>{ 
                    setLoading(false)
                }, 1000)

            } else if (password !== confirmPassword) {
                toast.error("Password does not match")
                setTimeout(()=>{ 
                    setLoading(false)
                }, 1000)
            } else {
                const res = await axios.post(`${hosturl}/new/user`,{email, fullname, password, gender})
                toast.success(res.data.message)
                setTimeout(()=>{ 
                    setLoading(false)
                    navigate("/signin")
                }, 2000)
               
            }
            
        } catch (error) {
               toast.error(error.response.data.message ?? "client side error") 
               setLoading(false)
        }



    }


    return (
        <>
        <div className='min-h-screen flex flex-wrap'>
            <div className='md:flex-1 w-[100%] bg-[image:url(/assets/w2.jpg)] bg-center bg-cover p-5 text-center flex justify-center items-center'>
                <Zoom>
                    {/* <h1 className='md:text-7xl playwrite text-2xl text-emerald-500'>The only bad workout is the one you didn't do.</h1> */}
                </Zoom>
            </div>


            <div className='md:flex-1 w-[100%] flex justify-center items-center'>
                <Zoom>
                    <form className=" flex flex-col gap-4 bg-grey shadow-xl p-5 w-[max-content] rounded-xl" onSubmit={newUser}>
                        <div className=''>
                            <h1 className='text-2xl text-emerald-500'>Sign Up</h1>
                            <small>Go hard on yourself</small>
                        </div>
                        <div className=' flex flex-col gap-1 w-[300px] md:w-[400px]'>
                            <label htmlFor="">Email</label>
                            <Input type='text' placeholder='Enter Email' className='' onChange={(e)=>{setEmail(e.target.value)}}/>
                        </div>
                        <div className=' flex flex-col gap-1 w-[300px] md:w-[400px]'>
                            <label htmlFor="">Full Name</label>
                            <Input type='text' placeholder='Enter Full Name' className='' onChange={(e)=>{setFullname(e.target.value)}}/>
                        </div>
                        <div className=' flex flex-col gap-1 w-[300px] md:w-[400px]'>
                            <label htmlFor="">Gender</label>
                            <Select placeholder={"Select gender"} options={[
                                { label: "Male", value: "male" },
                                { label: "Female", value: "female" }
                            ]} onChange={(value)=>{setGender(value)}}/>
                        </div>
                        <div className=' flex flex-col gap-1 w-[300px] md:w-[400px]'>
                            <label htmlFor="">Password</label>
                            <Input type='password' placeholder='Enter password' className='' onChange={(e)=>{setPassword(e.target.value)}}/>
                        </div>
                        <div className=' flex flex-col gap-1 w-[300px] md:w-[400px]'>
                            <label htmlFor="">Confirm Password</label>
                            <Input type='password' placeholder='Confirm password' className='' onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
                        </div>
                        <div className=' flex flex-col gap-1 w-[300px] md:w-[400px]'>
                            <input type="submit" className='cursor-pointer border-none bg-emerald-500 w-[max-content] py-2 px-5 rounded-md text-black font-bold' value={"Sign up"} />
                        </div>
                        <div>
                            <span>Already have an Account ? <Link to={"/signin"}>Sign In</Link></span>
                        </div>
                    </form>
                </Zoom>
            </div>

        </div>
        <div className={loading ? 'fixed top-0 left-0 w-[100%] bg-opacity h-[100%] z-[483437]  flex justify-center items-center' : "hidden"}>
                <h1 className='text-xl md:text-3xl'>Loading...</h1>
        </div>
        </>
    )
}

export default Signup