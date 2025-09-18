import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { motion } from 'framer-motion'

const Header = () => {
    const { user, logout } = useContext(AuthContext);
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { path: "/", label: "Home" },
        { path: "/items", label: "Items" },
        { path: "/cart", label: "Cart" },
        { path: "/orders", label: "Orders" }
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <motion.header
            className="bg-gray-900 border-b border-gray-800 shadow-lg sticky top-0 z-50 backdrop-blur-md bg-opacity-95"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo Section */}
                    <motion.div
                        className="flex-shrink-0"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Link to="/" className="flex items-center space-x-2">
                            <motion.div
                                className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-600 rounded-full flex items-center justify-center"
                                whileHover={{ rotate: 180 }}
                                transition={{ duration: 0.3 }}
                            >
                                <span className="text-white font-bold text-lg">P</span>
                            </motion.div>
                            <h1 className="text-white text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                                Priya Pickles
                            </h1>
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-1 bg-gray-800 rounded-full p-1">
                        {navItems.map((item, index) => (
                            <motion.div key={item.path} className="relative">
                                <Link
                                    to={item.path}
                                    className={`
                                        relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                                        ${isActive(item.path)
                                            ? 'text-white bg-orange-500 shadow-lg shadow-orange-500/25'
                                            : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                                        }
                                    `}
                                >
                                    {item.label}
                                    {isActive(item.path) && (
                                        <motion.div
                                            className="absolute inset-0 bg-orange-500 rounded-full -z-10"
                                            layoutId="activeTab"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                </Link>
                            </motion.div>
                        ))}
                    </nav>

                    {/* Auth Section */}
                    <div className="flex items-center space-x-4">
                        {!user ? (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <Link to="/login">
                                    <motion.button
                                        className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform"
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Login
                                    </motion.button>
                                </Link>
                            </motion.div>
                        ) : (
                            <motion.div
                                className="flex items-center space-x-3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                {/* User Profile */}
                                <Link to="/account" className="flex items-center space-x-2 group">
                                    <motion.div
                                        className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center"
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        <span className="text-white font-semibold text-sm">
                                            {user?.charAt(0)?.toUpperCase() || 'U'}
                                        </span>
                                    </motion.div>
                                    <span className="text-gray-300 group-hover:text-white transition-colors duration-200 hidden sm:block">
                                        {user}
                                    </span>
                                </Link>

                                {/* Logout Button */}
                                <motion.button
                                    onClick={logout}
                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Logout
                                </motion.button>
                            </motion.div>
                        )}

                        {/* Mobile Menu Button */}
                        <motion.button
                            className="md:hidden text-gray-300 hover:text-white p-2"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            whileTap={{ scale: 0.95 }}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </motion.button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <motion.div
                    className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                        opacity: isMenuOpen ? 1 : 0,
                        height: isMenuOpen ? 'auto' : 0
                    }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-800 rounded-lg mt-2 mb-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`
                                    block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200
                                    ${isActive(item.path)
                                        ? 'text-white bg-orange-500'
                                        : 'text-gray-300 hover:text-white hover:bg-gray-700'
                                    }
                                `}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Gradient Border Bottom */}
            <motion.div
                className="h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
            />
        </motion.header>
    )
}

export default Header;