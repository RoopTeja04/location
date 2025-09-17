import React, { useEffect, useState } from 'react';
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
        // Add your view more logic here
        console.log(`View more for category: ${categoryId}`);
        // You can navigate to a detailed page or expand the section
    };

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '200px',
                fontSize: '18px',
                color: '#666'
            }}>
                Loading...
            </div>
        );
    }

    return (
        <div style={{
            padding: '20px',
            backgroundColor: '#f8f9fa',
            minHeight: '100vh'
        }}>

            {productsData.map((category) => (
                <div key={category._id} style={{
                    marginBottom: '50px',
                    backgroundColor: 'white',
                    borderRadius: '15px',
                    padding: '30px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '20px'
                    }}>
                        <h3 style={{
                            fontSize: '1.8rem',
                            color: '#333',
                            margin: '0',
                            fontWeight: '500'
                        }}>
                            {category.name}
                            <span style={{
                                fontSize: '1rem',
                                color: '#666',
                                fontWeight: '400',
                                marginLeft: '10px'
                            }}>
                                ({category.type})
                            </span>
                        </h3>

                        {category.items.length > 5 && (
                            <button
                                onClick={() => handleViewMore(category._id)}
                                style={{
                                    backgroundColor: '#007bff',
                                    color: 'white',
                                    border: 'none',
                                    padding: '8px 16px',
                                    borderRadius: '20px',
                                    fontSize: '14px',
                                    cursor: 'pointer',
                                    fontWeight: '500',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                                onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
                            >
                                View More
                            </button>
                        )}
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '20px',
                        maxWidth: '100%'
                    }}>
                        {category.items.slice(0, 5).map((item) => (
                            <div
                                key={item._id}
                                style={{
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '12px',
                                    padding: '15px',
                                    backgroundColor: '#fff',
                                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    cursor: 'pointer'
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.15)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                                }}
                            >
                                <div style={{
                                    width: '100%',
                                    height: '160px',
                                    overflow: 'hidden',
                                    borderRadius: '8px',
                                    marginBottom: '12px',
                                    backgroundColor: '#f5f5f5'
                                }}>
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            borderRadius: '8px'
                                        }}
                                    />
                                </div>

                                <h4 style={{
                                    fontSize: '1.1rem',
                                    color: '#333',
                                    margin: '0 0 8px 0',
                                    fontWeight: '600',
                                    lineHeight: '1.3',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                }}>
                                    {item.name}
                                </h4>

                                <p style={{
                                    fontSize: '0.9rem',
                                    color: '#666',
                                    margin: '0 0 12px 0',
                                    lineHeight: '1.4',
                                    height: '40px',
                                    overflow: 'hidden',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical'
                                }}>
                                    {item.description}
                                </p>

                                <p style={{
                                    fontSize: '1.2rem',
                                    color: '#007bff',
                                    margin: '0',
                                    fontWeight: '700'
                                }}>
                                    ₹{item.price}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Products;