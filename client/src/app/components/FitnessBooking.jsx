'use client'

import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { loginContext } from '../context/MainContext'
import { toast } from 'react-toastify'
import { FaMinus, FaPlus } from 'react-icons/fa6'

export default function FitnessBooking({ items, index }) {
    let { token, cart, setCart, cartItems, stationeryCartItems } = useContext(loginContext)
    const [qty, setQty] = useState(1)
    let APIURL = process.env.NEXT_PUBLIC_APIBASEURL
    const [isBooked, setIsBooked] = useState(false);


    // console.log("token", token);



    let bookfitness = () => {
        // console.log("jjdjs");

        if (token) {
            let obj = {

                productId: items._id,
                title: items.trainerName,
                price: items.price,
                orderType: "fitness"
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
                <h4 className="text-xl font-bold mb-2">{items.trainerName}</h4>
                <div className="text-gray-600 mb-2">📍 Hall No.: {items.hall}</div>
                <div className="text-teal-600 font-semibold mb-3">{items.time}</div>
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-2xl font-bold text-teal-600">₹{items.price}</div>
                        <div className="text-xs text-gray-500">{items.unit}</div>
                    </div>
                    <button
                        onClick={bookfitness}
                        className={`${isBooked ? "bg-gray-400 cursor-not-allowed" : "bg-teal-500 hover:bg-teal-600 cursor-pointer"} text-white px-6 py-2 rounded-lg font-semibold  transition-colors`}>
                        {isBooked ? "Booked ✓" : "Book Show"}
                    </button>
                </div>
            </div>
        </>
    )
}
