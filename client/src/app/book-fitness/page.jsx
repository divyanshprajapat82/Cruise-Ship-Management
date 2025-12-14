'use client'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Product from '../components/Product'
import { MdShoppingCart } from 'react-icons/md'
import { loginContext } from '../context/MainContext'
import { IoIosArrowDown, IoIosCart } from 'react-icons/io'
import { toast } from 'react-toastify'
import StationeryProduct from '../components/StationeryProduct'
import MovieBooking from '../components/MovieBooking'
import SalonBooking from '../components/SalonBooking'
import FitnessBooking from '../components/FitnessBooking'
// import CateringOrder from '../components/CateringOrder'

export default function page() {

    const [fitness, setFitness] = useState([])


    let APIURL = process.env.NEXT_PUBLIC_APIBASEURL

    let viewFitness = () => {
        axios.get(`${APIURL}/ship/fitness/view`)
            .then((res) => res.data)
            .then((finalData) => {
                setFitness(finalData.data)
            })
    }

    useEffect(() => {
        viewFitness()
    }, [])


    return (
        <>


            <div className='p-8'>
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Beauty Salon – Book Your Style</h2>
                        <p className="text-gray-600">Explore & Book Salon Services</p>
                    </div>
                </div>


                {

                    fitness.length > 0 ?
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id="cateringItemsGrid">
                            {fitness.map((items, index) => (
                                <FitnessBooking items={items} index={index} />
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







        </>
    )
}
