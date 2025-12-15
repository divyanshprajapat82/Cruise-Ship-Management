"use client"
import Link from 'next/link';
import { redirect, usePathname, useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react'
import { FaBars } from "react-icons/fa6";
import { loginContext } from '../context/MainContext';
import { SiCodeship } from 'react-icons/si';


export default function Header() {
    const [navBar, setNavBar] = useState(false)
    let navPath = usePathname()
    let { userRole, setUserRole, setToken, token } = useContext(loginContext)
    const router = useRouter();

    // let logOut = () => {
    //     setUserRole("")
    //     setToken("")
    //     // redirect("/login")
    //     // router.push("/login")
    //     router.replace("/login");
    // }

    // let logOut = () => {
    //     setToken("");
    //     setUserRole("");

    //     localStorage.removeItem("TOKEN");
    //     localStorage.removeItem("USERROLE");

    //     router.replace("/login");  // 🔥 this is the magic fix
    // };

    let logOut = () => {
        // 1. Clear local storage
        localStorage.removeItem("TOKEN");
        localStorage.removeItem("USERROLE");

        // 2. Clear context
        setToken("");
        setUserRole("");

        // 3. Very important → force Login page to remount
        router.replace("/login?logout=1");
    };


    return (
        <>
            <nav className={`bg-white ${!navBar && "shadow-lg"} p-2 sticky w-full z-50 top-0 transition-all duration-300`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* <div className="flex items-center">
                            <i className="fas fa-ship text-blue-600 text-2xl mr-3"></i>
                            <span className="text-xl font-bold text-gray-800">Ocean Voyager</span>
                        </div> */}
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center 
                        bg-gradient-to-br from-indigo-400 to-purple-600">
                                {/* <span className="text-white font-bold text-lg">✈</span> */}
                                <span className="text-white font-bold text-[30px]"><SiCodeship /></span>
                            </div>

                            <h1 className="text-2xl font-bold 
                       bg-gradient-to-br from-indigo-400 to-purple-600 
                       bg-clip-text text-transparent">
                                Voyager Crush
                            </h1>
                        </div>

                        <div className="hidden md:flex space-x-8">
                            <Link href={"/"} className={`nav-link ${navPath == "/" ? "text-blue-700 font-bolder border-b-[2px]" : " text-gray-700"} hover:text-blue-600 px-3 py-2  font-medium`}>Home</Link>
                            {token == "" &&
                                <Link href={"/enroll"} className={`nav-link ${navPath == "/enroll" ? "text-blue-700 font-bolder border-b-[2px]" : " text-gray-700"} hover:text-blue-600 px-3 py-2 font-medium`}>Enroll Now</Link>
                            }
                            <Link href={"/contact"} className={`nav-link ${navPath == "/contact" ? "text-blue-700 font-bolder border-b-[2px]" : " text-gray-700"} hover:text-blue-600 px-3 py-2 font-medium`}>Contact</Link>
                            {token && userRole == 'admin' &&

                                <Link href={userRole == 'admin' ? "/admin" : "/"} className={`nav-link ${navPath == "/admin" || navPath == "/admin/add-item" || navPath == "/admin/view-user" || navPath == "/admin/team" || navPath == "/admin/add-new-user" ? "text-blue-700 font-bolder border-b-[2px]" : " text-gray-700"} hover:text-blue-600 px-3 py-2 font-medium`}>
                                    Admin
                                </Link>
                            }

                            {token && userRole == 'Voyager' &&
                                <Link href={userRole == 'Voyager' ? "/voyager" : "/"} className={`nav-link ${navPath == "/voyager" || navPath == "/ord-catering" || navPath == "/ord-stationery" || navPath == "/book-movie" || navPath == "/book-salon" || navPath == "/book-fitness" ? "text-blue-700 font-bolder border-b-[2px]" : " text-gray-700"} hover:text-blue-600 px-3 py-2 font-medium`}>
                                    Services
                                </Link>
                            }

                            {token && userRole == 'Manager' &&
                                <Link href={userRole == 'Manager' ? "/manager" : "/"} className={`nav-link ${navPath == "/manager" || navPath == "/view-movie" || navPath == "/view-salon" || navPath == "/view-fitness" || navPath == "/view-party-hall" ? "text-blue-700 font-bolder border-b-[2px]" : " text-gray-700"} hover:text-blue-600 px-3 py-2 font-medium`}>
                                    Dashboard
                                </Link>
                            }
                            {token && userRole == 'HeadCook' &&
                                <Link href={userRole == 'HeadCook' ? "/headCook" : "/"} className={`nav-link ${navPath == "/headCook" ? "text-blue-700 font-bolder border-b-[2px]" : " text-gray-700"} hover:text-blue-600 px-3 py-2 font-medium`}>
                                    HeadCook
                                </Link>
                            }
                            {token && userRole == 'Supervisor' &&
                                <Link href={userRole == 'Supervisor' ? "/supervisor" : "/"} className={`nav-link ${navPath == "/supervisor" ? "text-blue-700 font-bolder border-b-[2px]" : " text-gray-700"} hover:text-blue-600 px-3 py-2 font-medium`}>
                                    Supervisor
                                </Link>
                            }
                            {token || token != "" ?
                                <div>
                                    <button onClick={logOut} className='border px-8 h-full bg-red-600 hover:bg-red-700 text-white rounded-[12px] transition-all duration-300 cursor-pointer'>LogOut</button>
                                </div>
                                :
                                <Link href={"/login"}>
                                    <button className='border px-8 h-full bg-blue-600 hover:bg-blue-700 text-white rounded-[12px] transition-all duration-300 cursor-pointer'>LogIn</button>
                                </Link>
                            }
                        </div>
                        <button onClick={() => setNavBar(!navBar)} className="md:hidden text-[20px] text-gray-700 cursor-pointer">
                            <FaBars />
                        </button>
                    </div>
                </div>
            </nav >
            {/* <!-- Mobile Menu --> */}
            {/* {navBar && */}
            <nav className={`absolute ${navBar ? "top-[65px]" : "top-[-1000px]"} transition-all duration-300 w-full`}>
                <div onClick={() => setNavBar(false)} className='absolute top-0 left-0 w-full h-[calc(100vh-65px)] bg-[#00000048] z-10'></div>
                <div className='bg-white shadow-lg w-full relative z-10'>
                    <div id="mobile-menu">
                        <div className="px-2 pt-2 pb-3 grid space-y-1 sm:px-3 bg-white shadow-lg">
                            {/* <Link href={"/"} onClick={() => setNavBar(false)} className={`nav-link ${navPath == "/" ? "text-blue-700 font-bolder" : " text-gray-700"} hover:text-blue-600 px-3 py-2  font-medium`}>Home</Link>
                            <Link href={"/enroll"} onClick={() => setNavBar(false)} className={`nav-link ${navPath == "/enroll" ? "text-blue-700 font-bolder" : " text-gray-700"} hover:text-blue-600 px-3 py-2 font-medium`}>Enroll Now</Link>
                            <Link href={"/contact"} onClick={() => setNavBar(false)} className={`nav-link ${navPath == "/contact" ? "text-blue-700 font-bolder" : " text-gray-700"} hover:text-blue-600 px-3 py-2 font-medium`}>Contact</Link>
                            <Link href={"/login"} onClick={() => setNavBar(false)}>
                                <button className='border px-8 h-full w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-[12px] transition-all duration-300 cursor-pointer'>LogIn</button>
                            </Link> */}

                            <Link href={"/"} onClick={() => setNavBar(false)} className={`nav-link ${navPath == "/" ? "text-blue-700 font-bolder" : " text-gray-700"} hover:text-blue-600 px-3 py-2  font-medium`}>Home</Link>
                            {token == "" &&
                                <Link href={"/enroll"} onClick={() => setNavBar(false)} className={`nav-link ${navPath == "/enroll" ? "text-blue-700 font-bolder" : " text-gray-700"} hover:text-blue-600 px-3 py-2 font-medium`}>Enroll Now</Link>
                            }
                            <Link href={"/contact"} onClick={() => setNavBar(false)} className={`nav-link ${navPath == "/contact" ? "text-blue-700 font-bolder" : " text-gray-700"} hover:text-blue-600 px-3 py-2 font-medium`}>Contact</Link>
                            {token && userRole == 'admin' &&

                                <Link href={userRole == 'admin' ? "/admin" : "/"} onClick={() => setNavBar(false)} className={`nav-link ${navPath == "/admin" || navPath == "/admin/add-item" || navPath == "/admin/view-user" || navPath == "/admin/team" || navPath == "/admin/add-new-user" ? "text-blue-700 font-bolder" : " text-gray-700"} hover:text-blue-600 px-3 py-2 font-medium`}>
                                    Admin
                                </Link>
                            }

                            {token && userRole == 'Voyager' &&
                                <Link href={userRole == 'Voyager' ? "/voyager" : "/"} onClick={() => setNavBar(false)} className={`nav-link ${navPath == "/voyager" || navPath == "/ord-catering" || navPath == "/ord-stationery" || navPath == "/book-movie" || navPath == "/book-salon" || navPath == "/book-fitness" ? "text-blue-700 font-bolder" : " text-gray-700"} hover:text-blue-600 px-3 py-2 font-medium`}>
                                    Services
                                </Link>
                            }

                            {token && userRole == 'Manager' &&
                                <Link href={userRole == 'Manager' ? "/manager" : "/"} onClick={() => setNavBar(false)} className={`nav-link ${navPath == "/manager" || navPath == "/view-movie" || navPath == "/view-salon" || navPath == "/view-fitness" || navPath == "/view-party-hall" ? "text-blue-700 font-bolder" : " text-gray-700"} hover:text-blue-600 px-3 py-2 font-medium`}>
                                    Dashboard
                                </Link>
                            }
                            {token && userRole == 'HeadCook' &&
                                <Link href={userRole == 'HeadCook' ? "/headCook" : "/"} onClick={() => setNavBar(false)} className={`nav-link ${navPath == "/headCook" ? "text-blue-700 font-bolder" : " text-gray-700"} hover:text-blue-600 px-3 py-2 font-medium`}>
                                    HeadCook
                                </Link>
                            }
                            {token && userRole == 'Supervisor' &&
                                <Link href={userRole == 'Supervisor' ? "/supervisor" : "/"} onClick={() => setNavBar(false)} className={`nav-link ${navPath == "/supervisor" ? "text-blue-700 font-bolder" : " text-gray-700"} hover:text-blue-600 px-3 py-2 font-medium`}>
                                    Supervisor
                                </Link>
                            }
                            {token || token != "" ?
                                <div onClick={() => setNavBar(false)}>
                                    <button onClick={logOut} className='border p-2 w-full h-full bg-red-600 hover:bg-red-700 text-white rounded-[12px] transition-all duration-300 cursor-pointer'>LogOut</button>
                                </div>
                                :
                                <Link href={"/login"} className='w-full flex' onClick={() => setNavBar(false)}>
                                    <button className='w-full border p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-[12px] transition-all duration-300 cursor-pointer'>
                                        LogIn
                                    </button>
                                </Link>
                            }
                            {/* </div> */}
                            {/* <button onClick={() => setNavBar(!navBar)} className="md:hidden text-[20px] text-gray-700 cursor-pointer">
                                <FaBars />
                            </button> */}

                        </div>
                    </div>
                </div>
            </nav >

        </>
    )
}
