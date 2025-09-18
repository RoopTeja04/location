import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { motion, LayoutGroup } from 'framer-motion';

const Items = () => {
    const [hoveredPath, setHoveredPath] = useState(null);

    const navItems = [
        { path: 'veg-pickel', name: 'Veg Pickle' },
        { path: 'non-veg-pickel', name: 'Non Veg Pickle' },
        { path: 'sweets', name: 'Sweets' },
        { path: 'snacks', name: 'Snacks' }
    ];

    const containerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
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
                        <LayoutGroup id="items-nav">
                            <motion.div
                                className="relative flex space-x-1 bg-gray-800 rounded-full border border-gray-700 shadow-lg"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                            >
                                {navItems.map((item) => (
                                    <motion.div key={item.path} variants={itemVariants} className="relative">
                                        <NavLink
                                            to={item.path}
                                            onMouseEnter={() => setHoveredPath(item.path)}
                                            onMouseLeave={() => setHoveredPath(null)}
                                            className={({ isActive }) =>
                                                [
                                                    'relative flex items-center space-x-2 px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out text-center',
                                                    isActive
                                                        ? 'text-white'
                                                        : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                                                ].join(' ')
                                            }
                                            end={false}
                                        >
                                            <motion.div
                                                className="absolute inset-0 rounded-full"
                                                style={{ zIndex: 0 }}
                                                layoutId="active-pill"
                                                transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                                            />
                                            {hoveredPath === item.path && (
                                                <motion.div
                                                    className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-red-500/20 rounded-full"
                                                    style={{ zIndex: 0 }}
                                                    layoutId={`hover-${item.path}`}
                                                    transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                                                />
                                            )}

                                            <span className="hidden sm:block font-semibold">{item.name}</span>
                                            <span className="block sm:hidden text-xs font-semibold">
                                                {item.name.split(' ')[0]}
                                            </span>
                                        </NavLink>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </LayoutGroup>
                    </div>
                </div>

                <motion.div
                    className="h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                />
            </motion.nav>

            <motion.div
                className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <Outlet />
            </motion.div>

            <style>{`
        a[aria-current="page"] > div[layoutid="active-pill"] {
          background-image: linear-gradient(to right, #f97316, #dc2626);
        }
      `}</style>
        </>
    );
};

export default Items;