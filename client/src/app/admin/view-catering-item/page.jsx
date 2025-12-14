'use client'
import axios from 'axios';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function page() {
    const [catering, setCatering] = useState([])
    let APIURL = process.env.NEXT_PUBLIC_APIBASEURL

    const getInitials = (name = "") => {
        return name
            .trim()
            .split(/\s+/)
            .map(n => n[0]?.toUpperCase() || "")
            .join("");
    };

    let viewCatering = () => {
        axios.get(`${APIURL}/ship/catering/view`)
            .then((res) => res.data)
            .then((finalData) => {
                setCatering(finalData.data)

            })
    }

    useEffect(() => {
        viewCatering(0)
    }, [])
    return (
        <>
            <div id="cateringView">
                {/* <!-- Breadcrumb --> */}
                {/* <div className="flex items-center gap-2 mb-6 text-sm">
                    <a href="#" className="text-blue-600 hover:text-blue-700 no-underline" data-breadcrumb="dashboard">Dashboard</a>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                    <span className="text-gray-600">Catering Items</span>
                </div> */}

                {/* <!-- Page Header --> */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Catering Items</h2>
                        <p className="text-gray-600 text-base">Manage your catering menu and food items.</p>
                    </div>
                    <div className='flex flex-wrap gap-2'>
                        <Link href={'../admin/add-item'}>
                            <button className="flex items-center gap-2 py-2 px-4 bg-gray-200 text-gray-700 border-none rounded-lg font-medium text-sm cursor-pointer transition-colors hover:bg-gray-300" id="backToUsersBtn">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <polyline points="15 18 9 12 15 6"></polyline>
                                </svg>
                                Back to Items
                            </button>
                        </Link>
                        <Link href={'/admin/add-catering-item'}>
                            <button className="flex items-center gap-2 py-2 px-4 bg-blue-600 text-white border-none rounded-lg font-medium text-sm cursor-pointer transition-colors hover:bg-blue-700" id="addCateringItemBtn">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                                Add New Item
                            </button>
                        </Link>

                    </div>
                </div>

                {/* <!-- Stats Overview --> */}
                {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
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
                </div> */}

                {/* <!-- Search and Filter Bar --> */}
                {/* <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6">
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
                </div> */}

                {/* <!-- Category Tabs --> */}
                {/* <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6">
                    <div className="flex flex-wrap gap-2" id="categoryTabs">
                        <button className="category-tab active py-2 px-4 rounded-lg font-medium text-sm cursor-pointer transition-all border-none bg-blue-600 text-white" data-category="all">All Items (24)</button>
                        <button className="category-tab py-2 px-4 rounded-lg font-medium text-sm cursor-pointer transition-all border-none bg-gray-100 text-gray-700 hover:bg-gray-200" data-category="appetizers">Appetizers (6)</button>
                        <button className="category-tab py-2 px-4 rounded-lg font-medium text-sm cursor-pointer transition-all border-none bg-gray-100 text-gray-700 hover:bg-gray-200" data-category="main-course">Main Course (8)</button>
                        <button className="category-tab py-2 px-4 rounded-lg font-medium text-sm cursor-pointer transition-all border-none bg-gray-100 text-gray-700 hover:bg-gray-200" data-category="desserts">Desserts (5)</button>
                        <button className="category-tab py-2 px-4 rounded-lg font-medium text-sm cursor-pointer transition-all border-none bg-gray-100 text-gray-700 hover:bg-gray-200" data-category="beverages">Beverages (3)</button>
                        <button className="category-tab py-2 px-4 rounded-lg font-medium text-sm cursor-pointer transition-all border-none bg-gray-100 text-gray-700 hover:bg-gray-200" data-category="sides">Sides (2)</button>
                    </div>
                </div> */}

                {/* <!-- Items Grid --> */}
                <div id="cateringItemsGrid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
                    {/* <!-- Items will be populated by JavaScript --> */}
                </div>

                {/* <!-- Empty State --> */}
                {/* <div id="emptyState" className="hidden bg-white border border-gray-200 rounded-xl p-12 text-center">
                    <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">No items found</h3>
                    <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
                </div> */}

                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mt-5">
                    <div className="p-5">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 border-b-2 border-gray-200">
                                        <th className="py-3 px-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Movie Name</th>
                                        <th className="py-3 px-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Price</th>
                                        <th className="py-3 px-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Category</th>
                                        <th className="py-3 px-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Availability</th>
                                        <th className="py-3 px-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {catering.length > 0 ?

                                        catering.map((items, index) => (
                                            <tr key={index} className="border-b border-gray-200 transition-colors hover:bg-blue-50/50">
                                                <td className="py-4 px-4 text-sm text-slate-900">
                                                    <div className="flex items-center gap-3">
                                                        {/* <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-semibold text-xs flex-shrink-0">{getInitials(items.movieName)}</div> */}
                                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-semibold text-xs flex-shrink-0">
                                                            {
                                                                items.image ? (
                                                                    <img
                                                                        src={items.image}
                                                                        alt={items.itemName}
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                ) : (
                                                                    getInitials(items.itemName)
                                                                )
                                                            }
                                                        </div>
                                                        <span>{items.itemName}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4 text-sm text-slate-900">₹ {items.price}</td>
                                                <td className="py-4 px-4 text-sm"><span className="inline-block py-1 px-3 text-xs font-medium rounded-lg">{items.category}</span></td>
                                                <td className="py-4 px-4 text-sm">
                                                    <span className={`inline-block py-1 px-3 text-xs font-medium rounded-lg  
                                                    ${items.isAvailable == "Yes" && "bg-green-100 text-green-700" ||
                                                        items.isAvailable == "No" && "bg-red-100 text-red-700"
                                                        }`}>
                                                        {items.isAvailable == "Yes" && "Available" ||
                                                            items.isAvailable == "No" && "Out of Stock"}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-4 text-sm">
                                                    <button className="py-1 px-3 bg-transparent border border-gray-300 rounded-md font-sans text-xs text-slate-900 cursor-pointer transition-all hover:bg-blue-50 hover:border-blue-600 mr-2">Edit</button>
                                                    <button className="py-1 px-3 bg-transparent border border-gray-300 rounded-md font-sans text-xs text-slate-900 cursor-pointer transition-all hover:bg-blue-50 hover:border-blue-600">Delete</button>
                                                </td>
                                            </tr>
                                        )) :
                                        <tr>
                                            <td colSpan="5" className="pt-4 text-center text-gray-500">
                                                No Data
                                            </td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
