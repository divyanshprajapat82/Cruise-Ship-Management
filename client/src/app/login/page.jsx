"use client"
import axios from 'axios'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { loginContext } from '../context/MainContext'
import { redirect, useSearchParams } from 'next/navigation'
import { toast } from 'react-toastify'

export default function page() {
    // let APIBASEURL = process.env.NEXT_PUBLIC_APIBASEURL
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    let { setUserRole, setToken, token } = useContext(loginContext)

    // const searchParams = useSearchParams();
    // const logoutFlag = searchParams.get("logout");

    // // 👇 When logout happens, this refires the component
    // useEffect(() => {
    //     // Reset fields or state if needed
    //     console.log("Login page reset because of logout");
    // }, [logoutFlag]);

    let APIURL = process.env.NEXT_PUBLIC_APIBASEURL

    useEffect(() => {
        if (token != "") {
            redirect("/")
        }
    }, [token])

    let loginSubmit = (e) => {
        // e.praventdefault()
        e.preventDefault()
        // e.preventDefault()
        // console.log(e);

        let obj = {
            email,
            password
        }

        axios.post(`${APIURL}/ship/auth/login`, obj)
            .then((res) => res.data)
            .then((finalData) => {
                if (finalData.status) {
                    setToken(finalData.token)
                    toast.success("You logged In")
                    console.log("You logged In")
                    // console.log(finalData.token)
                    // console.log(finalData.role[0].role)
                    setUserRole(finalData.role[0].role)

                    // localStorage.setItem("TOKEN", finalData.token);
                    // localStorage.setItem("USERROLE", finalData.role);
                    // setTimeout(() => {
                    //     window.location.reload();
                    // }, 1000);
                } else {
                    toast.error(finalData.message || "Invalid username or password")
                }
            })
            .catch((error) => {
                toast.error("Login failed. Please try again.")
            })

    }

    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-3xl font-semibold text-gray-900 dark:text-white">
                        {/* <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" /> */}
                        Ocean Voyager
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            <form onSubmit={loginSubmit} className="space-y-4 md:space-y-6">
                                <div>
                                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="name@company.com"
                                        required />
                                </div>
                                <div>
                                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 cursor-pointer"
                                                required />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label for="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                        </div>
                                    </div>
                                    {/* <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Forgot password?</a> */}
                                </div>
                                <button
                                    type="submit"
                                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-all duration-300 cursor-pointer">
                                    Sign in
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don’t have an account yet? <Link href="/register" className="text-blue-600 hover:underline dark:text-blue-500">Sign up</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
