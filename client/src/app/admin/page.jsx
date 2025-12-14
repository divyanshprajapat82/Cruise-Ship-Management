'use client'
import React, { useContext, useEffect, useState } from 'react'
import { MdAppRegistration } from "react-icons/md";
import { GrAddCircle } from "react-icons/gr";
import Link from 'next/link';
import { loginContext } from '../context/MainContext';
import { redirect } from 'next/navigation';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaUsersViewfinder } from 'react-icons/fa6';



export default function page() {
    let { setUserRole, userRole, setToken, token, profile } = useContext(loginContext)

    // useEffect(() => {
    //     if (userRole == "" && token == "") {
    //         redirect("/")
    //     }
    // }, [token])

    let APIURL = process.env.NEXT_PUBLIC_APIBASEURL

    const [user, setUser] = useState([]);
    const [orders, setOrders] = useState([]);
    const [enrolls, setEnrolls] = useState([]);

    let totle = 0
    orders.forEach((price) => totle += price.price)

    const timeAgo = (timestamp) => {
        const diff = Date.now() - new Date(timestamp).getTime()

        const minutes = Math.floor(diff / 60000)
        const hours = Math.floor(diff / 3600000)
        const days = Math.floor(diff / 86400000)

        if (minutes < 1) return "Just now"
        if (minutes < 60) return `${minutes} minutes ago`
        if (hours < 24) return `${hours} hours ago`
        if (days < 7) return `${days} days ago`

        return new Date(timestamp).toLocaleDateString()
    }

    const getInitials = (name = "") => {
        return name
            .trim()
            .split(/\s+/)
            .map(n => n[0]?.toUpperCase() || "")
            .join("");
    };

    useEffect(() => {
        axios.get(`${APIURL}/ship/auth/view`)
            .then((res) => res.data)
            .then((finalData) => {
                setUser(finalData.data)
            })

        axios.get(`${APIURL}/ship/order/view`)
            .then((res) => res.data)
            .then((finalData) => {
                setOrders(finalData.data)
            })

        axios.get(`${APIURL}/ship/enroll/view`)
            .then((res) => res.data)
            .then((finalData) => {
                setEnrolls(finalData.data)
            })
    }, [])


    return (
        <>
            <div className=''>
                <div className="" id="dashboardView">
                    <div className="mb-8">
                        <h2 className="text-3xl font-semibold mb-2 text-slate-900">Welcome back, {profile.name}! 👋</h2>
                        <p className="text-gray-600 text-base">Here's what's happening with your business today.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                        <div className="bg-white border border-gray-200 rounded-xl p-5 flex gap-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                                <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="9" cy="7" r="4"></circle>
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                </svg>
                            </div>
                            <div className="flex-1">
                                <div className="text-sm text-gray-600 mb-1">Total Users</div>
                                <div className="text-3xl font-bold text-slate-900 mb-1">{user.length}</div>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl p-5 flex gap-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                                <span className="text-[28px] text-green-600">
                                    ₹
                                </span>
                            </div>
                            <div className="flex-1">
                                <div className="text-sm text-gray-600 mb-1">Revenue</div>
                                <div className="text-3xl font-bold text-slate-900 mb-1">₹ {totle.toLocaleString()}</div>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl p-5 flex gap-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                            <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                                <svg className="w-6 h-6 text-orange-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="9" cy="21" r="1"></circle>
                                    <circle cx="20" cy="21" r="1"></circle>
                                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                </svg>
                            </div>
                            <div className="flex-1">
                                <div className="text-sm text-gray-600 mb-1">Orders</div>
                                <div className="text-3xl font-bold text-slate-900 mb-1">{orders.length}</div>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl p-5 flex gap-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                                <svg className="w-6 h-6 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                                </svg>
                            </div>
                            <div className="flex-1">
                                <div className="text-sm text-gray-600 mb-1">Growth</div>
                                {(() => {
                                    const oldRevenue = 5000;
                                    const newRevenue = totle;

                                    let growth = 0;
                                    if (oldRevenue > 0) {
                                        growth = ((newRevenue - oldRevenue) / oldRevenue) * 100;
                                    }

                                    const formatted = growth.toFixed(1);

                                    return (
                                        <div className={`text-3xl font-bold ${growth >= 0 ? "text-green-600" : "text-red-600"}`}>
                                            {formatted}%
                                        </div>
                                    );
                                })()}
                            </div>
                        </div>
                    </div>


                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white border border-gray-200 rounded-xl">
                            <div className="py-5 px-5 border-b border-gray-200 flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-slate-900">Recent Activity</h3>
                            </div>
                            <div className="p-5 max-h-60 overflow-y-auto">
                                <div className="flex flex-col gap-4">
                                    {enrolls.length > 0 ?
                                        enrolls.map((items, index) => (
                                            <div className="flex gap-3 items-start" >
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-semibold text-sm flex-shrink-0">{getInitials(items.name)}</div>
                                                <div className="flex-1">
                                                    <div className="text-slate-900 text-sm leading-relaxed"><strong>{items.name}</strong> {items.phone}</div>
                                                    <div className="text-gray-600 text-xs mt-0.5">
                                                        <strong>{items.email}</strong>
                                                    </div>
                                                    <div className="text-gray-600 text-xs mt-0.5">{timeAgo(items.createdAt)}</div>
                                                </div>
                                            </div>
                                        ))
                                        :
                                        <div className='text-center pt-5 text-gray-600'>No Enrolled Users</div>
                                    }
                                    {/* <div className="flex gap-3 items-start">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-semibold text-sm flex-shrink-0">JS</div>
                                        <div className="flex-1">
                                            <div className="text-slate-900 text-sm leading-relaxed"><strong>Jane Smith</strong> updated profile</div>
                                            <div className="text-gray-600 text-xs mt-0.5">15 minutes ago</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 items-start">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-semibold text-sm flex-shrink-0">MJ</div>
                                        <div className="flex-1">
                                            <div className="text-slate-900 text-sm leading-relaxed"><strong>Mike Johnson</strong> added new product</div>
                                            <div className="text-gray-600 text-xs mt-0.5">1 hour ago</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 items-start">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-semibold text-sm flex-shrink-0">SW</div>
                                        <div className="flex-1">
                                            <div className="text-slate-900 text-sm leading-relaxed"><strong>Sarah Williams</strong> completed payment</div>
                                            <div className="text-gray-600 text-xs mt-0.5">2 hours ago</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 items-start">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-semibold text-sm flex-shrink-0">SW</div>
                                        <div className="flex-1">
                                            <div className="text-slate-900 text-sm leading-relaxed"><strong>Sarah Williams</strong> completed payment</div>
                                            <div className="text-gray-600 text-xs mt-0.5">2 hours ago</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 items-start">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-semibold text-sm flex-shrink-0">SW</div>
                                        <div className="flex-1">
                                            <div className="text-slate-900 text-sm leading-relaxed"><strong>Sarah Williams</strong> completed payment</div>
                                            <div className="text-gray-600 text-xs mt-0.5">2 hours ago</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 items-start">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-semibold text-sm flex-shrink-0">SW</div>
                                        <div className="flex-1">
                                            <div className="text-slate-900 text-sm leading-relaxed"><strong>Sarah Williams</strong> completed payment</div>
                                            <div className="text-gray-600 text-xs mt-0.5">2 hours ago</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 items-start">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-semibold text-sm flex-shrink-0">SW</div>
                                        <div className="flex-1">
                                            <div className="text-slate-900 text-sm leading-relaxed"><strong>Sarah Williams</strong> completed payment</div>
                                            <div className="text-gray-600 text-xs mt-0.5">2 hours ago</div>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                            <div className="py-5 px-5 border-b border-gray-200 flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-slate-900">Quick Actions</h3>
                            </div>
                            <div className="p-5">
                                <div className="grid grid-cols-2 gap-3">
                                    <Link href={'/admin/add-new-user'} className="flex flex-col items-center gap-2 p-4 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer transition-all duration-200 font-sans text-sm text-slate-900 hover:bg-blue-50 hover:border-blue-600 hover:-translate-y-0.5">
                                        <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="8.5" cy="7" r="4"></circle>
                                            <line x1="20" y1="8" x2="20" y2="14"></line>
                                            <line x1="23" y1="11" x2="17" y2="11"></line>
                                        </svg>
                                        <span>Add User</span>
                                    </Link>
                                    <Link href={'/admin/view-user'} className="flex flex-col items-center gap-2 p-4 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer transition-all duration-200 font-sans text-sm text-slate-900 hover:bg-blue-50 hover:border-blue-600 hover:-translate-y-0.5">
                                        {/* <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                                            <line x1="12" y1="12" x2="12" y2="12.01"></line>
                                        </svg> */}
                                        <span className='text-[26px] text-blue-600'>
                                            <FaUsersViewfinder />
                                        </span>
                                        <span>View All Users</span>
                                    </Link>
                                    <Link href={'/admin/add-item'} className="flex flex-col items-center gap-2 p-4 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer transition-all duration-200 font-sans text-sm text-slate-900 hover:bg-blue-50 hover:border-blue-600 hover:-translate-y-0.5">
                                        <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                            <line x1="16" y1="2" x2="16" y2="6"></line>
                                            <line x1="8" y1="2" x2="8" y2="6"></line>
                                            <line x1="3" y1="10" x2="21" y2="10"></line>
                                        </svg>
                                        <span>Create Order</span>
                                    </Link>
                                    <button className="flex flex-col items-center gap-2 p-4 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer transition-all duration-200 font-sans text-sm text-slate-900 hover:bg-blue-50 hover:border-blue-600 hover:-translate-y-0.5">
                                        <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                            <polyline points="14 2 14 8 20 8"></polyline>
                                            <line x1="12" y1="18" x2="12" y2="12"></line>
                                            <line x1="9" y1="15" x2="15" y2="15"></line>
                                        </svg>
                                        <span>Generate Report</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
