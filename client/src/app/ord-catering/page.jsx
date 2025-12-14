'use client'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Product from '../components/Product'
import { MdShoppingCart } from 'react-icons/md'
import { loginContext } from '../context/MainContext'
import { IoIosArrowDown, IoIosCart } from 'react-icons/io'
import { toast } from 'react-toastify'
// import CateringOrder from '../components/CateringOrder'

export default function page() {

    const [catering, setCatering] = useState([])
    let { token, cart, cartItems } = useContext(loginContext)
    // const [cart, setCart] = useState([])
    const [sideCart, setSideCart] = useState(false)
    const [orderItems, setOrderItems] = useState({
        id: "",
        title: "",
        image: "",
        price: "",
    })


    let APIURL = process.env.NEXT_PUBLIC_APIBASEURL

    let totle = 0
    cart.forEach((price) => totle += price.price)
    cart.forEach((items) => console.log(items.category))

    let viewCatering = () => {
        axios.get(`${APIURL}/ship/catering/view`)
            .then((res) => res.data)
            .then((finalData) => {
                setCatering(finalData.data)

            })
    }

    let removeCart = (id) => {
        axios.delete(`${APIURL}/ship/catering-cart/delete-cart/${id}`)
            .then((res) => res.data)
            .then((finalData) => {
                // setCatering(finalData.data)
                cartItems()

            })
    }


    // console.log(orderItems.price);
    // console.log("Orders", orderItems.title);

    // let obj = {
    //     id: orderItems.id,
    //     title: orderItems.title,
    //     image: orderItems.image,
    //     price: orderItems.price,
    // }


    // useEffect(() => {
    //     cart.forEach((items) => {
    //         // console.log(items.title);
    //         setOrderItems({
    //             id: items._id,
    //             title: items.title,
    //             image: items.image,
    //             price: items.price,
    //         })
    //     })
    // }, [cart])

    // useEffect(() => {
    //     const items = cart.map(item => ({
    //         id: item._id,
    //         title: item.title,
    //         image: item.image,
    //         price: item.price,
    //     }))
    //     setOrderItems(items)
    // }, [cart])

    useEffect(() => {
        const items = cart.map(item => ({
            id: item._id,
            title: item.title,
            image: item.image,
            price: item.price,
            qty: item.qty || 1, // optional
            // orderType: "catering"
        }))
        setOrderItems(items)
    }, [cart])
    let order = () => {
        // console.log(obj);



        if (token) {
            // let obj = {
            //     id,
            //     title,
            //     price,
            //     image,
            // }

            // const items = cart.map(item => ({
            //     id: item._id,
            //     title: item.title,
            //     image: item.image,
            //     price: item.price
            // }));

            // const total = cart.reduce((acc, item) => acc + item.price, 0);

            // const obj = {
            //     items,
            //     total
            // };

            axios.post(`${APIURL}/ship/order/add-catering-order`, { orderItems, orderType: "catering" }, {
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
                        // removeCart()
                    } else {
                        toast.error(finalRes.msg);

                    }
                })
        } else {
        }
    }



    useEffect(() => {
        viewCatering()

        // axios.get(`${APIURL}/ship/order/view`)
        //     .then((res) => res.data)
        //     .then((finalData) => {
        //         console.log("Order View", finalData.data);
        //         // setCatering(finalData.data)
        //         // cartItems()

        //     })
        axios.get(`${APIURL}/ship/order/view`)
            .then(res => {
                console.log("Raw Response:", res); // Check full response
                return res.data;
            })
            .then(finalData => {
            })
            .catch(err => {
                console.error("Error fetching orders:", err);
            });
    }, [])


    return (
        <>
            {/* <div className='p-4'>

                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Catering Items</h2>
                        <p className="text-gray-600 text-base">Order catering food items for your event, party, or office.z</p>
                    </div>
                    <button className="flex items-center gap-2 py-2 px-4 bg-blue-600 text-white border-none rounded-lg font-medium text-sm cursor-pointer transition-colors hover:bg-blue-700" id="addCateringItemBtn">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        Add New Item
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
                    <div className="bg-white border border-gray-200 rounded-xl p-5 flex gap-4">
                        <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                            </svg>
                        </div>
                        <div className="flex-1">
                            <div className="text-sm text-gray-600 mb-1">Total Items</div>
                            <div className="text-3xl font-bold text-slate-900">24</div>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-5 flex gap-4">
                        <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                        </div>
                        <div className="flex-1">
                            <div className="text-sm text-gray-600 mb-1">Available</div>
                            <div className="text-3xl font-bold text-slate-900">22</div>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-5 flex gap-4">
                        <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="8" x2="12" y2="12"></line>
                                <line x1="12" y1="16" x2="12.01" y2="16"></line>
                            </svg>
                        </div>
                        <div className="flex-1">
                            <div className="text-sm text-gray-600 mb-1">Out of Stock</div>
                            <div className="text-3xl font-bold text-slate-900">2</div>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-5 flex gap-4">
                        <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="3" y="3" width="7" height="7"></rect>
                                <rect x="14" y="3" width="7" height="7"></rect>
                                <rect x="14" y="14" width="7" height="7"></rect>
                                <rect x="3" y="14" width="7" height="7"></rect>
                            </svg>
                        </div>
                        <div className="flex-1">
                            <div className="text-sm text-gray-600 mb-1">Categories</div>
                            <div className="text-3xl font-bold text-slate-900">5</div>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6">
                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                        <div className="relative flex-1 w-full">
                            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.35-4.35"></path>
                            </svg>
                            <input type="text" id="cateringSearch" placeholder="Search items by name or description..." className="w-full py-2 px-3 pl-10 border border-gray-300 rounded-lg bg-gray-50 text-slate-900 font-sans text-sm transition-all focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" />
                        </div>
                        <select id="cateringSort" className="py-2 px-3 border border-gray-300 rounded-lg bg-gray-50 text-slate-900 font-sans text-sm transition-all focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20">
                            <option value="name">Sort by Name</option>
                            <option value="price">Sort by Price</option>
                            <option value="popular">Most Popular</option>
                            <option value="recent">Recently Added</option>
                        </select>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6">
                    <div className="flex flex-wrap gap-2" id="categoryTabs">
                        <button className="category-tab active py-2 px-4 rounded-lg font-medium text-sm cursor-pointer transition-all border-none bg-blue-600 text-white" data-category="all">All Items (24)</button>
                        <button className="category-tab py-2 px-4 rounded-lg font-medium text-sm cursor-pointer transition-all border-none bg-gray-100 text-gray-700 hover:bg-gray-200" data-category="appetizers">Appetizers (6)</button>
                        <button className="category-tab py-2 px-4 rounded-lg font-medium text-sm cursor-pointer transition-all border-none bg-gray-100 text-gray-700 hover:bg-gray-200" data-category="main-course">Main Course (8)</button>
                        <button className="category-tab py-2 px-4 rounded-lg font-medium text-sm cursor-pointer transition-all border-none bg-gray-100 text-gray-700 hover:bg-gray-200" data-category="desserts">Desserts (5)</button>
                        <button className="category-tab py-2 px-4 rounded-lg font-medium text-sm cursor-pointer transition-all border-none bg-gray-100 text-gray-700 hover:bg-gray-200" data-category="beverages">Beverages (3)</button>
                        <button className="category-tab py-2 px-4 rounded-lg font-medium text-sm cursor-pointer transition-all border-none bg-gray-100 text-gray-700 hover:bg-gray-200" data-category="sides">Sides (2)</button>
                    </div>
                </div>

                <div id="cateringItemsGrid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
                </div>

                <div id="emptyState" className="bg-white border border-gray-200 rounded-xl p-12 text-center">
                    <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">No items found</h3>
                    <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
                </div>
            </div> */}

            <div className='p-8'>
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Catering Items - Order Your Food</h2>
                        <p className="text-gray-600">Browse and order delicious catering options</p>
                    </div>
                    <div className="">
                        <div className="relative w-full md:w-96">
                            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.35-4.35"></path>
                            </svg>
                            <input type="text" id="cateringSearch" placeholder="Search catering items..." className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </div>
                </div>

                <div className='flex items-center justify-between'>
                    <div className="mb-6 overflow-x-auto no-scrollba">
                        <div className="flex gap-2 min-w-max" id="cateringCategoryTabs">
                            <button className="px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 bg-blue-600 text-white whitespace-nowrap" data-category="All Items">All Items</button>
                            <button className="px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 bg-gray-200 text-gray-700 hover:bg-gray-300 whitespace-nowrap" data-category="Appetizers">Appetizers</button>
                            <button className="px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 bg-gray-200 text-gray-700 hover:bg-gray-300 whitespace-nowrap" data-category="Main Course">Main Course</button>
                            <button className="px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 bg-gray-200 text-gray-700 hover:bg-gray-300 whitespace-nowrap" data-category="Desserts">Desserts</button>
                            <button className="px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 bg-gray-200 text-gray-700 hover:bg-gray-300 whitespace-nowrap" data-category="Beverages">Beverages</button>
                            <button className="px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 bg-gray-200 text-gray-700 hover:bg-gray-300 whitespace-nowrap" data-category="Sides">Sides</button>
                        </div>
                    </div>

                    <button onClick={() => setSideCart(true)} className='relative cursor-pointer'>
                        <span className='text-3xl mb-6'>
                            <MdShoppingCart />
                        </span>
                        <div className='absolute right-[-5px] bottom-[-5px] px-1.5 bg-blue-500 text-white text-[12px] rounded-full text-center'>
                            {cart.length}
                        </div>
                    </button>
                    {/* <div
                        // onClick={() => setSideCart(true)}
                        className="relative flex items-center h-full px-2 border border-[#0000003f] cursor-pointer hover:text-[#C09578]"
                    >
                        <div className="cursor-pointer px-2 text-[20px] h-full flex items-center hover:text-[#C09578] ">
                            <div className="absolute flex justify-center left-[-10px] w-[20px] h-[20px] text-center text-white bg-[#C09578] rounded-[50%]">
                                <span className="h-full flex items-center text-[15px] pt-[1px]">
                                    {cart.length}
                                </span>
                            </div>
                            <IoIosCart />
                        </div>
                        <hr className="border-r h-[30px] border-[#0000003f]" />
                        <h2 className="px-2 text-[15px] font-bold">Rs. {totle}</h2>
                        <div className="">
                            <IoIosArrowDown />
                        </div>
                    </div> */}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2M7 2v20M21 15V2v0a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zM21 15v7"></path>
                            </svg>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-slate-900" id="totalItemsCount">{catering.length}</div>
                            <div className="text-sm text-gray-600">Total Items Available</div>
                        </div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-3">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <circle cx="9" cy="21" r="1"></circle>
                                <circle cx="20" cy="21" r="1"></circle>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                            </svg>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-slate-900" id="cartItemsCount">{cart.length}</div>
                            <div className="text-sm text-gray-600">Items in Cart</div>
                        </div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-3">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <line x1="12" y1="1" x2="12" y2="23"></line>
                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                            </svg>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-slate-900" id="statsCartTotal">₹ {totle}</div>
                            <div className="text-sm text-gray-600">Cart Total</div>
                        </div>
                    </div>
                </div>

                {

                    catering.length > 0 ?
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id="cateringItemsGrid">
                            {catering.map((items, index) => (
                                // <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105">
                                //     <div className="relative w-full h-48 bg-gradient-to-br from-blue-200 to-blue-400 flex items-center justify-center">
                                //         {items.isAvailable === 'Yes'
                                //             ? <span className="absolute top-3 left-3 text-xs font-semibold px-3 py-1 bg-green-600 text-white rounded-full">Available</span> : <span className="absolute top-3 left-3 text-xs font-semibold px-3 py-1 bg-red-600 text-white rounded-full">Out of Stock</span>}
                                //         <span className="absolute top-3 right-3 text-xs font-semibold px-3 py-1 bg-blue-600 text-white rounded-full">{items.category}</span>
                                //         <img src={items.image} className='w-full h-full overflow-hidden' alt="" />
                                //     </div>
                                //     <div className="p-4">
                                //         <h4 className="text-lg font-semibold text-gray-900 mb-2">{items.itemName}</h4>
                                //         <p className="text-sm text-gray-600 mb-1 line-clamp-2">{items.description}</p>
                                //         <div className="border-t pt-2">
                                //             <div className="flex items-center justify-between mb-1">
                                //                 <div>
                                //                     <div className="text-3xl font-bold text-blue-600">₹{items.price}</div>
                                //                 </div>
                                //             </div>
                                //             <div className="text-sm text-gray-500 mb-2">Prepare time : {items.prepTime}</div>
                                //             <div className="flex items-center gap-2 mb-3">
                                //                 <button className="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded transition-colors" onclick="decrementQuantity(${item.id})">
                                //                     <svg className="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                //                         <line x1="5" y1="12" x2="19" y2="12"></line>
                                //                     </svg>
                                //                 </button>
                                //                 <input type="number" id="qty-${item.id}" value="1" min="1" className="w-16 text-center border border-gray-300 rounded py-2 [appearance:textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none" readonly />
                                //                 <button className="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded transition-colors" onclick="incrementQuantity(${item.id})">
                                //                     <svg className="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                //                         <line x1="12" y1="5" x2="12" y2="19"></line>
                                //                         <line x1="5" y1="12" x2="19" y2="12"></line>
                                //                     </svg>
                                //                 </button>
                                //             </div>
                                //             <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors ${item.status !== 'available' ? 'opacity-50 cursor-not-allowed' : ''} cursor-pointer" onclick={addToCart(items._id)} >
                                //                 Add to Cart
                                //             </button>
                                //         </div>
                                //     </div>
                                // </div>
                                <Product items={items} index={index} />
                            ))}
                        </div>
                        :
                        <div className=" text-center py-16" id="emptyState">
                            <svg className="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="8" x2="12" y2="12"></line>
                                <line x1="12" y1="16" x2="12.01" y2="16"></line>
                            </svg>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">No items found</h3>
                            <p className="text-gray-500">Try adjusting your filters or search query</p>
                        </div>
                }

            </div >

            {/* {sideCart && (
                <div>
                    <div id="drawer" aria-labelledby="drawer-title" className="fixed top-[64px] inset-0 size-auto max-h-[calc(100vh-64px)] max-w-none overflow-hidden bg-transparent  backdrop:bg-transparent">

                        <div className="absolute inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"></div>

                        <div tabindex="0" className="absolute inset-0 pl-10 focus:outline-none sm:pl-16">
                            <div className="ml-auto block size-full max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700">
                                <div className="flex h-full flex-col overflow-y-auto bg-white shadow-xl">
                                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                        <div className="flex items-start justify-between">
                                            <h2 id="drawer-title" className="text-lg font-medium text-gray-900">Shopping cart</h2>
                                            <div className="ml-3 flex h-7 items-center">
                                                <button onClick={() => setSideCart(false)} type="button" command="close" commandfor="drawer" className="relative -m-2 p-2 text-gray-400 hover:text-gray-500">
                                                    <span className="absolute -inset-0.5"></span>
                                                    <span className="sr-only">Close panel</span>
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" className="size-6">
                                                        <path d="M6 18 18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="mt-8">
                                            <div className="flow-root">
                                                <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                    <li className="flex py-6">
                                                        <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                            <img src="https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-01.jpg" alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." className="size-full object-cover" />
                                                        </div>

                                                        <div className="ml-4 flex flex-1 flex-col">
                                                            <div>
                                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                                    <h3>
                                                                        <a href="#">Throwback Hip Bag</a>
                                                                    </h3>
                                                                    <p className="ml-4">$90.00</p>
                                                                </div>
                                                                <p className="mt-1 text-sm text-gray-500">Salmon</p>
                                                            </div>
                                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                                <p className="text-gray-500">Qty 1</p>

                                                                <div className="flex">
                                                                    <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">Remove</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="flex py-6">
                                                        <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                            <img src="https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-02.jpg" alt="Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch." className="size-full object-cover" />
                                                        </div>

                                                        <div className="ml-4 flex flex-1 flex-col">
                                                            <div>
                                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                                    <h3>
                                                                        <a href="#">Medium Stuff Satchel</a>
                                                                    </h3>
                                                                    <p className="ml-4">$32.00</p>
                                                                </div>
                                                                <p className="mt-1 text-sm text-gray-500">Blue</p>
                                                            </div>
                                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                                <p className="text-gray-500">Qty 1</p>

                                                                <div className="flex">
                                                                    <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">Remove</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="flex py-6">
                                                        <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                            <img src="https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-03.jpg" alt="Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls." className="size-full object-cover" />
                                                        </div>

                                                        <div className="ml-4 flex flex-1 flex-col">
                                                            <div>
                                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                                    <h3>
                                                                        <a href="#">Zip Tote Basket</a>
                                                                    </h3>
                                                                    <p className="ml-4">$140.00</p>
                                                                </div>
                                                                <p className="mt-1 text-sm text-gray-500">White and black</p>
                                                            </div>
                                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                                <p className="text-gray-500">Qty 1</p>

                                                                <div className="flex">
                                                                    <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">Remove</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                            <p>Subtotal</p>
                                            <p>$262.00</p>
                                        </div>
                                        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                        <div className="mt-6">
                                            <a href="#" className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700">Checkout</a>
                                        </div>
                                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                            <p>
                                                or
                                                <button type="button" command="close" commandfor="drawer" className="font-medium text-indigo-600 hover:text-indigo-500">
                                                    Continue Shopping
                                                    <span aria-hidden="true"> &rarr;</span>
                                                </button>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )} */}

            <div>
                <div
                    id="drawer"
                    aria-labelledby="drawer-title"
                    className={`fixed top-[64px] inset-0 size-auto max-h-[calc(100vh-64px)] max-w-none overflow-hidden bg-transparent backdrop:bg-transparent -z-0
      ${sideCart ? "pointer-events-auto" : "pointer-events-none"}
    `}
                >

                    {/* Backdrop */}
                    <div
                        className={`absolute inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out z-0
        ${sideCart ? "opacity-100" : "opacity-0"}
      `}
                        onClick={() => setSideCart(false)}
                    ></div>

                    {/* Drawer Wrapper */}
                    <div
                        className="h-full inset-0 pl-10 focus:outline-none sm:pl-16"
                    >
                        <div
                            className={`
          ml-auto block size-full max-w-md transform transition-transform duration-500 ease-in-out sm:duration-700
          ${sideCart ? "translate-x-0" : "translate-x-full"}
        `}
                        >
                            <div className="flex h-full flex-col overflow-y-auto bg-white shadow-xl">

                                {/* Header */}
                                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                    <div className="flex items-start justify-between">
                                        <h2 id="drawer-title" className="text-lg font-medium text-gray-900">
                                            Shopping cart
                                        </h2>

                                        <div className="ml-3 flex h-7 items-center">
                                            <button
                                                onClick={() => setSideCart(false)}
                                                type="button"
                                                className="relative -m-2 p-2 text-gray-400 hover:text-gray-500 cursor-pointer"
                                            >
                                                <span className="absolute -inset-0.5"></span>
                                                <svg
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    className="size-6"
                                                >
                                                    <path
                                                        d="M6 18 18 6M6 6l12 12"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Your Cart Items — unchanged */}
                                    <div className="mt-8">
                                        <div className="flow-root">
                                            <ul role="list" className="-my-6 divide-y divide-gray-200">

                                                {/* --- YOUR ITEMS HERE (same as your code) --- */}
                                                {cart.length > 0 ?
                                                    cart.map((items, index) => (
                                                        <li key={index} className="flex py-6">
                                                            <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                <img src={items.image} alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." className="size-full object-cover" />
                                                            </div>

                                                            <div className="ml-4 flex flex-1 flex-col">
                                                                <div>
                                                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                                                        <h3>
                                                                            {items.title}
                                                                        </h3>
                                                                        <p className="ml-4">₹ {items.price}</p>
                                                                    </div>
                                                                    <p className="mt-1 text-sm text-gray-500">{items.category}</p>
                                                                </div>
                                                                <div className="flex flex-1 items-end justify-between text-sm">
                                                                    <p className="text-gray-500">Qty {items.qty}</p>

                                                                    <div className="flex">
                                                                        <button onClick={() => removeCart(items._id)} type="button" className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">Remove</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        // <CateringOrder items={items} index={index} />
                                                    ))
                                                    :
                                                    <div className="w-full flex flex-col items-center justify-center py-10 text-center">
                                                        <img
                                                            src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
                                                            alt="Empty cart"
                                                            className="w-32 opacity-80"
                                                        />

                                                        <h3 className="mt-6 text-lg font-semibold text-gray-700">
                                                            Your cart is empty
                                                        </h3>

                                                        <p className="mt-2 text-sm text-gray-500">
                                                            Looks like you haven't added anything yet.
                                                        </p>

                                                        <button
                                                            onClick={() => setSideCart(false)}
                                                            className="mt-5 inline-flex items-center px-5 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700"
                                                        >
                                                            Continue Shopping →
                                                        </button>
                                                    </div>
                                                }

                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                        <p>Subtotal</p>
                                        <p>₹ {totle}</p>
                                    </div>
                                    <p className="mt-0.5 text-sm text-gray-500">
                                        Shipping and taxes calculated at checkout.
                                    </p>

                                    <div className="mt-6">
                                        <button
                                            onClick={order}
                                            className="w-full rounded-md bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700 cursor-pointer"
                                        >
                                            Checkout
                                        </button>
                                    </div>

                                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                        <p>
                                            or {" "}
                                            <button
                                                onClick={() => setSideCart(false)}
                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                            >
                                                Continue Shopping →
                                            </button>
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>



        </>
    )
}
