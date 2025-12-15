
'use client'

import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router'
// import Footer from './Footer'
import { FaDumbbell, FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation'
// import { useRouter } from 'next/router'

export default function Page() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    })
    // const router = useRouter();

    const router = useRouter();


    // let navigate = useNavigate()
    let APIURL = process.env.NEXT_PUBLIC_APIBASEURL

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match")
            return
        }

        // console.log(formData.password);


        // Validate password length
        if (formData.password.length < 6) {
            toast.error("Password must be at least 6 characters long")
            return
        }

        let obj = {
            // firstName: formData.firstName,
            // lastName: formData.lastName,
            email: formData.email,
            // userPhone: formData.phone,
            password: formData.password
        }
        axios.post(`${APIURL}/ship/auth/register`, obj)
            .then((res) => res.data)
            .then((finalData) => {
                if (finalData.status) {
                    toast.success("Registration successful! Please login.")
                    // router.push("/login")
                    router.push('/login')
                } else {
                    toast.error(finalData.message || "Registration failed")
                }
            })
            .catch((error) => {
                toast.error("Registration failed. Please try again.")
            })
    }

    return (
        <>
            {/* <ToastContainer hideProgressBar position="top-center" closeButton={false} autoClose={2000} /> */}
            {/* <div className='bg-[#121417] text-[#fff] px-4 py-5'>
                <Link href={"/"}>
                    <h1 className='flex items-center gap-2 text-[25px] text-[#fff] font-bold'>
                        GYM
                        <span className='text-[#FD4C00] rotate-90 mt-0.5'>
                            <FaDumbbell />
                        </span>
                    </h1>
                </Link>
                <div className=" flex items-center justify-center py-5">
                    <div className="w-full max-w-[420px] bg-[#1b1f24] border border-[#2a2f36] rounded-[14px] px-6 py-8 shadow-xl">
                        <h2 className="text-[28px] font-bold mb-1">Create Account</h2>
                        <p className="text-[#b8c0cc] mb-6">Join our gym and start your fitness journey</p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block mb-2 text-[14px] text-[#b8c0cc]">First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        placeholder="John"
                                        className="w-full bg-[#111418] border border-[#2a2f36] rounded-[10px] px-4 py-3 outline-none focus:border-[#FD4C00] transition-colors"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-[14px] text-[#b8c0cc]">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        placeholder="Doe"
                                        className="w-full bg-[#111418] border border-[#2a2f36] rounded-[10px] px-4 py-3 outline-none focus:border-[#FD4C00] transition-colors"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block mb-2 text-[14px] text-[#b8c0cc]">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    className="w-full bg-[#111418] border border-[#2a2f36] rounded-[10px] px-4 py-3 outline-none focus:border-[#FD4C00] transition-colors"
                                    required
                                />
                            </div>


                            <div>
                                <label className="block mb-2 text-[14px] text-[#b8c0cc]">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                        className="w-full bg-[#111418] border border-[#2a2f36] rounded-[10px] px-4 py-3 pr-12 outline-none focus:border-[#FD4C00] transition-colors"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-2/6 -translate-y-1/2 text-[18px] text-[#b8c0cc] hover:text-[#fff] cursor-pointer"
                                    >
                                        {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block mb-2 text-[14px] text-[#b8c0cc]">Confirm Password</label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Confirm your password"
                                        className="w-full bg-[#111418] border border-[#2a2f36] rounded-[10px] px-4 py-3 pr-12 outline-none focus:border-[#FD4C00] transition-colors"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-4 top-2/6 -translate-y-1/2 text-[18px] text-[#b8c0cc] hover:text-[#fff] cursor-pointer"
                                    >
                                        {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#FD4C00] hover:bg-[#fd4c00bb] font-bold px-4 py-3 rounded-[10px] border-2 border-[#FD4C00] hover:border-[#fd4c00bb] transition-colors cursor-pointer"
                            >
                                Create Account
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-[#b8c0cc] text-[14px]">
                                Already have an account?{' '}
                                <Link href={"/login"} className="text-[#FD4C00] hover:text-[#fd4c00bb] font-medium">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div> */}

            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <Link href="#" className="flex items-center mb-6 text-3xl font-semibold text-gray-900 dark:text-white">
                        {/* <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" /> */}
                        Ocean Voyager
                    </Link>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create an account
                            </h1>
                            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email" name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                                </div>
                                <div>
                                    <label for="password"

                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>
                                <div>
                                    <label for="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                    <input type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required="" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label for="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-blue-600 hover:underline dark:text-blue-500" href="#">Terms and Conditions</a></label>
                                    </div>
                                </div>
                                <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create an account</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account? <Link href={"/login"} className="font-medium text-blue-600 hover:underline dark:text-blue-500">Login here</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>


            {/* <Footer /> */}
        </>
    )
}
