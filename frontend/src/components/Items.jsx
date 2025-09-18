import React, { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const Items = () => {
    const location = useLocation();
    const [hoveredPath, setHoveredPath] = useState(null);

    const navItems = [
        { path: "veg-pickel", name: "Veg Pickle", icon: "🥒" },
        { path: "non-veg-pickel", name: "Non Veg Pickle", icon: "🍖" },
        { path: "sweets", name: "Sweets", icon: "🍬" },
        { path: "snacks", name: "Snacks", icon: "🍿" }
    ];

    const containerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3 }
        }
    };

    return (
        <>
            <motion.nav
                className="bg-gray-900 border-b border-gray-800 shadow-lg backdrop-blur-md bg-opacity-95"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-center items-center py-4">
                        <motion.div
                            className="flex space-x-1 bg-gray-800 rounded-full p-2 border border-gray-700 shadow-lg"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                        >
                            {navItems.map((item, index) => {
                                const isActive = location.pathname.includes(item.path);

                                return (
                                    <motion.div
                                        key={item.path}
                                        variants={itemVariants}
                                        className="relative"
                                    >
                                        <Link
                                            to={item.path}
                                            className={`
                                                relative flex items-center space-x-2 px-4 py-3 rounded-full text-sm font-medium transition-all duration-300 ease-in-out
                                                ${isActive
                                                    ? 'text-white bg-gradient-to-r from-orange-500 to-red-600 shadow-lg shadow-orange-500/25'
                                                    : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                                                }
                                            `}
                                            onMouseEnter={() => setHoveredPath(item.path)}
                                            onMouseLeave={() => setHoveredPath(null)}
                                        >
                                            {/* Icon */}
                                            <motion.span
                                                className="text-lg"
                                                whileHover={{ rotate: 10, scale: 1.1 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                {item.icon}
                                            </motion.span>

                                            {/* Text */}
                                            <span className="hidden sm:block font-semibold">{item.name}</span>

                                            {/* Mobile text - shorter */}
                                            <span className="block sm:hidden text-xs font-semibold">
                                                {item.name.split(' ')[0]}
                                            </span>

                                            {/* Hover effect */}
                                            {hoveredPath === item.path && !isActive && (
                                                <motion.div
                                                    className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-red-500/20 rounded-full -z-10"
                                                    layoutId="hoverBackground"
                                                    transition={{
                                                        type: "spring",
                                                        bounce: 0.2,
                                                        duration: 0.6
                                                    }}
                                                />
                                            )}

                                            {/* Active indicator */}
                                            {isActive && (
                                                <motion.div
                                                    className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 rounded-full -z-10"
                                                    layoutId="activeBackground"
                                                    transition={{
                                                        type: "spring",
                                                        bounce: 0.2,
                                                        duration: 0.6
                                                    }}
                                                />
                                            )}

                                            {/* Glow effect for active state */}
                                            {isActive && (
                                                <motion.div
                                                    className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 rounded-full blur-md opacity-30 -z-20"
                                                    initial={{ scale: 0.8, opacity: 0 }}
                                                    animate={{ scale: 1.2, opacity: 0.3 }}
                                                    transition={{
                                                        duration: 2,
                                                        repeat: Infinity,
                                                        repeatType: "reverse"
                                                    }}
                                                />
                                            )}
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>
                </div>

                {/* Animated underline with matching orange gradient */}
                <motion.div
                    className="h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                />
            </motion.nav>

            {/* Content area with subtle texture */}
            <motion.div
                className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <Outlet />
            </motion.div>
        </>
    )
}

export default Items