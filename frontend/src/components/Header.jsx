import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const Header = () => {

    const { user, logout } = useContext(AuthContext);

    return (
        <>
            <div className='flex bg-gray-900 h-16 w-full justify-between items-center px-4'>
                <Link to="/">
                    <h1 className='text-white text-2xl m-2 font-semibold font-sans'>Priya Pickel</h1>
                </Link>

                {
                    !user ?
                        (
                            <>
                                <Link to="/login">
                                    <button className='bg-white text-black m-2 px-4 py-2 rounded font-semibold'>
                                        Login
                                    </button>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/account">
                                    {user}
                                </Link>
                                <button onClick={logout}
                                    className='bg-red-600 text-white m-2 p-2 rounded cursor-pointer'
                                >
                                    Logout
                                </button>
                            </>
                        )
                }
            </div>
        </>
    )
}

export default Header;