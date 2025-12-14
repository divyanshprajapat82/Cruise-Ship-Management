"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useContext } from 'react'
import Image from 'next/image'
import { GrAddCircle } from 'react-icons/gr'
import { IoHomeOutline } from 'react-icons/io5'
import { MdAppRegistration } from 'react-icons/md'
import { TbUsers } from "react-icons/tb";
import { loginContext } from '../context/MainContext'

export default function layoutBar({ children }) {
    const navPath = usePathname()
    const { userRole, profile } = useContext(loginContext)

    const getInitials = (name = "") => {
        return name
            .trim()
            .split(/\s+/)
            .map(n => n[0]?.toUpperCase() || "")
            .join("");
    };

    return (
        <>
            {userRole === "admin" ?
                <div className='flex h-[calc(100vh-80px)]'>
                    <div className=' bg-[#fff] text-[#000] top-[64px] h-fit'>
                        <aside className="md:w-64 h-[calc(100vh-80px)] w-17 flex flex-col justify-between transition-transform duration-300 z-50 shadow-xl md:translate-x-0">
                            <div className=''>
                                <div className="p-4 border-b">
                                    <div className="flex items-center">
                                        <Image src="https://tailwindflex.com/images/logo.svg" alt="Logo" width={32} height={32} />
                                        <span className="ml-2 text-xl font-semibold text-gray-800 hidden md:block">Dashboard</span>
                                    </div>
                                </div>

                                <nav className="mt-5 px-2 space-y-2">
                                    <Link href="/admin" className={` ${navPath === "/admin" ? "bg-indigo-100 text-indigo-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"} group flex items-center w-full md:justify-start justify-center px-2 py-2 text-base font-medium rounded-md`}>
                                        <IoHomeOutline className={` ${navPath === "/admin" ? "bg-indigo-100 text-indigo-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"} md:mr-3 mr-0 flex h-6 w-6`} />
                                        <span className="hidden md:block">Dashboard</span>
                                    </Link>

                                    <Link href="/admin/view-user" className={` ${navPath === "/admin/view-user" || navPath === "/admin/add-new-user" ? "bg-indigo-100 text-indigo-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"} group flex items-center w-full md:justify-start justify-center px-2 py-2 text-base font-medium rounded-md`}>
                                        <MdAppRegistration className={` ${navPath === "/admin/view-user" || navPath === "/admin/add-new-user" ? "bg-indigo-100 text-indigo-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"} md:mr-3 mr-0 flex h-6 w-6`} />
                                        <span className="hidden md:block">User Register</span>
                                    </Link>

                                    <Link href="/admin/add-item" className={` ${navPath === "/admin/add-item" || navPath === "/admin/add-movie" ? "bg-indigo-100 text-indigo-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"} group flex items-center w-full md:justify-start justify-center px-2 py-2 text-base font-medium rounded-md`}>
                                        <GrAddCircle className={` ${navPath === "/admin/add-item" ? "bg-indigo-100 text-indigo-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"} md:mr-3 mr-0 flex h-6 w-6`} />
                                        <span className="hidden md:block">Add Item</span>
                                    </Link>

                                </nav>
                            </div>

                            <div className="mb-5 p-4">
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-semibold text-xs flex-shrink-0">{getInitials(profile?.name)}</div>
                                        <div className="ml-3 hidden md:block">
                                            <p className="text-sm font-medium text-gray-700">{profile?.name}</p>
                                            <p className="text-xs font-medium text-gray-500">{profile?.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>

                    <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
                        {children}
                    </main>
                </div>
                :
                <div className='text-center pt-10'>Admin Only</div>
            }
        </>
    )
}