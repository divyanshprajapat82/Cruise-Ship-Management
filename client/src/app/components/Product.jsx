'use client'

import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { loginContext } from '../context/MainContext'
import { toast } from 'react-toastify'
import { FaMinus, FaPlus } from 'react-icons/fa6'

export default function Product({ items, index }) {
    let { token, cart, setCart, cartItems } = useContext(loginContext)
    const [qty, setQty] = useState(1)
    let APIURL = process.env.NEXT_PUBLIC_APIBASEURL

    // console.log("token", token);



    let addToCart = () => {
        // console.log("jjdjs");

        if (token) {
            let obj = {
                id: items._id,
                title: items.itemName,
                category: items.category,
                price: items.price * qty,
                qty: qty,
                image: items.image,
            }

            axios.post(`${APIURL}/ship/catering-cart/add-to-cart`, obj, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.data)
                .then((finalRes) => {
                    if (finalRes.status) {
                        // dispatch(fetchCart())
                        toast.success(finalRes.msg);
                        // setCart()
                        cartItems()
                    } else {
                        toast.error(finalRes.msg);

                    }
                })
        } else {
        }
    }

    return (
        <>
            <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="relative w-full h-48 bg-gradient-to-br from-blue-200 to-blue-400 flex items-center justify-center">
                    {items.isAvailable === 'Yes'
                        ? <span className="absolute top-3 left-3 text-xs font-semibold px-3 py-1 bg-green-600 text-white rounded-full">Available</span> : <span className="absolute top-3 left-3 text-xs font-semibold px-3 py-1 bg-red-600 text-white rounded-full">Out of Stock</span>}
                    <span className="absolute top-3 right-3 text-xs font-semibold px-3 py-1 bg-blue-600 text-white rounded-full">{items.category}</span>
                    <img src={items.image} className='w-full h-full overflow-hidden' alt="" />
                </div>
                <div className="p-4">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{items.itemName}</h4>
                    <p className="text-sm text-gray-600 mb-1 line-clamp-2">{items.description}</p>
                    <div className="border-t pt-2">
                        <div className="flex items-center justify-between mb-1">
                            <div>
                                <div className="text-3xl font-bold text-blue-600">₹{items.price}</div>
                            </div>
                        </div>
                        <div className="text-sm text-gray-500 mb-2">Prepare time : {items.prepTime}</div>
                        <div className="flex items-center gap-2 mb-3">
                            <button onClick={() => setQty(qty - 1)} className="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded transition-colors cursor-pointer" onclick="decrementQuantity(${item.id})">
                                <FaMinus />
                            </button>
                            <input type="number" value={qty} min="1" className="w-16 text-center border border-gray-300 rounded py-1 [appearance:textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none" readonly />
                            <button onClick={() => setQty(qty + 1)} className="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded transition-colors cursor-pointer" onclick="incrementQuantity(${item.id})">
                                <FaPlus />
                            </button>
                        </div>
                        <button className={`w-full bg-blue-600  text-white font-medium py-2 px-4 rounded-lg transition-colors ${items.isAvailable === 'No' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700 cursor-pointer'} `} onClick={addToCart} disabled={items.isAvailable === 'No'} >
                            {items.isAvailable === 'No' ? 'Out of Stock' : 'Add to Cart'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
