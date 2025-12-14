'use client'
import Link from 'next/link'
import React, { useContext } from 'react'
import { GiMirrorMirror, GiPartyFlags } from 'react-icons/gi'
import { IoIosFitness } from 'react-icons/io'
import { IoFastFoodSharp } from 'react-icons/io5'
import { MdMovieFilter } from 'react-icons/md'
import { SiPenpot } from 'react-icons/si'
import { loginContext } from '../context/MainContext'

export default function page() {
    let { profile } = useContext(loginContext)


    const getInitials = (name = "") => {
        return name
            .trim()
            .split(/\s+/)
            .map(n => n[0]?.toUpperCase() || "")
            .join("");
    };
    return (
        <>
            <section className="h-full bg-gray-50">
                <header className="flex items-center justify-between px-10 py-6 bg-white border-b border-gray-200">
                    <h1 className="text-3xl font-bold text-slate-900">View Orders</h1>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-semibold text-xs flex-shrink-0">{getInitials(profile.name)}</div>
                            <div className="ml-3 hidden md:block">
                                <p className="text-sm font-medium text-gray-700">{profile.name}</p>
                                <p className="text-xs font-medium text-gray-500">{profile.role}</p>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="bg-white p-4 border border-gray-200 rounded-xl overflow-hidden">
                    <div className="py-5 px-5 border-b border-gray-200 flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-slate-900">Quick Actions</h3>
                    </div>
                    <div className="p-5">
                        <div className="grid sm:grid-cols-2 grid-cols-1 gap-3">
                            <Link href={'/view-movie'} className="flex flex-col items-center gap-2 p-4 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer transition-all duration-200 font-sans text-sm text-slate-900 hover:bg-blue-50 hover:border-blue-600 hover:-translate-y-0.5">
                                <MdMovieFilter className="w-6 h-6 text-blue-600" />
                                <span>View Resort-Movie</span>
                            </Link>
                            <Link href={'/view-salon'} className="flex flex-col items-center gap-2 p-4 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer transition-all duration-200 font-sans text-sm text-slate-900 hover:bg-blue-50 hover:border-blue-600 hover:-translate-y-0.5">
                                <GiMirrorMirror className="w-6 h-6 text-blue-600" />
                                <span>View Beauty salon</span>
                            </Link>
                            <Link href={'/view-fitness'} className="flex flex-col items-center gap-2 p-4 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer transition-all duration-200 font-sans text-sm text-slate-900 hover:bg-blue-50 hover:border-blue-600 hover:-translate-y-0.5">
                                <IoIosFitness className="w-6 h-6 text-blue-600" />
                                <span>View Fitness center</span>
                            </Link>
                            <Link href={'/view-party-hall'} className="flex flex-col items-center gap-2 p-4 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer transition-all duration-200 font-sans text-sm text-slate-900 hover:bg-blue-50 hover:border-blue-600 hover:-translate-y-0.5">
                                <GiPartyFlags className="w-6 h-6 text-blue-600" />
                                <span>View Party hall</span>
                            </Link>
                            {/* <Link href={'/admin/view-catering-item'} className="flex flex-col items-center gap-2 p-4 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer transition-all duration-200 font-sans text-sm text-slate-900 hover:bg-blue-50 hover:border-blue-600 hover:-translate-y-0.5">
                            <IoFastFoodSharp className="w-6 h-6 text-blue-600" />
                            <span>View Catering Items</span>
                        </Link>
                        <Link href={'/admin/add-stationery'} className="flex flex-col items-center gap-2 p-4 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer transition-all duration-200 font-sans text-sm text-slate-900 hover:bg-blue-50 hover:border-blue-600 hover:-translate-y-0.5">
                            <SiPenpot className="w-6 h-6 text-blue-600" />
                            <span>View Stationery Items</span>
                        </Link> */}
                            {/* <button className="flex flex-col items-center gap-2 p-4 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer transition-all duration-200 font-sans text-sm text-slate-900 hover:bg-blue-50 hover:border-blue-600 hover:-translate-y-0.5">
                            <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                                <line x1="12" y1="12" x2="12" y2="12.01"></line>
                            </svg>
                            <span>New Product</span>
                        </button>
                        <button className="flex flex-col items-center gap-2 p-4 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer transition-all duration-200 font-sans text-sm text-slate-900 hover:bg-blue-50 hover:border-blue-600 hover:-translate-y-0.5">
                            <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                <line x1="3" y1="10" x2="21" y2="10"></line>
                            </svg>
                            <span>Create Order</span>
                        </button>
                        <button className="flex flex-col items-center gap-2 p-4 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer transition-all duration-200 font-sans text-sm text-slate-900 hover:bg-blue-50 hover:border-blue-600 hover:-translate-y-0.5">
                            <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                                <line x1="12" y1="18" x2="12" y2="12"></line>
                                <line x1="9" y1="15" x2="15" y2="15"></line>
                            </svg>
                            <span>Generate Report</span>
                        </button> */}
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}
