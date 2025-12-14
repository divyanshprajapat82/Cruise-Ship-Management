'use client'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export default function page() {

    const [user, setUser] = useState([]);

    let APIURL = process.env.NEXT_PUBLIC_APIBASEURL

    let viewUser = () => {
        axios.get(`${APIURL}/ship/auth/view`)
            .then((res) => res.data)
            .then((finalData) => {
                if (finalData.status) {
                    setUser(finalData.data)
                } else {
                    toast.error(finalData.message || "Invalid username or password")
                }
            })
            .catch((error) => {
                toast.error("Login failed. Please try again.")
                console.error("Login error:", error)
            })
    }

    const getInitials = (name = "") => {
        return name
            .trim()
            .split(/\s+/)
            .map(n => n[0]?.toUpperCase() || "")
            .join("");
    };

    let handleDelete = (id) => {
        axios.delete(`${APIURL}/ship/auth/delete/${id}`)
            .then((res) => res.data)
            .then((finalData) => {
                toast.success("User Deleted")
                viewUser()
            })
    }

    useEffect(() => {
        viewUser()
    }, [])

    return (
        <>
            <div className="block" id="usersView">
                <div className="mb-8">
                    <h2 className="text-3xl font-semibold mb-2 text-slate-900">Add Voyager</h2>
                    <p className="text-gray-600 text-base">Manage and monitor all user accounts.</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <div className="py-5 px-5 border-b border-gray-200 flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-slate-900">All Users</h3>
                        <Link href={'/admin/add-new-user'}>
                            <button className="py-2 px-4 bg-blue-600 text-white border-none rounded-lg font-medium text-sm cursor-pointer transition-colors hover:bg-blue-700">Add New User</button>
                        </Link>
                    </div>
                    <div className="p-5">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 border-b-2 border-gray-200">
                                        <th className="py-3 px-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Name</th>
                                        <th className="py-3 px-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Email</th>
                                        <th className="py-3 px-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Role</th>
                                        <th className="py-3 px-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Status</th>
                                        <th className="py-3 px-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {user.map((items, index) => (
                                        <tr key={index} className="border-b border-gray-200 transition-colors hover:bg-blue-50/50">
                                            <td className="py-4 px-4 text-sm text-slate-900">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-semibold text-xs flex-shrink-0">{getInitials(items.name)}</div>
                                                    <span>{items.name}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 text-sm text-slate-900">{items.email}</td>
                                            <td className="py-4 px-4 text-sm">
                                                <span className={`inline-block py-1 px-3 text-xs font-medium rounded-lg  
                                                    ${items.role == "admin" && "bg-purple-100 text-purple-700" ||
                                                    items.role == "Voyager" && "bg-green-100 text-green-700" ||
                                                    items.role == "Manager" && "bg-blue-100 text-blue-700" ||
                                                    items.role == "HeadCook" && "bg-yellow-100 text-yellow-700" ||
                                                    items.role == "Supervisor" && "bg-red-100 text-red-700"
                                                    }`}>{items.role}</span>
                                            </td>
                                            <td className="py-4 px-4 text-sm"><span className="inline-block py-1 px-3 text-xs font-medium rounded-lg bg-green-100 text-green-700">Active</span></td>
                                            <td className="py-4 px-4 text-sm">
                                                <button onClick={() => handleDelete(items._id)} className="py-1 px-3 bg-transparent border border-gray-300 rounded-md font-sans text-xs text-slate-900 cursor-pointer transition-all hover:bg-blue-50 hover:border-blue-600">Delete</button>
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
