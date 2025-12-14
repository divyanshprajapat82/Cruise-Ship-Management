'use client'
import Link from 'next/link'
import React, { useContext } from 'react'
import { FaBuilding, FaDumbbell, FaFilm, FaPencil, FaScissors } from 'react-icons/fa6';
import { LuUtensils } from "react-icons/lu";
import { loginContext } from '../context/MainContext';

export default function page() {
    let { profile } = useContext(loginContext)

    const getInitials = (name = "") => {
        return name
            .trim()
            .split(/\s+/)
            .map(n => n[0]?.toUpperCase() || "")
            .join("");
    };


    return (
        <>
            <div className="flex min-h-screen">
                <main className="flex-1 flex flex-col">
                    <header className="flex items-center justify-between px-10 py-6 bg-white border-b border-gray-200">
                        <h1 className="text-3xl font-bold text-slate-900">Your Services</h1>
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
                    <div id="voyager" className="flex-1 px-10 py-8 bg-gray-50">
                        <div className="mb-8">
                            <div className="mb-8 text-center">
                                <h2 className="text-4xl font-bold mb-3 text-slate-900">Welcome to Voyager</h2>
                                <p className="text-xl text-gray-600 mb-2">Your one-stop platform for ordering & booking</p>
                                <p className="text-gray-500">Explore our services and make your bookings with ease</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                                <div className="bg-blue-400 rounded-2xl p-8 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                                            <span className='text-[40px]'>
                                                <LuUtensils />
                                            </span>
                                        </div>
                                        <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium">Ordering</span>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">Catering Items</h3>
                                    <p className="text-white/90 mb-4">Order catering food items for your event, party, or office</p>
                                    <Link href={'/ord-catering'} className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-white/90 transition-colors cursor-pointer">
                                        Browse Items
                                    </Link>
                                </div>
                                <div className="bg-purple-400 rounded-2xl p-8 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                                            <span className='text-[40px]'>
                                                <FaPencil />
                                            </span>
                                        </div>
                                        <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium">Ordering</span>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">Stationery Items</h3>
                                    <p className="text-white/90 mb-4">Order essential stationery supplies for your business or studies</p>
                                    <Link href={'/ord-stationery'} className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-white/90 transition-colors cursor-pointer">
                                        Browse Items
                                    </Link>
                                </div>
                                <div className="bg-yellow-400 rounded-2xl p-8 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                                            <span className='text-[40px]'>
                                                <FaFilm />
                                            </span>
                                        </div>
                                        <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium">Booking</span>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">Movie Tickets</h3>
                                    <p className="text-white/90 mb-4">Book tickets for resorts and movies for leisure and entertainment</p>
                                    <Link href={'/book-movie'} className="bg-white text-yellow-600 px-6 py-2 rounded-lg font-semibold hover:bg-white/90 transition-colors cursor-pointer">
                                        Explore
                                    </Link>
                                </div>
                                <div className="bg-pink-400 rounded-2xl p-8 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                                            <span className='text-[40px]'>
                                                <FaScissors />
                                            </span>
                                        </div>
                                        <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium">Booking</span>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">Beauty Salon</h3>
                                    <p className="text-white/90 mb-4">Book appointments at top beauty salons in your destination</p>
                                    <Link href={'/book-salon'} className="bg-white text-pink-600 px-6 py-2 rounded-lg font-semibold hover:bg-white/90 transition-colors cursor-pointer">
                                        Explore
                                    </Link>
                                </div>
                                <div className="bg-teal-400 rounded-2xl p-8 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                                            <span className='text-[40px]'>
                                                <FaDumbbell />
                                            </span>
                                        </div>
                                        <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium">Booking</span>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">Fitness Center</h3>
                                    <p className="text-white/90 mb-4">Reserve time slots at fitness centers and gyms nearby</p>
                                    <Link href={'/book-fitness'} className="bg-white text-teal-600 px-6 py-2 rounded-lg font-semibold hover:bg-white/90 transition-colors cursor-pointer">
                                        Explore
                                    </Link>
                                </div>
                                <div className="bg-orange-400 rounded-2xl p-8 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                                            <span className='text-[40px]'>
                                                <FaBuilding />
                                            </span>
                                        </div>
                                        <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium">Booking</span>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">Party Hall</h3>
                                    <p className="text-white/90 mb-4">Book party halls for weddings, birthdays, and celebrations</p>
                                    <Link href={'/book-party-hall'} className="bg-white text-orange-600 px-6 py-2 rounded-lg font-semibold hover:bg-white/90 transition-colors cursor-pointer">
                                        Explore
                                    </Link>
                                </div>

                                {/* <!-- Service Card: Catering Items --> */}
                                {/* <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-start">
                                    <div className="flex items-center mb-3">
                                        <span className="bg-blue-100 text-blue-600 rounded-full px-3 py-1 text-xs font-semibold">Ordering</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-1">Catering Items</h3>
                                    <p className="text-gray-600 mb-4 text-sm">Order catering food items for your event, party, or office.</p>
                                    <Link href={'/ord-catering'} className="mt-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">Order Now</Link>
                                </div> */}
                                {/* <!-- Service Card: Stationery Items --> */}
                                {/* <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-start">
                                    <div className="flex items-center mb-3">
                                        <span className="bg-purple-100 text-purple-600 rounded-full px-3 py-1 text-xs font-semibold">Ordering</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-1">Stationery Items</h3>
                                    <p className="text-gray-600 mb-4 text-sm">Order essential stationery supplies for your business or studies.</p>
                                    <Link href={'/ord-stationery'} className="mt-auto bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">Order Now</Link>
                                </div> */}
                                {/* <!-- Service Card: Book Resort-Movie Tickets --> */}
                                {/* <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-start">
                                    <div className="flex items-center mb-3">
                                        <span className="bg-yellow-100 text-yellow-700 rounded-full px-3 py-1 text-xs font-semibold">Booking</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-1">Movie Tickets</h3>
                                    <p className="text-gray-600 mb-4 text-sm">Book tickets for resorts and movies for leisure and entertainment.</p>
                                    <Link href={'/book-movie'} className="mt-auto bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors">Book Now</Link>
                                </div> */}
                                {/* <!-- Service Card: Book Beauty Salon --> */}
                                {/* <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-start">
                                    <div className="flex items-center mb-3">
                                        <span className="bg-pink-100 text-pink-700 rounded-full px-3 py-1 text-xs font-semibold">Booking</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-1">Beauty Salon</h3>
                                    <p className="text-gray-600 mb-4 text-sm">Book appointments at top beauty salons in your destination.</p>
                                    <Link href={'/book-salon'} className="mt-auto bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors">Book Now</Link>
                                </div> */}
                                {/* <!-- Service Card: Book Fitness Center --> */}
                                {/* <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-start">
                                    <div className="flex items-center mb-3">
                                        <span className="bg-teal-100 text-teal-700 rounded-full px-3 py-1 text-xs font-semibold">Booking</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-1">Fitness Center</h3>
                                    <p className="text-gray-600 mb-4 text-sm">Reserve time slots at fitness centers and gyms nearby.</p>
                                    <Link href={'book-fitness'} className="mt-auto bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">Book Now</Link>
                                </div> */}
                                {/* <!-- Service Card: Book Party Hall --> */}
                                {/* <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-start">
                                    <div className="flex items-center mb-3">
                                        <span className="bg-orange-100 text-orange-700 rounded-full px-3 py-1 text-xs font-semibold">Booking</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-1">Party Hall</h3>
                                    <p className="text-gray-600 mb-4 text-sm">Book party halls for weddings, birthdays, and celebrations.</p>
                                    <Link href={'/book-party-hall'} className="mt-auto bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors">Book Now</Link>
                                </div> */}
                            </div>
                        </div>
                        {/* <!-- Optionally: Add recent activity, stats, quick help --> */}
                    </div>
                </main >
            </div >
        </>
    )
}
