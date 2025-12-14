'use client'

import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { loginContext } from '../context/MainContext'
import { toast } from 'react-toastify'
import { FaMinus, FaPlus } from 'react-icons/fa6'

export default function MovieBooking({ items, index }) {
    let { token, cart, setCart, cartItems, stationeryCartItems } = useContext(loginContext)
    const [qty, setQty] = useState(1)
    let APIURL = process.env.NEXT_PUBLIC_APIBASEURL
    const [isBooked, setIsBooked] = useState(false);


    // console.log("token", token);



    let bookShow = () => {
        // console.log("jjdjs");

        if (token) {
            let obj = {

                productId: items._id,
                title: items.movieName,
                image: items.movieImage,
                price: items.price,
                orderType: "movies"
            }

            axios.post(`${APIURL}/ship/order/add-booking`, obj, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.data)
                .then((finalRes) => {
                    if (finalRes.status) {
                        toast.success(finalRes.msg);
                        setIsBooked(true);
                    } else {
                        toast.error(finalRes.msg);

                    }
                })
        } else {
        }
    }

    useEffect(() => {
        if (!token) return;

        axios.post(`${APIURL}/ship/order/booked-view`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.data)
            .then(finalData => {
                const alreadyBooked = finalData.data?.some(
                    order => order.productId === items._id
                );

                if (alreadyBooked) setIsBooked(true);
            });
    }, [token, items._id]);



    return (
        <>
            <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="relative w-full h-48 bg-gradient-to-br from-blue-200 to-blue-400 flex items-center justify-center">
                    <span className="absolute top-3 left-3 text-xs font-semibold px-3 py-1 bg-green-600 text-white rounded-full">{items.type}</span>
                    <img src={items.movieImage} className='h-full overflow-hidden' alt="" />
                </div>
                <div className="p-4">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{items.movieName}</h4>
                    <p className="text-sm text-gray-600 mb-1 line-clamp-2">Hall No.: {items.hall}</p>
                    <div className="border-t pt-2">
                        <div className="flex items-center justify-between mb-2">
                            <div>
                                <div className="text-3xl font-bold text-blue-600">₹{items.price}</div>
                            </div>
                        </div>
                        <div className="text-sm text-gray-500 mb-2">Duration : {items.duration}</div>
                        <button
                            className={`w-full ${isBooked ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"} 
        text-white font-medium py-2 px-4 rounded-lg transition-colors cursor-pointer`}
                            onClick={bookShow}
                            disabled={isBooked || items.isAvailable === 'No'}
                        >
                            {isBooked ? "Booked ✓" : "Book Show"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
