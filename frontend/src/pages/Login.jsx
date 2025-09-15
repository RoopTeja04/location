import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Header from "../components/Header";

const Login = () => {
    const [username, setUsername] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = () => {
        if (!username) return;
        login(username);
        navigate("/"); // redirect to homepage
    };

    return (
        <div>
            <Header />
            <div className="flex justify-center items-center h-[70vh]">
                <div className="bg-white shadow p-6 rounded w-80">
                    <h2 className="text-lg font-bold mb-4">Sign In</h2>
                    <input
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full border px-3 py-2 rounded mb-4"
                    />
                    <button
                        onClick={handleLogin}
                        className="w-full bg-yellow-400 py-2 rounded font-semibold"
                    >
                        Sign In
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
