'use client'

import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { loginContext } from '../context/MainContext'

export default function page() {
    // let profileView = () => {

    // }

    const [orders, setOrders] = useState([])


    let { userRole, profile } = useContext(loginContext)


    let APIURL = process.env.NEXT_PUBLIC_APIBASEURL

    const getInitials = (name = "") => {
        return name
            .trim()
            .split(/\s+/)
            .map(n => n[0]?.toUpperCase() || "")
            .join("");
    };

    useEffect(() => {
        axios.get(`${APIURL}/ship/order/catering-order-view`)
            .then((res) => res.data)
            .then((finalData) => {
                setOrders(finalData.data)
            })
    }, [])

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
                <div className="mt-5 p-4">
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">🥗 Catering Orders</h2>

                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">

                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm md:text-base">
                                <thead className="bg-gray-100 text-gray-700">
                                    <tr>
                                        <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">No.</th>
                                        <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">Image</th>
                                        <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">Customer</th>
                                        <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">Movie Name</th>
                                        <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">Paid Money</th>
                                        <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">Status</th>
                                    </tr>
                                </thead>

                                <tbody id="resortMovieBody" className="bg-white divide-y divide-gray-200">
                                    {userRole === "HeadCook" ?
                                        orders.length > 0 ?

                                            orders.map((items, index) => (
                                                <tr className="hover:bg-gray-50 transition">
                                                    <td className="px-4 py-3 font-medium text-gray-900">
                                                        {index + 1}
                                                    </td>
                                                    <td className="px-4 py-3 font-medium text-gray-900">
                                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-semibold text-xs flex-shrink-0">
                                                            {
                                                                items.image ? (
                                                                    <img
                                                                        src={items.image}
                                                                        alt={items.title}
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                ) : (
                                                                    getInitials(items.title)
                                                                )
                                                            }
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3 font-medium text-gray-900">
                                                        {items.userId.name}
                                                        <div className="text-xs text-gray-500">{items.userId.phone}</div>
                                                    </td>

                                                    <td className="px-4 py-3 text-gray-700">
                                                        <div className="font-semibold">{items.title}</div>
                                                        <div className="text-xs text-gray-500">Qty: {items.qty}</div>
                                                    </td>

                                                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                                                        ₹ {items.price}
                                                    </td>

                                                    <td className="px-4 py-3">
                                                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                                                            Paid
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                            :
                                            <tr>
                                                <td colSpan="6" className="py-4 text-center text-gray-500">
                                                    No Data
                                                </td>
                                            </tr>
                                        :
                                        <tr>
                                            <td colSpan="6" className="py-4 text-center text-gray-500">
                                                HeadCook Only
                                            </td>
                                        </tr>
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>


        </>
    )
}
