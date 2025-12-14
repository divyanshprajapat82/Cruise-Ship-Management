'use client'

import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { loginContext } from '../context/MainContext'

export default function page() {
    // let profileView = () => {

    // }

    const [orders, setOrders] = useState([])

    let { userRole, setToken, token } = useContext(loginContext)


    let APIURL = process.env.NEXT_PUBLIC_APIBASEURL

    const getInitials = (name = "") => {
        return name
            .trim()
            .split(/\s+/)
            .map(n => n[0]?.toUpperCase() || "")
            .join("");
    };

    useEffect(() => {
        axios.get(`${APIURL}/ship/order/salon-order-view`)
            .then((res) => res.data)
            .then((finalData) => {
                setOrders(finalData.data)
            })
    }, [])

    return (
        <>

            <section className="mt-6 p-4">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">💈 Beauty Salon</h2>

                <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">

                    {/* <!-- Responsive Wrapper --> */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm md:text-base">
                            <thead className="bg-gray-100 text-gray-700">
                                <tr>
                                    <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">No.</th>
                                    <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">Image</th>
                                    <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">Customer</th>
                                    {/* <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">Type</th> */}
                                    <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">Name</th>
                                    <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">Paid Money</th>
                                    <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">Status</th>
                                </tr>
                            </thead>

                            <tbody id="resortMovieBody" className="bg-white divide-y divide-gray-200">
                                {/* <!-- Dynamic rows here --> */}
                                {userRole === "Manager" ?
                                    orders.length > 0 ?

                                        orders.map((items, index) => (
                                            <tr className="hover:bg-gray-50 transition">
                                                {/* <!-- Customer --> */}
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

                                                {/* <!-- Type --> */}
                                                {/* <td className="px-4 py-3 text-gray-700">
                                        VIP
                                    </td> */}

                                                {/* <!-- Details --> */}
                                                <td className="px-4 py-3 text-gray-700">
                                                    <div className="font-semibold">{items.title}</div>
                                                    {/* <div className="text-xs text-gray-500">Seat: A12 • Qty: 2</div> */}
                                                </td>

                                                {/* <!-- Date & Time --> */}
                                                <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                                                    ₹ {items.price}
                                                    {/* <div className="text-xs text-gray-500">7:30 PM</div> */}
                                                </td>

                                                {/* <!-- Status --> */}
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
                                            Manager Only
                                        </td>
                                    </tr>

                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </section>


        </>
    )
}
