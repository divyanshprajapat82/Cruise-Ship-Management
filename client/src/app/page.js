'use client'
import Image from "next/image";
import Link from "next/link";
import { FaCompass } from "react-icons/fa6";
import { loginContext } from "./context/MainContext";
import { useContext } from "react";

export default function Home() {
  let { userRole, setUserRole, setToken, token } = useContext(loginContext)

  return (
    <>

      <section className="p-6 pb-20 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">

            <div className="space-y-6">
              <div className="inline-block bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-semibold text-sm">
                🌍 Travel Smarter
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Discover the {" "}<span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Ocean
                </span>
              </h1>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                Connect with like-minded travelers, discover amazing destinations together, and create unforgettable memories with people who share your wanderlust.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href={userRole == "" && "/login" || userRole == "admin" && "/admin" || userRole == 'Voyager' && "/voyager" || userRole == 'Manager' && "/manager" || userRole == 'HeadCook' && "/headCook" || userRole == 'HeadCook' && "/headCook"}>
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-lg transition focus:outline-none focus:ring-4 focus:ring-indigo-200 cursor-pointer">
                    Start Exploring
                  </button>
                </Link>
                {userRole == "" && token == "" ?
                  <Link href={'/enroll'}>
                    <button className="border-2 border-gray-900 text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-lg hover:bg-gray-50 transition cursor-pointer">
                      Enroll Now
                    </button>
                  </Link>
                  :
                  <Link href={'/contact'}>
                    <button className="border-2 border-gray-900 text-gray-900 px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg font-bold text-lg hover:bg-gray-50 transition cursor-pointer">
                      Learn More
                    </button>
                  </Link>
                }
              </div>
              <div className="flex flex-wrap gap-6 pt-8">
                <div>
                  <p className="text-2xl sm:text-3xl font-bold gradient-text">50K+</p>
                  <p className="text-gray-600 text-sm sm:text-base">Active Travelers</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-bold gradient-text">180+</p>
                  <p className="text-gray-600 text-sm sm:text-base">Countries</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-bold gradient-text">10K+</p>
                  <p className="text-gray-600 text-sm sm:text-base">Matches Made</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center min-h-96 relative">
              <div className="w-full max-w-4xl h-96 bg-gradient-to-br from-purple-400 to-pink-400 rounded-3xl shadow-lg relative flex items-center justify-center overflow-hidden">

                <Image src="/images/side_cruise.png"
                  alt="Cruise Ship"
                  className="w-3/4 sm:w-2/3 md:w-1/2 lg:w-3/5 h-auto object-cover rounded-2xl transform hover:scale-105 transition duration-500" />

                <div className="absolute top-4 sm:top-6 left-4 sm:left-8 animate-bounce">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-10 sm:w-16 h-10 sm:h-16 text-white opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 010 6.844L12 14z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l-6.16 3.422a12.083 12.083 0 010-6.844L12 14z" />
                  </svg>
                </div>

                <div className="absolute bottom-4 sm:bottom-10 right-4 sm:right-8 animate-ping">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 sm:w-12 h-8 sm:h-12 text-pink-500 opacity-80" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>

                <div className="absolute top-20 left-10 sm:left-20 rotate-45 animate-bounce-slow">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 sm:w-12 h-8 sm:h-12 text-white opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10l9-4 9 4-9 4-9-4z" />
                  </svg>
                </div>
                <div className="absolute bottom-16 right-10 sm:right-20 -rotate-12 animate-bounce-slow">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-12 sm:w-16 h-12 sm:h-16 text-white opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10l9-4 9 4-9 4-9-4z" />
                  </svg>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      <section id="features" className="py-20 px-6 lg:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Voyager Crush?
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to connect with fellow travelers and plan amazing trips together.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white p-8 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(102,126,234,0.2)]">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 mb-4 text-xl">
                🎯
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Smart Matching</h4>
              <p className="text-gray-600">
                {/* AI-powered matching based on travel style, interests, and destinations you're interested in. */}
                {"AI-powered matching based on travel style, interests, and destinations you're interested in."}

              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(102,126,234,0.2)]">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-4 text-xl">
                💬
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Easy Chat</h4>
              <p className="text-gray-600">
                Built-in messaging with instant translations to connect with travelers from around the world.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(102,126,234,0.2)]">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-pink-100 text-pink-600 mb-4 text-xl">
                🗺️
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Trip Planning</h4>
              <p className="text-gray-600">
                Plan your journey together with integrated maps, itineraries, and shared budget tracking.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(102,126,234,0.2)]">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100 text-green-600 mb-4 text-xl">
                🛡️
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Verified Profiles</h4>
              <p className="text-gray-600">
                All travelers are verified with ID and reviews to ensure safe and trustworthy connections.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(102,126,234,0.2)]">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-600 mb-4 text-xl">
                📸
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Share Photos</h4>
              <p className="text-gray-600">
                Create shared albums and memories from your travels with your fellow travelers.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(102,126,234,0.2)]">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-100 text-orange-600 mb-4 text-xl">
                🌟
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Community</h4>
              <p className="text-gray-600">
                Join a global community of adventurers, get tips, and discover hidden gems worldwide.
              </p>
            </div>

          </div>
        </div>
      </section>


      <section id="testimonials" className="py-20 px-6 lg:px-12 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Love Stories</h3>
            <p className="text-xl text-gray-600">Real travelers, real adventures</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl">
              <div className="flex gap-1 mb-4">
                <span className="text-2xl">⭐</span>
                <span className="text-2xl">⭐</span>
                <span className="text-2xl">⭐</span>
                <span className="text-2xl">⭐</span>
                <span className="text-2xl">⭐</span>
              </div>
              {/* <p className="text-gray-700 mb-6">"Met Sarah on Voyager Crush and we ended up road-tripping across Europe together. Best decision ever!"</p> */}
              <p className="text-gray-700 mb-6">
                {"\"Met Sarah on Voyager Crush and we ended up road-tripping across Europe together. Best decision ever!\""}
              </p>

              <p className="font-bold text-gray-900">James & Sarah</p>
              <p className="text-sm text-gray-600">Europe Tour, 2024</p>
            </div>
            <div className="bg-white p-8 rounded-2xl">
              <div className="flex gap-1 mb-4">
                <span className="text-2xl">⭐</span>
                <span className="text-2xl">⭐</span>
                <span className="text-2xl">⭐</span>
                <span className="text-2xl">⭐</span>
                <span className="text-2xl">⭐</span>
              </div>
              {/* <p className="text-gray-700 mb-6">"Found an amazing travel buddy who speaks 5 languages. Navigating Southeast Asia was so much easier!"</p> */}
              <p className="text-gray-700 mb-6">
                {"\"Found an amazing travel buddy who speaks 5 languages. Navigating Southeast Asia was so much easier!\""}
              </p>

              <p className="font-bold text-gray-900">Maria & Priya</p>
              <p className="text-sm text-gray-600">Thailand & Vietnam, 2024</p>
            </div>
            <div className="bg-white p-8 rounded-2xl">
              <div className="flex gap-1 mb-4">
                <span className="text-2xl">⭐</span>
                <span className="text-2xl">⭐</span>
                <span className="text-2xl">⭐</span>
                <span className="text-2xl">⭐</span>
                <span className="text-2xl">⭐</span>
              </div>
              {/* <p className="text-gray-700 mb-6">"Turned a last-minute solo trip into an unforgettable adventure with two amazing people I met here."</p> */}
              <p className="text-gray-700 mb-6">
                {"\"Turned a last-minute solo trip into an unforgettable adventure with two amazing people I met here.\""}
              </p>

              <p className="font-bold text-gray-900">Alex, Maya & Chen</p>
              <p className="text-sm text-gray-600">Japan Trip, 2024</p>
            </div>
          </div>
        </div>
      </section>









      <footer className="bg-gray-900">
        <div className="border-t border-gray-800 py-8 text-center text-gray-400">
          <p>&copy; 2024 Voyager Crush. All rights reserved. Find your travel companion today.</p>
        </div>
      </footer>

    </>
  );
}
