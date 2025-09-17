import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import axios from "axios";

const Products = () => {
    const [productsData, setProductsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:5000/product");
                if (res.status === 200) {
                    setProductsData(res.data.products);
                }
            } catch (err) {
                console.log(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleViewMore = (categoryId) => {
        console.log(`View more for category: ${categoryId}`);
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                staggerChildren: 0.2
            }
        }
    };

    const categoryVariants = {
        hidden: {
            opacity: 0,
            y: 50,
            scale: 0.95
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
                staggerChildren: 0.1
            }
        }
    };

    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 30,
            rotateX: -15,
            scale: 0.9
        },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        },
        hover: {
            y: -8,
            scale: 1.03,
            rotateY: 5,
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        }
    };

    const imageVariants = {
        hover: {
            scale: 1.1,
            rotate: 2,
            transition: {
                duration: 0.4,
                ease: "easeInOut"
            }
        }
    };

    const buttonVariants = {
        hover: {
            scale: 1.05,
            boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)",
            transition: {
                duration: 0.2
            }
        },
        tap: {
            scale: 0.95
        }
    };

    // Loading animation
    if (loading) {
        return (
            <motion.div
                className="flex justify-center items-center h-50 text-lg text-gray-600"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.5 }
                }}
            >
                <motion.div
                    animate={{
                        rotate: 360,
                        transition: {
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear"
                        }
                    }}
                    className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mr-3"
                />
                Loading...
            </motion.div>
        );
    }

    return (
        <motion.div
            className="p-5 bg-gray-50 min-h-screen"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <AnimatePresence>
                {productsData.map((category, categoryIndex) => (
                    <CategoryCard
                        key={category._id}
                        category={category}
                        categoryIndex={categoryIndex}
                        handleViewMore={handleViewMore}
                        categoryVariants={categoryVariants}
                        cardVariants={cardVariants}
                        imageVariants={imageVariants}
                        buttonVariants={buttonVariants}
                    />
                ))}
            </AnimatePresence>
        </motion.div>
    );
};

// Separate component for each category to optimize animations
const CategoryCard = ({
    category,
    categoryIndex,
    handleViewMore,
    categoryVariants,
    cardVariants,
    imageVariants,
    buttonVariants
}) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <motion.div
            ref={ref}
            className="mb-12 bg-white rounded-2xl p-8 shadow-md overflow-hidden"
            variants={categoryVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(249,250,251,1) 100%)'
            }}
            whileHover={{
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
                transition: { duration: 0.3 }
            }}
        >
            {/* Header Animation */}
            <motion.div
                className="flex justify-between items-center mb-5"
                variants={{
                    hidden: { opacity: 0, x: -30 },
                    visible: {
                        opacity: 1,
                        x: 0,
                        transition: { delay: categoryIndex * 0.1 }
                    }
                }}
            >
                <motion.h3
                    className="text-3xl text-gray-800 m-0 font-medium"
                    whileHover={{
                        scale: 1.05,
                        color: "#3b82f6",
                        transition: { duration: 0.2 }
                    }}
                >
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: categoryIndex * 0.1 + 0.2 }}
                    >
                        {category.name}
                    </motion.span>
                    <motion.span
                        className="text-base text-gray-600 font-normal ml-2.5"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: categoryIndex * 0.1 + 0.4 }}
                    >
                        ({category.type})
                    </motion.span>
                </motion.h3>

                {category.items.length > 5 && (
                    <motion.button
                        onClick={() => handleViewMore(category._id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white border-none px-4 py-2 rounded-full text-sm cursor-pointer font-medium transition-all duration-300 ease-in-out"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: categoryIndex * 0.1 + 0.6 }}
                    >
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: categoryIndex * 0.1 + 0.8 }}
                        >
                            View More
                        </motion.span>
                        <motion.span
                            className="ml-2"
                            animate={{ x: [0, 5, 0] }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                        >
                            →
                        </motion.span>
                    </motion.button>
                )}
            </motion.div>

            {/* Products Grid */}
            <motion.div
                className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5 max-w-full"
                variants={{
                    hidden: {},
                    visible: {
                        transition: {
                            staggerChildren: 0.1
                        }
                    }
                }}
            >
                {category.items.slice(0, 5).map((item, index) => (
                    <motion.div
                        key={item._id}
                        className="group border border-gray-300 rounded-xl p-4 bg-white shadow-md cursor-pointer relative overflow-hidden"
                        variants={cardVariants}
                        whileHover="hover"
                        style={{
                            background: 'linear-gradient(145deg, rgba(255,255,255,1) 0%, rgba(248,250,252,1) 100%)'
                        }}
                    >
                        {/* Animated background on hover */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0"
                            whileHover={{
                                opacity: 1,
                                transition: { duration: 0.3 }
                            }}
                        />

                        {/* Image Container */}
                        <motion.div
                            className="w-full h-40 overflow-hidden rounded-lg mb-3 bg-gray-100 relative"
                            whileHover={{
                                boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1)",
                                transition: { duration: 0.3 }
                            }}
                        >
                            <motion.img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover rounded-lg"
                                variants={imageVariants}
                                whileHover="hover"
                                loading="lazy"
                                initial={{ scale: 1.1, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.1
                                }}
                            />

                            {/* Shimmer effect during load */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
                                animate={{
                                    x: [-100, 300],
                                    opacity: [0, 0.6, 0]
                                }}
                                transition={{
                                    duration: 1.5,
                                    delay: index * 0.2,
                                    repeat: 1
                                }}
                            />
                        </motion.div>

                        {/* Content */}
                        <div className="relative z-10">
                            <motion.h4
                                className="text-lg text-gray-800 mb-2 font-semibold leading-tight overflow-hidden text-ellipsis whitespace-nowrap"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 + 0.3 }}
                                whileHover={{
                                    color: "#3b82f6",
                                    transition: { duration: 0.2 }
                                }}
                            >
                                {item.name}
                            </motion.h4>

                            <motion.p
                                className="text-sm text-gray-600 mb-3 leading-normal h-10 overflow-hidden line-clamp-2"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 + 0.4 }}
                            >
                                {item.description}
                            </motion.p>

                            <motion.p
                                className="text-xl text-blue-600 m-0 font-bold"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    delay: index * 0.1 + 0.5,
                                    type: "spring",
                                    stiffness: 200
                                }}
                                whileHover={{
                                    scale: 1.1,
                                    color: "#1d4ed8",
                                    transition: { duration: 0.2 }
                                }}
                            >
                                ₹{item.price}
                            </motion.p>
                        </div>

                        {/* Decorative corner element */}
                        <motion.div
                            className="absolute top-2 right-2 w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-0"
                            whileHover={{
                                opacity: 1,
                                scale: [0, 1.2, 1],
                                transition: { duration: 0.4 }
                            }}
                        />
                    </motion.div>
                ))}
            </motion.div>

            {/* Floating particles effect */}
            <motion.div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-20"
                        animate={{
                            x: [0, 100, 200, 300],
                            y: [0, -50, -100, -150],
                            opacity: [0, 0.5, 0.8, 0],
                            scale: [0.5, 1, 1.5, 0.5]
                        }}
                        transition={{
                            duration: 4,
                            delay: i * 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        style={{
                            left: `${20 + i * 30}%`,
                            top: `${80}%`
                        }}
                    />
                ))}
            </motion.div>
        </motion.div>
    );
};

export default Products;
