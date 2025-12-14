'use client'

import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { loginContext } from '../context/MainContext'
import { toast } from 'react-toastify'
import { FaMinus, FaPlus } from 'react-icons/fa6'

export default function SalonBooking({ items, index }) {
    let { token, cart, setCart, cartItems, stationeryCartItems } = useContext(loginContext)
    const [qty, setQty] = useState(1)
    let APIURL = process.env.NEXT_PUBLIC_APIBASEURL
    const [isBooked, setIsBooked] = useState(false);


    // console.log("token", token);



    let bookBeauty = () => {
        // console.log("jjdjs");

        if (token) {
            let obj = {

                productId: items._id,
                title: items.beautyName,
                image: items.beautyImage,
                price: items.price,
                orderType: "beauty"
            }

            axios.post(`${APIURL}/ship/order/add-booking`, obj, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.data)
                .then((finalRes) => {
                     if (finalRes.status) {
                        // dispatch(fetchCart())
                        toast.success(finalRes.msg);
                        setIsBooked(true);
                        // setCart()
                        // stationeryCartItems()
                        // removeCart()
                    } else {
                        toast.error(finalRes.msg);

                    }
                })
            // axios.post(`${APIURL}/ship/stationery-cart/add-to-cart`, obj, {
            //     headers: {
            //         Authorization: `Bearer ${token}`
            //     }
            // })
            //     .then((res) => res.data)
            //     .then((finalRes) => {
            //         console.log(finalRes);
            //         if (finalRes.status) {
            //             // dispatch(fetchCart())
            //             toast.success(finalRes.msg);
            //             // setCart()
            //             stationeryCartItems()
            //         } else {
            //             toast.error(finalRes.msg);

            //         }
            //     })
        } else {
            toast.error("Please Login");
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
            <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all">
                <div className="w-16 h-16 bg-pink-100 rounded-full overflow-hidden flex items-center justify-center mb-4">
                    <img src={items.beautyImage} className='h-full overflow-hidden' alt="" />
                </div>
                <h4 className="text-xl font-bold mb-3">{items.beautyName}</h4>
                <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-pink-600">₹{items.price}</div>
                    <button
                        onClick={bookBeauty}
                        className={`${isBooked ? "bg-gray-400 cursor-not-allowed" : "bg-pink-500 hover:bg-pink-600 cursor-pointer"} text-white px-6 py-2 rounded-lg font-semibold  transition-colors`}>
                        {isBooked ? "Booked ✓" : "Book Show"}
                    </button>
                </div>
            </div>
        </>
    )
}
